const express = require('express');
const router = express.Router();
import middlewares from '../middlewares/crm-handler';
import InfoWeb from '../modules/crm/infoweb/routes';
import auth from '../modules/crm/auth/routes';
import typeTourism from '../modules/crm/type-tourism/routes'
import tours from '../modules/crm/tours/routes'

router.use('/info',InfoWeb)
router.use('/auth', auth);
router.use('/type-tourism',typeTourism)
router.use('/tours',tours)


module.exports = router;
