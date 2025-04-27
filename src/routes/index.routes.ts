import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Api Status
 *   description: Verificação do status da API
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna status da API
 *     tags: [Api Status]
 *     description: Verifica se a API está rodando corretamente.
 *     responses:
 *       200:
 *         description: API funcionando.
 */
router.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

export default router;
