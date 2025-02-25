import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { setupSwagger } from "./swagger";

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use("/api", routes);

// Configuração do Swagger
setupSwagger(app);

export default app;
