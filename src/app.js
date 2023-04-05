import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import _handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";

import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/session.router.js';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js'

import initializeStrategies from './config/passport.config.js'
import config from "./config/config.js";
import __dirname from "./utils.js";

const app = express();
const PORT = process.env.PORT || 8080;

const connection = mongoose.connect(config.mongo.URL);  

app.engine('handlebars', handlebars.engine({
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

initializeStrategies();

app.use('/', viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });
