import { Request, Response } from 'express';
import { z } from 'zod';

class UserController {
    index(request: Request, response: Response) {
        return response.json({ message: "Users listed" });
    }

    create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.email(),
            password: z.string().min(6)
        });

        const { name, email, password } = bodySchema.parse(request.body);
        return response.json({ name, email, password });
    }

}
export { UserController };