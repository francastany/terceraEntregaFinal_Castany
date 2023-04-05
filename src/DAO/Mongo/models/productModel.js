import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number },
    img: { type: String, required: true }
})
const productModel = mongoose.model('Products', productSchema);
export default productModel;