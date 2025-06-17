import express from "express";
import categoryController from "../controllers/category.controller";
import jwtMiddleware from "../auth/jwt.middleware";
import onlyAdmin from "../auth/admin.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints relacionados a categorias
 */

/**
 * @swagger
 * /categories/list:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista de todas as categorias disponíveis.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 *       500:
 *         description: Erro ao buscar as categorias.
 */
router.get("/list", categoryController.getAllCategories);

/**
 * @swagger
 * /categories/register:
 *   post:
 *     summary: Registra uma nova categoria
 *     description: Cria uma nova categoria no sistema.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria registrada com sucesso.
 *       400:
 *         description: Erro ao registrar a categoria.
 */
router.post(
  "/register",
  jwtMiddleware,
  onlyAdmin,
  categoryController.registerCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     description: Exclui uma categoria do sistema pelo ID.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 */
router.delete(
  "/:id",
  jwtMiddleware,
  onlyAdmin,
  categoryController.deleteCategory
);

export default router;
