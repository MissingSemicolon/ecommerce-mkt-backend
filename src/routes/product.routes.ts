import express from 'express';
import productController from '../controllers/product.controller';
import jwtMiddleware from '../auth/jwt.middleware';

const router = express.Router();


router.get("/list", productController.getAllProducts)

router.get("/:id", productController.getProductById)

router.post("/register", jwtMiddleware, productController.registerProduct)

router.delete("/:id", jwtMiddleware, productController.deleteProduct)

router.put("/:id", jwtMiddleware, productController.updateProduct)

export default router;