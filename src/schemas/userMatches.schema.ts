import { Schema, Types } from 'mongoose';

const discriminated_points = new Schema({
  matchPoints: {
    type: Number
  },
  localScorePoints: {
    type: Number
  },
  visitorScorePoints: {
    type: Number
  },
  exactScore: {
    type: Number
  },
  addPoints: {
    type: Number
  }
}, {_id: false})

export const userMatchesSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    required:true,
    auto: true 
  },
  user_id: {
    type: String,
    required: true,
  },
  match_id: {
    type: String,
    required: true,
  },
  local_score: {
    type: Number,
  },
  visitor_score: {
    type: Number,
  },
  discriminated_points: {
    type: discriminated_points,
  },
  points: {
    type: Number,
    default: 0
  }
}, {
  collection: 'users_matches',
  versionKey: false
})