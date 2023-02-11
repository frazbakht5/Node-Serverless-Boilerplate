import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

export interface IVideos {
  _id: string;
  seasons?: string[];
  category_id?: string;
  title: string;
  trailer: string;
  thumbnil: string;
  description?: string;
  video_url?: string;
  bg_url?: string;
  director_name?: string;
  actor_name?: string;
  release_year?: string;
  video_type?: string;
  partial_guide?: string;
  is_public?: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IVideos>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  category_id: {
    type: String,
    ref: 'Categories',
  },
  seasons: [{ type: String, ref: 'Seasons' }],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  trailer: {
    type: String,
  },
  thumbnil: {
    type: String,
  },
  video_url: {
    type: String,
  },
  bg_url: {
    type: String,
  },
  director_name: {
    type: String,
  },
  actor_name: {
    type: String,
  },
  release_year: {
    type: String,
  },
  video_type: {
    type: String,
  },
  partial_guide: {
    type: String,
  },
  is_public: {
    type: Boolean,
    default: true,
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
const Videos = model<IVideos>('Videos', schema);
export default Videos;
