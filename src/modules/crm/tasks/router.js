import { Router } from 'express';
import * as controller from './controller';
import middleware from '../../../middlewares/crm-handler';

const router = Router();

// router.get('/', middleware(), controller.getAll);
export default router;
