import { Schema } from 'mongoose';

//TODO: create schema to team --> local_team - visiting_team
const teamMatchSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  result: {
    type: Number,
    required: true
  }
})

export const matchSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  local_team: {
    type: teamMatchSchema
  },
  visiting_team: {
    type: teamMatchSchema
  },
  has_played: {
    type: Boolean,
    required: true,
  },
}, {
  collection: 'matches',
  versionKey: false
})