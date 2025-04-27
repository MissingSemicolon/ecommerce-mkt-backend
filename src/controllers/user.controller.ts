import { Request, Response } from "express";
import UserService from "../services/user.service";
import validationService from "../services/validation.service";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if(!email || !validationService.validateEmail(email) ){
      const user = await UserService.registerUser(name, email.toLowerCase().trim(), password);
      res.status(400).json({ 
        error: "Formato de email inválido",
        message: "O email informado não é válido. Por favor, informe um email válido."
      })
    };
      
    if(validationService.validateEmail(email)){
      const user = await UserService.registerUser(name, email.toLowerCase().trim(), password);
      res.status(201).json(user);
    };

    
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({
      error: error.cause,
      message: error.message
    });
  }
};

export default { register, login };
