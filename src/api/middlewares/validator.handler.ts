import { NextFunction, Request, Response } from 'express';

import { ErrorHandler } from '../../utils';
import { requestProperty, validateSchema } from '../../types';
import {
  loginDto,
  modifyMatchFromUserBodyDto,
  modifyMatchFromUserParamsDto,
  registerDto,
  userUpdateBodyDto,
  userUpdateParamsDto
} from '../../dtos';

const schemas = {
  login: {schema: loginDto, code: 40006},
  modifyMatchFromUserParams: {schema: modifyMatchFromUserParamsDto, code:40007},
  modifyMatchFromUserBody: {schema: modifyMatchFromUserBodyDto, code:40008},
  register: {schema: registerDto, code:40009},
  userUpdateParams: {schema: userUpdateParamsDto, code:40010},
  userUpdateBody: {schema: userUpdateBodyDto, code:40011}
}

export const validatorHandler = (schema: validateSchema, property: requestProperty ) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req[property];
    schemas[schema].schema.validateAsync(data, { abortEarly: false })
      .then((_value) => {
        next();
      })
      .catch((err) => {
        if(schema === 'login') {
          next(new ErrorHandler(400, schemas[schema].code, 'Invalid document or password'));
        }
        next(new ErrorHandler(400, schemas[schema].code, err.message));
      })
  }
}