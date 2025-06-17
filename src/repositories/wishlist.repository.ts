import Wishlist from "../models/wishlist.model";

const findByUserId = async (userId: string) => {
    return Wishlist.findOne({ user_id: userId });
};

const create = async (userId: string, productId: string) => {
    const wishlist = new Wishlist({ user_id: userId, products: [productId] });
    return wishlist.save();
};

const addProduct = async (userId: string, productId: string) => {
    return Wishlist.findOneAndUpdate(
        { user_id: userId },
        { $addToSet: { products: productId } },
        { new: true }
    );
};

const removeProduct = async (userId: string, productId: string) => {
    return Wishlist.findOneAndUpdate(
        { user_id: userId },
        { $pull: { products: productId } },
        { new: true }
    );
};

const deleteById = async (id: string) => {
    return Wishlist.findByIdAndDelete(id);
};

export default { findByUserId, create, addProduct, removeProduct, deleteById };