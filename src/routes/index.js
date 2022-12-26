const express = require('express');
const router = express.Router();
import middlewares from '../middlewares/crm-handler';
import InfoWeb from '../modules/crm/infoweb/routes';
import auth from '../modules/crm/auth/routes';
import typeTourism from '../modules/crm/type-tourism/routes'
import tours from '../modules/crm/tours/routes'
import slide from '../modules/crm/slide/routes'
import prepare from '../modules/crm/prepare/routes'

router.use('/info',InfoWeb)
router.use('/auth', auth);
router.use('/type-tourism',typeTourism)
router.use('/tours',tours)
router.use('/slides',slide)
router.use('/prepares',prepare)


module.exports = router;
