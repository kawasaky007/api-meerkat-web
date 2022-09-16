import { Router } from 'express';
import * as controller from './controllers';
import middlware from '../../../middlewares/crm-handler';
const router = Router(); //

router.post('/', middlware(['admin']), controller.create);
router.get('/', controller.getAll);
router.delete('/:_id', middlware(['admin']), controller.deleteProduct);
router.put('/:_id', middlware(['admin']), controller.update);

export default router;
