import Category from "../models/category.model";

const findByName = async (name: string) => {
    return Category.findOne({ name });
};

const create = async (category: any) => {
    const newCategory = new Category(category);
    return newCategory.save();
};

const deleteById = async (id: string) => {
    return Category.findByIdAndDelete(id);
};

const findAll = async () => {
    return Category.find();
};

export default { findByName, create, deleteById, findAll };