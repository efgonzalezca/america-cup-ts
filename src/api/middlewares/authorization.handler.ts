import { NextFunction, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

import config from '../../config';
import { ErrorHandler } from '../../utils';
import { ICustomRequest, IPayload } from '../../types';

export const verifyJWT = (req: ICustomRequest, _res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')?.split(' ');
  
  if(authorization?.length != 2 || authorization[0] != 'Bearer') {
    throw new ErrorHandler(401, 40101, 'Error in header authorization');
  }

  try {
    let payload = <IPayload>verify(authorization[1], config.secretKey);
    req.payload = payload;
    next();
  } catch (err) {
    if(err instanceof TokenExpiredError) {
      throw new ErrorHandler(401, 40102, 'Your session has expired');
    }
    throw new ErrorHandler(401, 40103, 'Authorization error');
  }
}

export const authorized = (req: ICustomRequest, _res: Response, next: NextFunction) => {
  if(req.payload?.role !== 'admin') {
    throw new ErrorHandler(403, 40301, 'Forbidden access');
  }
  return next();
}