import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const comicBookSchema = new Schema({
  title: String,
  publisher: String,
  year: Number,
  country: String,
  description: String,
  genre: String,
  total_pages: Number,
  format: Date,
  value_payed: String,
  writer: String,
  comic_type: String,
  image: String,

});
const ComicBook = model('comicBook', comicBookSchema);
export default ComicBook;