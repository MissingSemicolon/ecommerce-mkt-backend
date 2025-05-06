import express from 'express';
import productController from '../controllers/product.controller';
import jwtMiddleware from '../auth/jwt.middleware';
import onlyAdmin from '../auth/admin.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints relacionados a produtos
 */

/**
 * @swagger
 * /products/list:
 *   get:
 *     summary: Lista todos os produtos
 *     description: Retorna uma lista de todos os produtos disponíveis.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 *       500:
 *         description: Erro ao buscar os produtos.
 */
router.get("/list", productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     description: Retorna os detalhes de um produto específico.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /products/register:
 *   post:
 *     summary: Registra um novo produto
 *     description: Cria um novo produto no sistema.
 *     tags: [Products]
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
 *               stock:
 *                 type: number
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT para autenticação
 *     responses:
 *       201:
 *         description: Produto registrado com sucesso.
 *       400:
 *         description: Erro ao registrar o produto.
 */
router.post("/register", jwtMiddleware, onlyAdmin, productController.registerProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     description: Exclui um produto do sistema pelo ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
*       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT para autenticação
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
router.delete("/:id", jwtMiddleware, onlyAdmin, productController.deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     description: Atualiza as informações de um produto existente.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT para autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o produto.
 *       404:
 *         description: Produto não encontrado.
 */
router.put("/:id", jwtMiddleware, onlyAdmin, productController.updateProduct);

export default router;