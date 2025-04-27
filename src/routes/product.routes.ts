import express from 'express';
import apiKeyMiddleware from '../auth/api-key.middleware';

const router = express.Router();

router.post("/register", apiKeyMiddleware, (req, res) => {
    res.json({ message: "Registro de produtos acessado com sucesso!" });
});

router.get("/list", apiKeyMiddleware, (req, res) => {
    res.json({ message: "Lista de produtos acessada com sucesso!" });
});

export default router;
