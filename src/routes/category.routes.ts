import express from 'express';
import categoryController from '../controllers/category.controller';
import jwtMiddleware from '../auth/jwt.middleware';

const router = express.Router();


router.get("/list", categoryController.getAllCategories)

router.post("/register", jwtMiddleware, categoryController.registerCategory)

router.delete("/:id", jwtMiddleware, categoryController.deleteCategory)

export default router;
