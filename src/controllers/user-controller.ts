import { Request, Response } from 'express';
import { z } from 'zod';
import { hash } from "bcrypt"

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

        const hashedPassword = await hash(password, 8);

        return response.json({ name, email, password: hashedPassword });
    }

}
export { UserController };