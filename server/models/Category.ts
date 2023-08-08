import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  name: string;
  user_id: string;
}

const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true
  }
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
