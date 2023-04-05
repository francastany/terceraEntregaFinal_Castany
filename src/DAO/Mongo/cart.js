import cartModel from "./models/cartModel.js";
import productModel from "./models/productModel.js";

import { logger } from "../../services/logger.js";

class Cart {
    constructor(id, email, products) {
        this.id = id
        this.email = email
        this.products = products
    };

    async getAll() {
        try {
            const carts = await cartModel.find({});
            return carts
        } catch (error) {
            logger.warning('Error getting all carts.')
            // console.log(error);
        }
    };

    async getCart(userEmail) {
        try {
            const cart = await cartModel.findOne({ user: userEmail });
            return cart;
        } catch (error) {
            logger.warning('Error getting the cart.')
            // console.log('Error getting cart.');
        }
    };
    async createCart(userEmail) {
        try {
            const cart = {user: userEmail, products: []};
            await cartModel.create(cart);
            logger.info(`${userEmail} 's cart CREATED`);
            // console.log(`${userEmail} 's cart CREATED`);

        } catch (error) {
            logger.warning('Error creating cart.')
            // console.log('Error creating cart.', error);
            return error
        };
    };
    async deleteById(id){
        try {
            const cart = await cartModel.find({email: userEmail});
            await cartModel.deleteOne(cart);
        } catch (error) {
            logger.warning('Error deleting cart.')
            // console.log('Error deleting cart.');
        }
    };
    async addProduct(idCart, idProduct){
        try {
            const cart = await cartModel.findOne({ _id: idCart});
            const product = await productModel.findOne({ _id: idProduct});

            if(cart.products.length > 0) {

                const exists = cart.products.some(item => item._id == idProduct);
                if (exists) {
                    const newProducts = cart.products.map((product) => {
                        if (product._id == idProduct) {
                            if(!product.quantity) product.quantity = 2
                            else product.quantity++;

                            return product
                        };
                        return product
                    });
                    cart.products = [...newProducts];
                    await cartModel.updateOne({_id: idCart}, {products: cart.products});    
                } else {

                    cart.products.push(product);
                    await cartModel.updateOne({_id: idCart}, {products: cart.products});    
                
                }

            } else {
                cart.products.push(product);
                await cartModel.updateOne({_id: idCart}, {products: cart.products});
            }
        } catch (error) {
            logger.warning('Error adding product to the cart');
            // console.log('Error adding the product to the cart');            
        };
    };
    async deleteProduct(idCart, idProduct){
        try {
            const cart = await cartModel.find({ _id: idCart});
            const product = await productModel.find({ _id: idProduct});
            const exists = cart.products.some((item) => item._id === product._id);
            if (exists) {
                const index = cart.products.indexOf(product);
                cart.products.splice(index, 1);
                await cartModel.updateOne({_id: idCart}, {products: cart.products});
            } else {
                logger.error('The product is not in the cart.')
                // console.log('Cant find this product in the cart');
            }
        } catch (error) {
            logger.warning('Error deleting the product in the cart.')
            // console.log('Error deleting the product in the cart');
        }
    };
};
export default Cart;