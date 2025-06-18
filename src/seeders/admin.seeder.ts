import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  const adminEmail = "admin@admin.com";
  const adminPassword = "admin123";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log("Admin já existe.");
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Usuário admin criado com sucesso!");
  await mongoose.disconnect();
};

createAdmin().catch((err) => {
  console.error("Erro ao criar admin:", err);
  mongoose.disconnect();
});