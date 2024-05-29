import { Router, json } from 'express';

import { login } from '../controllers';
import { validatorHandler } from '../middlewares';

export const router: Router = Router();

router.post(
  '/login',
  json(),
  validatorHandler('login', 'body'),
  login
)