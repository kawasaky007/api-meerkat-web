const express = require('express');
const router = express.Router();
import middlewares from '../middlewares/crm-handler';
import InfoWeb from '../modules/crm/infoweb/routes';
import auth from '../modules/crm/auth/routes';

router.use('/info',InfoWeb)
router.use('/auth', auth);

module.exports = router;
