import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import config from '../app.config';

const router = Router();

const specs = swaggerJSDoc(config.docs_options);
router.use('/', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));

export default router;
