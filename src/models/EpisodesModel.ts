import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

export interface IEpisodes {
  _id: string;
  season_id: object;
  thumbnil: object;
  title: string;
  description: string;
  episode_url: string;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IEpisodes>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  season_id: {
    type: String,
    ref: 'Seasons',
  },
  title: {
    type: String,
    required: true,
  },
  thumbnil: {
    type: String,
  },
  description: {
    type: String,
  },
  episode_url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Create a Model.
const Episodes = model<IEpisodes>('Episodes', schema);
export default Episodes;
