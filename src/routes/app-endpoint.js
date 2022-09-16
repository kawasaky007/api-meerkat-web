import { Router } from 'express';
import auth from '../modules/crm/auth/routes';
import users from '../modules/crm/users/routes';
import product from '../modules/crm/products/routes';
import project from '../modules/crm/projects/routes';
import staff from '../modules/crm/staff/routes';
import customer from '../modules/crm/customer/routes';
import statistics from '../modules/crm/statistics/routes';
import tasks from '../modules/crm/tasks/router';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/products', product);
router.use('/projects', project);
router.use('/staff', staff);
router.use('/customers', customer);
router.use('/statistics', statistics);
// router.use('/tasks', tasks);

export default router;
