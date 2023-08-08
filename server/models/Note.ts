import mongoose, { Document, Schema } from 'mongoose';
import Category from './Category';
import { User } from './User';

interface INote extends Document {
  title: string;
  content: string;
  category_name: string;
  user_id: string;
  createdAt: Date;
}

const noteSchema: Schema<INote> = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category_name: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;
