import { ComicRepository } from '../repository/comic.repository.js';

export const ComicService = {
  async create(data) {
    data.title = data.title?.trim();
    return ComicRepository.create(data);
  },
  async get(id) {
    const item = await ComicRepository.findById(id);
    if (!item) throw new Error('NOT_FOUND');
    return item;
  },
  async update(id, data) {
    const updated = await ComicRepository.updateById(id, data);
    if (!updated) throw new Error('NOT_FOUND');
    return updated;
  },
  async remove(id) {
    const deleted = await ComicRepository.deleteById(id);
    if (!deleted) throw new Error('NOT_FOUND');
    return;
  },
  async list(params) {
    const [items, total] = await Promise.all([
      ComicRepository.list(params),
      ComicRepository.count(params)
    ]);
    const page = Number(params.page || 1);
    const limit = Number(params.limit || 10);
    return { items, total, page, limit };
  }
};
