import mongoose, { Document, Schema } from 'mongoose';
import User from './User';
import Category from './Category';

interface INote extends Document {
  title: string;
  content: string;
  category: Schema.Types.ObjectId;
  photos: string[];
  createdBy: Schema.Types.ObjectId;
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  photos: [{ type: String }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;
