import { Request, Response } from 'express';
import { prisma } from "@/database/prisma";
import { z } from 'zod';
import { AppError } from '@/utils/AppError';

class DeliveryLogsController {
    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.uuid(),
        });
        const { delivery_id } = paramsSchema.parse(request.params);
        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                user: true,
                logs: true
            }
        });

        if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
            throw new AppError("Permissão para ver apenas seus pedidos", 401);
        }

        return response.json(delivery);
    }

    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.uuid(),
            description: z.string(),
        });
        const { delivery_id, description } = bodySchema.parse(request.body);
        const delivery = await prisma.delivery.findFirst({ where: { id: delivery_id } });

        if (!delivery) {
            throw new AppError('Delivery not found', 404);
        }
        if (delivery.status === "delivered") {
            throw new AppError('Delivery already delivered', 404);
        }
        if (delivery.status === "processing") {
            throw new AppError('change status to shipped', 400);
        }
        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        });

        return response.status(201).json({ message: 'Delivery log created successfully' });
    }
}
export { DeliveryLogsController }