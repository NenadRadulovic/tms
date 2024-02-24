import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json' assert { type: 'json' };

export default (route: Router) => {
  route.use('/swagger', swaggerUi.serve);
  route.get('/swagger', swaggerUi.setup(swaggerDocument));
};
