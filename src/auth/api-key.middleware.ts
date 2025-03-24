import { Request, Response, NextFunction } from "express";

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header("x-api-key");

    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(403).json({ error: "Acesso não autorizado. API Key inválida." });
        return
    }
    
    next();
};

export default apiKeyMiddleware;