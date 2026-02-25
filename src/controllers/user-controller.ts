import { Request, Response } from 'express';

class UserController {
    index(request: Request, response: Response) {
        return response.json({ message: "Users listed" });
    }

    create(request: Request, response: Response) {
        return response.json({ message: "User created" });
    }

}
export { UserController };