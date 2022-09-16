import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';
const router = Router();

router.post('/tags/:projectId', middlewares(['admin']), controller.addTag);
router.delete('/tags/:projectId', middlewares(['admin']), controller.removeTag);

router.get('/', middlewares(['admin']), controller.getAllProject);
router.post('/', middlewares(['admin']), controller.create);
router.get(
  '/personal',
  middlewares(['staff', 'collab']),
  controller.staffGetOwnedProject
);
router.post(
  '/:projectId',
  middlewares(['staff', 'collab']),
  controller.staffUpdateProcess
);
router.get(
  '/:projectId',
  middlewares(['staff', 'collab', 'admin']),
  controller.getDetailProject
);
router.put(
  '/:projectId',
  middlewares(['staff', 'collab', 'admin']),
  controller.managerConfirmCompleteOrStart
);
router.put(
  '/:projectId/note',
  middlewares(['staff', 'collab', 'admin']),
  controller.anyoneUpdateNote
);

export default router;
