import { Router } from 'express';
import { DeliveriesController } from '@/controllers/deliveries-controller';
import { ensureAuthenticated } from '@/middleware/ensure-authenticated';
import { verifyUserAuthorization } from '@/middleware/verifyUserAuthorization';
import { DeliveriesStatusController } from '@/controllers/deliveries-status-controller';

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));

deliveriesRoutes.get('/', deliveriesController.index);
deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.patch('/:id/status', deliveriesStatusController.update);

export { deliveriesRoutes };