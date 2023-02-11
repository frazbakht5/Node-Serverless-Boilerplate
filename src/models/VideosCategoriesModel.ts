import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

export interface ICategories {
  _id: string;
  title: string;
  description: string;
  videos: string[];
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ICategories>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  title: {
    type: String,
    required: true,
  },
  videos: [{ type: String, ref: 'Videos' }],

  description: {
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
const Categories = model<ICategories>('Categories', schema);
export default Categories;
