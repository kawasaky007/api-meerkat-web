import { Router } from 'express';
import middleware from '../../../middlewares/crm-handler';
import * as controller from './controller';

const router = Router();
router.get('/', middleware(['admin']), controller.getOverviewStatistic);

export default router;
