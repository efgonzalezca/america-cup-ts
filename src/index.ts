import dotenv from 'dotenv';
dotenv.config();

import config from './config';
import { Server } from './models';
import { mongooseLoader } from './loaders';

try {
  mongooseLoader(config.dbUriApp, config.dbNameApp);
  new Server().listen();
  process.on('SIGINT', () => {
    process.exit(0);
  })
  process.on('SIGTERM', () => {
    process.exit(0);
  })
} catch (e) {
  console.log(e);
  process.exit(1);
}