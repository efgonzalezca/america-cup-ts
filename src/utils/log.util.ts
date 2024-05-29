import { Request } from 'express';
import { createLogger, format, transports } from 'winston';

import config from '../config';
import { IExtraParams } from '../types';
import { getIpAddress } from './http.util';

const { timestamp, combine, json } = format;

export const logger = createLogger({
  transports: [
    new transports.File({
      level: 'debug',
      maxsize: 10240000,
      maxFiles: 5,
      filename: `${config.logFile}/debug.log`,
      format: combine(
        timestamp(),
        json()
      )
    }),
    new transports.Console({
      level: 'debug',
      format: combine(
        timestamp(),
        json()
      )
    })
  ]
})

export const getExtraParams: Function = (request: Request) => {
  let extra: IExtraParams = {
    host: getIpAddress(request) || 'undefined',
    httpMethod: request.method,
    endpoint: request.originalUrl
  }
  return extra;
}