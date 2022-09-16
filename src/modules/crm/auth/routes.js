import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';
const router = Router();

router.post('/signup', middlewares(['admin']), controller.signup);
router.post('/login', controller.login);

export default router;
