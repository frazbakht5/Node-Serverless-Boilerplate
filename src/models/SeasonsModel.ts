import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

export interface ISeasons {
  _id: string;
  episodes: string[];
  video_id: string;
  description: string;
  title: string;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ISeasons>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  video_id: {
    type: String,
    ref: 'Videos',
  },
  episodes: [{ type: String, ref: 'Episodes' }],

  description: {
    type: String,
  },
  title: {
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
const Seasons = model<ISeasons>('Seasons', schema);
export default Seasons;
