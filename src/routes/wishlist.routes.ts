import express from "express";
import wishlistController from "../controllers/wishlist.controller";
import jwtMiddleware from "../auth/jwt.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Endpoints relacionados à lista de desejos
 */

/**
 * @swagger
 * /wishlist/:
 *   get:
 *     summary: Lista os produtos na lista de desejos
 *     description: Retorna uma lista de produtos que o usuário adicionou à sua lista de desejos.
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: Lista de desejos retornada com sucesso.
 *       404:
 *         description: Lista de desejos vazia ou não encontrada.
 *       500:
 *         description: Erro ao buscar os produtos.
 */
router.get("/", jwtMiddleware, wishlistController.getWishlist);

/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Adiciona um produto à lista de desejos
 *     description: Permite que o usuário adicione um produto à sua lista de desejos.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID do produto a ser adicionado.
 *     responses:
 *       201:
 *         description: Produto adicionado à lista de desejos com sucesso.
 *       400:
 *         description: Erro ao adicionar o produto.
 */
router.post("/add", jwtMiddleware, wishlistController.addProduct);

/**
 * @swagger
 * /wishlist/remove:
 *   delete:
 *     summary: Remove um produto da lista de desejos
 *     description: Permite que o usuário remova um produto da sua lista de desejos.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID do produto a ser removido.
 *     responses:
 *       200:
 *         description: Produto removido da lista de desejos com sucesso.
 *       404:
 *         description: Produto não encontrado na lista de desejos.
 */
router.delete("/remove", jwtMiddleware, wishlistController.removeProduct);

export default router;
