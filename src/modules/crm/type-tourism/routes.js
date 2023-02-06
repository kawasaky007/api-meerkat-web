import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();


router.post('/', middlewares(['admin']), controller.createTypeTourism);
router.get('/',controller.getAllTypeTourism)
router.get('/slug/:slug', controller.getDetailBySlug);
router.get('/:id', middlewares(['admin']), controller.getDetailById);
router.put('/:id', middlewares(['admin']), controller.updateTypeTourism);
router.delete('/:id',middlewares(['admin']),controller.deleteItem)
export default router;
