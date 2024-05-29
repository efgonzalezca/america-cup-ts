import { Request } from 'express';
import { Socket } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';

export interface IPayload extends JwtPayload {
  document: string
}
export interface ICustomRequest extends Request {
  payload?: IPayload
}

export interface ICustomSocket extends Socket {
  payload?: IPayload
}