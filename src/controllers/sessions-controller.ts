import { authConfig } from '@/configs/auth';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SignOptions } from "jsonwebtoken";
import z from 'zod';
class SessionsController {
    async index(request: Request, response: Response) {

        return response.json({ message: "Welcome to the sessions" });
    }
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email(),
            password: z.string().min(6)
        });
        const { email, password } = bodySchema.parse(request.body);

        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const options: SignOptions = {
            subject: String(user.id),   // precisa ser string
            expiresIn: "1h"             // ou número em segundos
        };

        const token = jwt.sign(
            { role: user.role ?? "customer" },
            secret,
            options
        );

        const { password: hashedPassword, ...userWithoutPassword } = user;

        return response.json({ token, user: userWithoutPassword });
    }
}
export { SessionsController };