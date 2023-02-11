import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

export interface IPauseResume {
  _id: string;
  video_id: string;
  user_id: string;
  duration: string;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IPauseResume>({
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
  duration: {
    type: String,
    default: '0.0',
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
const PauseResume = model<IPauseResume>('pause_resume', schema);
export default PauseResume;
