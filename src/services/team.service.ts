import { Connection, connections, Error, Model } from 'mongoose';

import config from '../config';
import { ITeam } from '../types';
import { teamSchema } from '../schemas';

export class TeamService {
  private static dbName: string = config.dbNameApp;
  private static db: (Connection | undefined) = connections.find((conn) => {
    return conn.name === this.dbName;
  })
  private static model: (Model<ITeam> | null) = this.db === undefined ? null : this.db.model<ITeam>('team', teamSchema);
  
  constructor() {}

  static findAll() {
    this.createModel();
    if(this.model) {
      return this.model.find();
    }
    return;
  }

  private static createModel() {
    this.validateConnection();
    if(!this.model) {
      this.model = this.db === undefined ? null : this.db.model<ITeam>('team', teamSchema);
    }
    if(!this.model) {
      throw new Error('Database not connected');
    }
  }

  private static validateConnection() {
    if(!this.db) {
      this.db = connections.find((conn) => {
        return conn.name === this.dbName;
      })
    }
  }
}