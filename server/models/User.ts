import mongoose, { Document, Schema } from 'mongoose';
import Category from './Category';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  categories: Schema.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
});

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser };