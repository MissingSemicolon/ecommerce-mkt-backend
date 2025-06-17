import mongoose from "mongoose";

interface IWishlist extends mongoose.Document {
    user_id: mongoose.Types.ObjectId;
    products: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const wishlistSchema = new mongoose.Schema({
    user_id: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;