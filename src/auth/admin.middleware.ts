import { Request, Response } from "express";
import userService from "../services/user.service";

interface AuthRequest extends Request {
    user?: any
}

const onlyAdmin = async (req: AuthRequest, res: Response, next: Function) => {
    const userId = req.user.id;
    const role = await userService.getUserRoleById(userId);

    if (!role) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
    }
    if (role != "admin") {
        res.status(403).json({ error: "Acesso negado" });
        return;
    }
    next();
}

export default onlyAdmin;