import { Router } from 'express';

import * as ApiController from '../controllers/apiController';
import * as EmailController from '../controllers/emailController';

import { Auth } from '../middlewares/auth';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.post('/contato', EmailController.contato);

router.get('/list', Auth.validate, ApiController.list);




export default router;