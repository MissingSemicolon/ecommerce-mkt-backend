import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import { RegisterUserDTO, UserResponseDTO, LoginUserDTO, RegisterUserAdminDTO } from "../dto/user.dto";
import mongoose from "mongoose";

// Função para registrar usuários
const registerUser = async (userData: RegisterUserDTO): Promise<UserResponseDTO> => {
  const { name, email, password } = userData;
  const existingUser = await UserRepository.findByEmail(email);
  if (existingUser) throw new Error("Já existe um usuário com esse email.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserRepository.create({
    name,
    email,
    password: hashedPassword,
  });
  return {
    id: (newUser._id as mongoose.Types.ObjectId).toString(),
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

// Função para registrar administradores
const registerUserAdmin = async (userData: RegisterUserAdminDTO): Promise<UserResponseDTO> => {
  const { name, email, password } = userData;
  const existingUser = await UserRepository.findByEmail(email);
  if (existingUser) throw new Error("Já existe um usuário com esse email.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserRepository.create({
    name,
    email,
    password: hashedPassword,
    role: 'admin'
  });
  return {
    id: (newUser._id as mongoose.Types.ObjectId).toString(),
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

// Função de login
const loginUser = async (loginData: LoginUserDTO) => {
  const { email, password } = loginData;
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error("Usuário não encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return {
    token,
    user: {
      id: (user._id as mongoose.Types.ObjectId).toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    } as UserResponseDTO,
  };
};

const getUserRoleById = async (id: string) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error("Usuário não encontrado");
  return user.role;
};

export default { registerUser, loginUser, getUserRoleById, registerUserAdmin };