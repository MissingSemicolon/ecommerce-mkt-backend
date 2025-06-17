import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import UserRepository from "../repositories/user.repository";

dotenv.config();

const createTestUser = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  const testEmail = "user@user.com";
  const testPassword = "user123"; // Troque para uma senha segura em produção

  const existingUser = await UserRepository.findByEmail(testEmail);
  if (existingUser) {
    console.log("Usuário de teste já existe.");
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(testPassword, 10);

  await UserRepository.create({
    name: "Usuário Teste",
    email: testEmail,
    password: hashedPassword,
    role: "user",
  });

  console.log("Usuário de teste criado com sucesso!");
  await mongoose.disconnect();
};

createTestUser().catch((err) => {
  console.error("Erro ao criar usuário de teste:", err);
  mongoose.disconnect();
});