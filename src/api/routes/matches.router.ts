import { json, Router } from 'express';

import { authorized, verifyJWT } from '../middlewares';
import { getMatches, updateMatch } from '../controllers';

export const router: Router = Router();

router.get(
  '/',
  verifyJWT,
  getMatches
)

router.patch(
  '/:id',
  json(),
  verifyJWT,
  authorized,
  updateMatch
)
