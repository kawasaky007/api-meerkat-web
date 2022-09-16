import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();

router.get('/', middlewares(), controller.getAllCustomer);
router.post('/many', middlewares(['admin']), controller.createAccountCustomers);
router.post('/', middlewares(['admin']), controller.createAccountForCustomer);
router.put('/:id', middlewares(['admin']), controller.updateCustomer);
router.get('/:id', middlewares(), controller.getDetailCustomer);

export default router;
