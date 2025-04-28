import mongoose from "mongoose";

interface ICategory extends mongoose.Document {
    name: String;
    createdAt: Date;
}; 

const categorySchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;