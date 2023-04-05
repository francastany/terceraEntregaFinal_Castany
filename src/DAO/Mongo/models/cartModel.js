import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    products: { type: Array, required: true },
})
const cartModel = mongoose.model('Carts', cartSchema);
export default cartModel;