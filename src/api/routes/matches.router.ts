import { json, Router } from 'express';

import { verifyJWT } from '../middlewares';
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
  //TODO: add middleware authorized users
  updateMatch
)
