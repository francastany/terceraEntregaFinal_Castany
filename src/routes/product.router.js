import { Router } from "express";
import Product from '../DAO/Mongo/product.js'
import Cart from "../DAO/Mongo/cart.js";
import { executePolicies } from "../middlewares/auth.js";
import uploader from "../services/uploader.js";
import config from "../config/config.js";

const router = new Router();
const productos = new Product();
const APICART = new Cart();

router.get('/', async(req, res) => {
    const user = req.cookies[config.jwt.token];
    const products = await productos.getAll();
    const userCart = await APICART.createCart(user.email)
    res.render('home', {products: products, user: user, cart: userCart});
});

router.get("/all", async (req, res, next) => {
    const totalProductos = await productos.getAll();
    res.json({totalProductos});
});
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const result = await productos.getById(id);
    res.json({result});
});
router.post("/", uploader.single("thumbnail"), async (req, res, next) => {
    const file = req.file
    const nuevoProd = {
        title: req.body.title,
        price: req.body.price,
        thumbnail : `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    };
    const prodBD = await productos.save(nuevoProd);
    res.send(JSON.stringify(prodBD._id));
});
router.put("/:id", async (req, res, next) => {
    if (admin) {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const productoActualizado = { title, price, thumbnail, id: id };
        await productos.update(productoActualizado);
        res.send(`El producto ${id} fue actualizado`);
    } else {
        const informacion = {
            error: -1,
            descripcion: "ruta /api/productos metodo PUT no autorizada"
        };
        const error = JSON.stringify(informacion, null, 2);
        res.send(error);
    }
});
router.delete("/:id", executePolicies("AUTHENTICATED"), async (req, res, next) => {
    const { id } = req.params;
    const respuesta = await productos.deleteById(id);
    respuesta ? res.send(`El producto con id: ${id} fue eliminado`) : res.json({ error: "producto no encontrado" });
});

export default router;