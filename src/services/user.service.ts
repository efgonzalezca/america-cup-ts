import { Connection, connections, Error, Model } from 'mongoose';

import config from '../config';
import { IUser } from '../types';
import { userSchema } from '../schemas';
import { generatePassword } from '../utils';

interface userData {
  _id: string,
  password: string,
  names: string,
  surnames: string,
  score: number,
  selected_teams: {
    champion: string | null,
    runner_up: string | null,
    third_place: string | null
  }
}

type updatedType = 'password' | 'champion' | 'runner_up' | 'third_place';

export class UserService {
  private static dbName: string = config.dbNameApp;
  private static db: (Connection | undefined) = connections.find((conn) => {
    return conn.name === this.dbName;
  })
  private static model: (Model<IUser> | null) = this.db === undefined ? null : this.db.model<IUser>('user', userSchema);
  
  constructor() {}

  static findById(id: string) {
    this.createModel();
    if(this.model) {
      return this.model.findById(id);
    }
    return;
  }

  static findAll(projection={}) {
    this.createModel();
    if(this.model) {
      return this.model.find({}, projection);
    }
    return;
  }

  static create(userData: userData) {
    this.createModel();
    if(this.model) {
      userData.password = generatePassword(userData.password);
      return this.model.create(userData);
    }
    return;
  }

  static async exists(id: string) {
    this.createModel()
    if(this.model) {
      let user = await this.model.findById(id).lean();
      return user ? true : false;
    }
    return;
  }

  static updateById(id: string, value: string, type: updatedType) {
    this.createModel();
    if(this.model) {
      let update = {};
      const types = {
        password: () => {
          let newPassword = generatePassword(value)
          return {
            password: newPassword
          }
        },
        champion: () => ({'selected_teams.champion': value}),
        runner_up: () => ({'selected_teams.runner_up': value}),
        third_place: () => ({'selected_teams.third_place': value})
      }
      update = types[type]();
      return this.model.findOneAndUpdate(
        {_id: id},
        update
      );
    }
    return;
  }

  static updateUserScore(user: {_id: string, score: number, points: number}) {
    this.createModel()
    if(this.model) {
      return this.model.findOneAndUpdate(
        {_id: user._id},
        {score: user.score + user.points}
      ).lean();
    }
    return;
  }

  static async updateUsersScore(users: {_id: string, score: number, points: number}[]) {
    for (let user of users) {
      await this.updateUserScore(user);
    }
  }

  private static createModel() {
    this.validateConnection();
    if(!this.model) {
      this.model = this.db === undefined ? null : this.db.model<IUser>('user', userSchema);
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