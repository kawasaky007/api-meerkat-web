import { Router } from 'express';
import auth from '../modules/crm/auth/routes';
import users from '../modules/crm/users/routes';
import customer from '../modules/crm/customer/routes';
import InfoWeb from '../modules/crm/infoweb/routes'
const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/customers', customer);
router.use('/info',InfoWeb)
// router.use('/tasks', tasks);

export default router;
