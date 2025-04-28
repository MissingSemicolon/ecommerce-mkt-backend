import CategoryService from '../services/category.service';

const registerCategory = async (req: any, res: any) => {
    try {
        const category = req.body;
        const newCategory = await CategoryService.registerCategory(category);
        res.status(201).json(newCategory);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const deleteCategory = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryService.deleteCategory(id);
        res.status(200).json(deletedCategory);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const getAllCategories = async (req: any, res: any) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export default { registerCategory, deleteCategory, getAllCategories };