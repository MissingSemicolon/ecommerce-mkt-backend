import { Request, Response } from "express";
import UserService from "../services/user.service";
import { RegisterUserDTO, LoginUserDTO, RegisterUserAdminDTO } from "../dto/user.dto";

const register = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserDTO = req.body;
    const user = await UserService.registerUser({...userData, email: userData.email.toLowerCase().trim()});
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const registerAdmin = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserAdminDTO = req.body;
    const user = await UserService.registerUserAdmin({...userData, email: userData.email.toLowerCase().trim(),
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginUserDTO = req.body;
    const user = await UserService.loginUser(loginData);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({
      error: error.cause,
      message: error.message,
    });
  }
};

export default { register, login, registerAdmin };