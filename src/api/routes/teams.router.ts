import { Router } from 'express';

import { getTeams } from '../controllers';
import { verifyJWT } from '../middlewares';

export const router: Router = Router();

router.get(
  '/',
  verifyJWT,
  getTeams
)