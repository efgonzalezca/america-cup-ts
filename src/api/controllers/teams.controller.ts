import { NextFunction, Request, Response } from 'express';

import { TeamService } from '../../services';
import { getExtraParams, logger } from '../../utils';

export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let teams = await TeamService.findAll()?.lean();
    logger.info('Read teams', getExtraParams(req));
    return res
      .status(200)
      .json(teams)
  } catch(err) {
    return next(err);
  }
}