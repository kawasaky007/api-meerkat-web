import * as controller from './controllers';
import { Router } from 'express';
import middlewares from '../../../middlewares/crm-handler';

const router = Router();


router.post('/', middlewares(['admin']), controller.createInfoWeb);


export default router;
