import { CreateCategoryDTO } from "../dto/category.dto";
import CategoryRepository from "../repositories/category.repository";

const registerCategory = async (category: CreateCategoryDTO) => {
  const existingCategory = await CategoryRepository.findByName(category.name);
  if (existingCategory) {
    throw new Error("Categoria já existe.");
  }
  const newCategory = await CategoryRepository.create(category);
  return newCategory;
};

const deleteCategory = async (id: string) => {
  const category = await CategoryRepository.deleteById(id);
  if (!category) {
    throw new Error("Categoria não encontrada.");
  }
  return category;
};

const getAllCategories = async () => {
  const categories = await CategoryRepository.findAll();
  return categories;
};

export default { registerCategory, deleteCategory, getAllCategories };