import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();
router.get('/suggest', middlewares(['admin']), controller.suggestJobs);
router.get('/', middlewares(['admin']), controller.getAllStaff);
router.post(
  '/:id/status',
  middlewares(['admin']),
  controller.toggleStatusStaff
);
router.put('/:id', middlewares(['admin']), controller.updateStaffInfo);
router.get('/:id', middlewares(['admin']), controller.getDetailStaff);
export default router;
