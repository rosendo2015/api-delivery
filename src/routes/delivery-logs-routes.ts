import { Router } from 'express';
import { DeliveryLogsController } from '@/controllers/delivery-logs-controller';
import { ensureAuthenticated } from '@/middleware/ensure-authenticated';
import { verifyUserAuthorization } from '@/middleware/verifyUserAuthorization';
import { AppError } from '@/utils/AppError';
import { request } from 'node:http';

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.get('/:delivery_id/show', ensureAuthenticated, verifyUserAuthorization(["sale", "customer"]), deliveryLogsController.show);
deliveryLogsRoutes.post('/', ensureAuthenticated, verifyUserAuthorization(["sale"]), deliveryLogsController.create);



export { deliveryLogsRoutes };