import mongoose from "mongoose";

interface IProduct extends mongoose.Document {
    name: String;
    description: String;
    price: Number;
    stock: Number;
    category: String;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema({
    name: { required: true, type: String },
    description: { required: false, type: String },
    price: { required: true, type: Number },
    stock: { required: true, type: Number },
    category: { required: true, type: String },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;