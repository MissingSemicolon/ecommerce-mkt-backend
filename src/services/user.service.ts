import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";


const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Já existe um usuário com esse email.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();
  return newUser;
};

// Função de login
const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuário não encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return { token, user };
};

export default { registerUser, loginUser };
