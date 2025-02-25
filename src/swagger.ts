import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Configuração do Swagger
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "Documentação da API do e-commerce",
    },
    servers: [{ url: "http://localhost:5000/api" }],
  },
  apis: ["./src/routes.ts"], // Caminho para os arquivos com as anotações Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Função para adicionar Swagger ao app
export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
