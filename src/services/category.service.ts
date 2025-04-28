import Category from "../models/category.model";

const registerCategory = async (category: any) => {
    const existingCategory = await Category.findOne({ name: category.name });
    if (existingCategory) {
        throw new Error("Categoria já existe.");
    }
    const newCategory = new Category(category);
    await newCategory.save();
    return newCategory;
}

const deleteCategory = async (id: string) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new Error("Categoria não encontrada.");
    }
    return category;
}

const getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
}

export default { registerCategory, deleteCategory, getAllCategories };