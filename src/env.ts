import { z } from "zod";
import dotenv from "dotenv";

// Carrega variáveis do arquivo .env
// Se estiver rodando testes, pode apontar para um .env.test
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

// Schema de validação com Zod
const envSchema = z.object({
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(1),
    PORT: z.coerce.number().default(3333),
});

// Faz o parse e valida
export const env = envSchema.parse(process.env);