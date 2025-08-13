import mongoose from 'mongoose';
import ComicBook from './src/model/ComicBook.js';import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const firstComic = await ComicBook.findById("6892db7166fa109b69cd8afc").exec();
console.log(firstComic);