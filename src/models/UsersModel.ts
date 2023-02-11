import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';
export interface IUsers {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  token: string;
  is_active: boolean;
  imageUrl: string;
  role?: string;
  auth_code?: string;
  is_stripe_attached?: boolean;
  stripe_account_id?: string;
  plan_purchasing_date?: Date;
  plan_expiry_date?: Date;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUsers>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  email: {
    type: String,
    required: [true, 'Please Provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'PLease provide a password'],
  },
  token: {
    type: String,
  },
  full_name: {
    type: String,
  },
  phone: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  auth_code: {
    type: String,
  },
  role: {
    type: String,
  },
  stripe_account_id: {
    type: String,
  },
  is_stripe_attached: {
    type: Boolean,
    default: false,
  },
  plan_purchasing_date: {
    type: Date,
  },
  plan_expiry_date: {
    type: Date,
  },
  is_active: {
    type: Boolean,
    default: false,
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
const Users = model<IUsers>('Users', schema);
export default Users;
