import { verify } from 'jsonwebtoken';
import { Server as IOServer } from 'socket.io';

import config from '../config';
import { logger } from '../utils';
import { ICustomSocket, IPayload} from '../types';

export class Sockets {
  private io: IOServer;

  constructor(io: IOServer) {
    this.io = io;
    this.socketEvents();
  }

  middlewares() {
    this.io.use((socket: ICustomSocket, next) => {
      const token = socket.handshake.auth.token;
      try {
        const payload = <IPayload>verify(token, config.secretKey);
        socket.payload = payload;
        next();
      } catch(err) {
        logger.error('Failed socket authentication');
        next(new Error('Failed socket authentication'));
      }
    })
  }

  socketEvents() {
    this.middlewares();
    this.io.on('connection', (socket: ICustomSocket) => {
      logger.info(`Client ${socket.payload?.document} with id ${socket.id} connected`);
      socket.emit('test', {name: 'Desarrollo & Analítica', date: new Date()});
      socket.on('disconnect', () => {
        logger.info(`Client ${socket.payload?.document} with id ${socket.id} disconnected`);
      })
    })
  }
}