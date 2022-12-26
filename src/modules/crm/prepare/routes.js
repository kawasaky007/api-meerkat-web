import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();


router.post('/', middlewares(['admin']), controller.createItem);
router.get('/',controller.getAll)
router.get('/:id', middlewares(['admin']), controller.getDetailById);
router.put('/:id', middlewares(['admin']), controller.updateItem);
router.delete('/:id',middlewares(['admin']),controller.deleteItem)
export default router;
