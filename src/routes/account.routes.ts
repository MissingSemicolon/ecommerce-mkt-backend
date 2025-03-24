import express from 'express';
import userControlller from '../controllers/user.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Endpoints relacionados a contas de usuário
 */

/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria uma nova conta de usuário.
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *       400:
 *         description: Erro ao registrar usuário.
 */
router.post('/register', userControlller.register); // Rota para registro do usuário

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: Faz login de um usuário
 *     description: Autentica um usuário e retorna um token JWT.
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       400:
 *         description: Erro ao fazer login.
 */
router.post('/login', userControlller.login); // Rota para login do usuário

export default router;