import mongoose, { Document, Schema } from 'mongoose';
import Category from './Category';

interface IUser extends Document {
  email: string;
  password: string;
  categories: Schema.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema({
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