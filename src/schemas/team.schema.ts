import { Schema } from 'mongoose';

export const teamSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  fifa_rank: {
    type: String,
    required: true,
  },
}, {
  collection: 'teams',
  versionKey: false
})