import { Request } from 'express';

import { sign } from 'jsonwebtoken';
import { genSaltSync, hashSync } from 'bcryptjs';

import config from '../config';
import { IPayload } from '../types';

export class ErrorHandler extends Error {
  constructor(public statusCode: number, public code: number, public message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.code = code;
  }
}

export const generateJWT = (payload: IPayload) => {
  return new Promise((resolve, reject) => {
    sign(payload, config.secretKey, {expiresIn: '6h'}, (err, token) => {
      if(err) {
        reject('Failed to generate token');
      } else {
        resolve(token);
      }
    })
  })
}

export const generatePassword = (password: string) => {
  return hashSync(password, genSaltSync(parseInt(config.saltRounds)));
}

export const getIpAddress = (req: Request) => {
  if (req.headers['x-forwarded-for'] && typeof req.headers['x-forwarded-for'] === 'string') {
    return req.headers['x-forwarded-for'].split(',')[0];
  }
  return undefined;
}