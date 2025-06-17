import Product from "../models/product.model";

const create = async (product: any) => {
    const newProduct = new Product(product);
    return newProduct.save();
};

const deleteById = async (id: string) => {
    return Product.findByIdAndDelete(id);
};

const findAll = async () => {
    return Product.find();
};

const findById = async (id: string) => {
    return Product.findById(id);
};

const findByName = async (name: string) => {
    return Product.findOne({ name });
};

const updateById = async (id: string, product: any) => {
    return Product.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
    });
};

export default { create, deleteById, findAll, findById, findByName, updateById };