import mongoose from 'mongoose';

const ComicBookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    publisher: { type: String, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true  },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    total_pages: { type: Number, required: true, min: 1  },
    format: { type: String, required: true },
    value_payed: { type: Number, required: true, min: 0 },
    writer: { type: String, required: true },
    comic_type: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

ComicBookSchema.index({ title: 1, year: 1, publisher: 1 }, { unique: true });

export default mongoose.model('comicBook', ComicBookSchema);