import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();


router.post('/', middlewares(['admin']), controller.createTypeTourism);
router.get('/',controller.getAllTypeTourism)
router.get('/:id', middlewares(['admin']), controller.getDetailById);
router.put('/upload', middlewares(['admin']), controller.updateTypeTourism);
router.delete('/:id',middlewares(['admin']),controller.deleteItem)
export default router;
