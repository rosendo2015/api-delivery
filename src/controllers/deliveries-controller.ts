import { Request, Response } from 'express';
class DeliveriesController {
    index(request: Request, response: Response) {
        return response.json({ message: 'List deliveries' });
    }
    create(request: Request, response: Response) {
        return response.json({ message: 'Create delivery' });
    }
}
export { DeliveriesController }