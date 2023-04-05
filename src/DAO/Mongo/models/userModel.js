import mongoose from "mongoose";

let modelName = "Users"
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: String
});

mongoose.models = {};

const userModel = mongoose.model(modelName, userSchema);
export default userModel;