import express from "express";
import cors from "cors";
import helmet from "helmet";
import index from "./routes/index.routes";
import { setupSwagger } from "./swagger";
import connectDB from "./config/db";
import accountRoutes from "./routes/account.routes";
import productRoutes from "./routes/product.routes";

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use("/", index);

// Conectar ao banco de dados
connectDB();
    
// Rotas
app.use("/account", accountRoutes);
app.use("/products", productRoutes);

// Configuração do Swagger
setupSwagger(app);

export default app;
