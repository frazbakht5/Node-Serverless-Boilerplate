import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

export interface IWatchlater {
  _id: string;
  video_id: string;
  user_id: string;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IWatchlater>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  video_id: {
    type: String,
    ref: 'Videos',
  },
  user_id: {
    type: String,
    ref: 'Users',
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
const Watchlater = model<IWatchlater>('Watchlater', schema);
export default Watchlater;
