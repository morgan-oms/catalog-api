import mongoose from 'mongoose';
import ComicBook from './model/ComicBook.js';

mongoose.connect('mongodb+srv://morganoms:s98xwUp@cluster0.701azfk.mongodb.net/CollectionApp?retryWrites=true&w=majority&appName=Cluster0');


const firstComic = await ComicBook.findById("6892db7166fa109b69cd8afc").exec();
console.log(firstComic);