import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';
interface ForgetPassword {
  _id: string;
  email: string;
  code: string;
  token: string;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ForgetPassword>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please Provide your email'],
    unique: true,
    lowercase: true,
  },
  token: {
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
const ForgetPassword = model<ForgetPassword>('ForgetPasswords', schema);
export default ForgetPassword;
