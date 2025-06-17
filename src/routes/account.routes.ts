import express from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user.controller';
import jwtMiddleware from '../auth/jwt.middleware';
import onlyAdmin from '../auth/admin.middleware';

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
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("O campo 'name' é obrigatório."),
        body("email").isEmail().withMessage("O campo 'email' deve ser um email válido."),
        body("password").isLength({ min: 6 }).withMessage("O campo 'password' deve ter pelo menos 6 caracteres."),
    ], userController.register
);

/**
 * @swagger
 * /account/register/admin:
 *   post:
 *     summary: Registra um novo administrador
 *     description: Cria uma nova conta de administrador.
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
 *         description: Administrador registrado com sucesso.
 *       400:
 *         description: Erro ao registrar administrador.
 */
router.post("/register/admin", 
    [
        body("name").notEmpty().withMessage("O campo 'name' é obrigatório."),
        body("email").isEmail().withMessage("O campo 'email' deve ser um email válido."),
        body("password").isLength({ min: 6 }).withMessage("O campo 'password' deve ter pelo menos 6 caracteres."),
    ], jwtMiddleware, onlyAdmin, userController.registerAdmin
)
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
router.post('/login', [
        body("email").isEmail().withMessage("O campo 'email' deve ser um email válido."),
        body("password").notEmpty().withMessage("O campo 'password' é obrigatório.")
    ], userController.login); 

export default router;