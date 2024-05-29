import { Connection, createConnection } from 'mongoose';

import { logger } from '../utils';

export const mongooseLoader = (dbUri: string, dbName: string) => {
  createConnection(dbUri, {
    dbName: dbName,
    maxPoolSize: 10,
    autoCreate: true
  }).asPromise()
    .then((conn: Connection) => {
      conn.on('error', (err) => {
        logger.error(`Database ${ dbName } has an error`, err.message);
      })
    
      conn.on('connected', () => {
        logger.info(`Database ${ dbName } connected`);
      })
    
      conn.on('disconnected', () => {
        logger.warn(`Database ${ dbName } disconnected`);
      })
    })
    .catch((err: Error) => {
      logger.error(`Database ${dbName} connection error`, err.message);
      mongooseLoader(dbUri, dbName);
    })
}