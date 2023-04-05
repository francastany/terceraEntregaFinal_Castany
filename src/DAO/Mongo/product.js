import productModel from "./models/productModel.js";

import { logger } from "../../services/logger.js";

class Product {
    constructor(id, title, price, stock, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.img = img;
    };
    async save(product) {
        try {
            await productModel.save(product);
            const newProduct = await product.find(product);
            return newProduct;
        } catch (error) {
            logger.warning('Error creating product.');
            // console.log('Error creating product.');
        }
    };
    async getAll() {
        try {
            const products = await productModel.find({});
            return products;
        } catch (error) {
            logger.warning('Error finding all products.');
            // console.log('Error finding all products.');
        }
    };
    async getById(id){
        try {
            const product = await productModel.find({_id: id});
            return product;
        } catch (error) {
            logger.warning('Error finding the product.');
            // console.log('Error finding product.');
        }
    };
    async deleteAll() {
        try {
            await productModel.deleteMany({});
        } catch (error) {
            logger.warning('Error deleting all products.');
            // console.log('Error deleting all products.');
        }
    };
    async deleteById(id) {
        try {
            const product = await productModel.find({_id: id});
            await productModel.deleteOne(product);
        } catch (error) {
            logger.warning('Error deleting product.');
            // console.log('Error deleting product.');
        }
    };
    async update(product){
        try {
            const {title, price, thumbnail, id} = product;
            await productModel.updateOne({_id: id}, { title, price, thumbnail });
        } catch (error) {
            logger.warning('Error updating product');
            // console.log('Error updating product.');   
        }
    }
};
export default Product;