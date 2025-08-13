import ComicBook from '../model/ComicBook.js';

export const ComicRepository = {
  create: (data) => ComicBook.create(data),
  findById: (id) => ComicBook.findById(id).lean(),
  updateById: (id, data) =>
    ComicBook.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean(),
  deleteById: (id) => ComicBook.findByIdAndDelete(id),

  list: ({ page = 1, limit = 10, sort = '-createdAt', q, publisher, year, country, genre, comic_type }) => {
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (publisher) filter.publisher = publisher;
    if (year) filter.year = Number(year);
    if (country) filter.country = country;
    if (genre) filter.genre = genre;
    if (comic_type) filter.comic_type = comic_type;

    return ComicBook.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
  },

  count: (params) => {
    const { q, publisher, year, country, genre, comic_type } = params;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (publisher) filter.publisher = publisher;
    if (year) filter.year = Number(year);
    if (country) filter.country = country;
    if (genre) filter.genre = genre;
    if (comic_type) filter.comic_type = comic_type;

    return ComicBook.countDocuments(filter);
  }
};
