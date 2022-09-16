import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();

router.get('/me', middlewares(), controller.getProfile);
router.put('/password', middlewares(), controller.updatePassword);

export default router;
