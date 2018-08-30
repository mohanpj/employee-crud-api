import * as express from 'express';
import * as cors from 'cors';

import getHandler from './handlers/getHandler';
import postHandler from './handlers/postHandler';

const router = express.Router();

router
  .get('/employees', cors(), getHandler)
  .post('/employee', postHandler)
  .put('/employee', getHandler)
  .delete('employee/', getHandler);

export default router;