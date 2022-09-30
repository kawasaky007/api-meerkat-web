import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();


router.post('/', middlewares(['admin']), controller.createInfoWeb);
router.put('/upload', middlewares(['admin']), controller.uploadInfoWeb);
router.get('/detail',controller.getDetailActive)
router.delete('/:id',controller.deleteItem)
export default router;
