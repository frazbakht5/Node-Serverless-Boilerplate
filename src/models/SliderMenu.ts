import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

interface SliderMenus {
  _id: string;
  name: string;
  icon: string;
  description: string;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<SliderMenus>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
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
const SliderMenus = model<SliderMenus>('SliderMenus', schema);
export default SliderMenus;
