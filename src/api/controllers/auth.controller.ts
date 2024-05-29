import { compareSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

import { IPayload } from '../../types';
import { UserService, UserMatchesService } from '../../services';
import { ErrorHandler, generateJWT, getExtraParams, logger } from '../../utils';

interface login {
  document: string,
  password: string
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  let { document, password } = <login>req.body;
  try {
    let user = await UserService.findById(document)?.lean();
    
    if(!user) {
      throw new ErrorHandler(400, 40001, 'Invalid user or password');
    }
    
    if(!user.is_active) {
      throw new ErrorHandler(401, 40004, 'Invalid account');
    }

    if(!compareSync(password, user.password)) {
      throw new ErrorHandler(400, 40001, 'Invalid user or password');
    }

    let payload: IPayload = {
      document: user._id
    }
    
    const matches_results = await UserMatchesService.findAllByUser(user._id, {_id: false, user_id: false})?.lean();

    const token = await generateJWT(payload);
    logger.info(`Login user ${user._id}`, getExtraParams(req));
    return res
      .status(200)
      .json({
        token: token,
        document: user._id,
        names: user.names,
        score: user.score,
        selected_teams: user.selected_teams,
        matches_results: matches_results?.map((matchResult) => ({
          _id: matchResult.match_id,
          local_score: matchResult.local_score,
          visitor_score: matchResult.visitor_score
        }))
      })
  } catch(err) {
    return next(err);
  }
}