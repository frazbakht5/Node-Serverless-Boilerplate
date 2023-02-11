import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';

export interface IAdminUsers {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  token: string;
  is_active: boolean;
  imageUrl: string;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IAdminUsers>({
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
    default: '',
  },
  full_name: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
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
const AdminUsers = model<IAdminUsers>('AdminUsers', schema);
export default AdminUsers;
