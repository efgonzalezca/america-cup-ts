import { Types } from 'mongoose';

export interface IUser {
  _id: string,
  password: string,
  names: string,
  surnames: string,
  score: number,
  selected_teams: {
    champion: string,
    runner_up: string,
    third_place: string
  }
  is_active: boolean
  //TODO: add role to manage accessing
}

export interface IMatchResult {
  _id: Types.ObjectId,
  user_id: string,
  match_id: string,
  local_score: number,
  visitor_score: number,
  points: number
}