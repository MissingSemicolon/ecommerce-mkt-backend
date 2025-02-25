import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna status da API
 *     description: Verifica se a API está rodando corretamente.
 *     responses:
 *       200:
 *         description: API funcionando.
 */
router.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

export default router;
