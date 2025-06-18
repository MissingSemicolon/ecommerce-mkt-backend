import { Request, Response } from "express";
import CategoryService from "../services/category.service";
import { CreateCategoryDTO } from "../dto/category.dto";

const registerCategory = async (req: Request, res: Response) => {
  try {
    const category: CreateCategoryDTO = { name: req.body.name };
    const newCategory = await CategoryService.registerCategory(category);
    res.status(201).json({ message: "Categoria Cadastrada com Sucesso!", value: newCategory });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await CategoryService.deleteCategory(id);
    res.status(200).json({message: "Categoria Deletada com Sucesso!", value: deletedCategory});
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default { registerCategory, deleteCategory, getAllCategories };
