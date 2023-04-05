import jwt from 'jsonwebtoken';
import { Router } from 'express';

import config from '../config/config.js';
import Cart from '../DAO/Mongo/cart.js';
import { transporter } from '../services/mailer.js';

const router = new Router();
const APICART = new Cart();

router.get('/all', async(req, res) => {
    const carts = await APICART.getAll();
    res.json(carts)
});

router.get('/', async (req, res) => {
    const {email} = req.cookies[config.jwt.token];
    const cart = await APICART.getCart(email);
    res.send(cart);
});
router.post('/addProduct/:idProduct', async (req, res) => {
    const { email } = req.cookies[config.jwt.token];
    const cart = await APICART.getCart(email);
    // console.log(cart._id);

    const productID = req.params.idProduct;
    // console.log(productID);

    await APICART.addProduct(cart._id, productID);

    res.send({status: 'succes', message: 'product added to DB'});
});

router.post("/confirmOrder", async(req, res) => {
    const { name, email } = req.cookies[config.jwt.token];
    const cart = await APICART.getCart(email);

    console.log(`Compra finalizada. ${name}, compraste: ${JSON.stringify(cart.products)}`);
    let mailOrder = '';
    for(const product of cart.products){
        mailOrder += `<div> <h4>${product.title}</h4> <h6>Price: $ ${product.price}</h6> <h6>Quantity: ${product.quantity}</h6> </div>`
    };
    const result = await transporter.sendMail({
        from: `The Sticker Hub <${config.mailer.GMAIL_USER}>`,
        to: [config.mailer.GMAIL_USER, email],
        subject: `NEW ORDER BY ${name}`,
        html: `
        <div>
            <h2>ORDER: </h2>
            ${mailOrder}
        </div>
        `
    });
    
    res.send({status: "success", message: "Compra finalizada"})
});

export default router;