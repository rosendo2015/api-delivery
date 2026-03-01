import { Request, Response } from 'express';
import { prisma } from "@/database/prisma";
import { AppError } from '@/utils/AppError';
import { hash } from "bcrypt"
import { z } from 'zod';

class UserController {
    index(request: Request, response: Response) {
        return response.json({ message: "Users listed" });
    }
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.email(),
            password: z.string().min(6)
        });
        const { name, email, password } = bodySchema.parse(request.body);
        const userWithSameEmail = await prisma.user.findUnique({ where: { email } })
        if (userWithSameEmail) {
            throw new AppError("Email already exists", 400);
        }
        const hashedPassword = await hash(password, 8);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        })
        const { password: _, ...userWithoutPassword } = user
        return response.status(201).json(userWithoutPassword);
    }
}
export { UserController };