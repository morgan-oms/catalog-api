import { ComicService } from '../service/comic.service.js';
import { createComicSchema, updateComicSchema } from './schema/comic.schema.js';
import { ok, created, noContent } from '../utils/ApiResponse.js';

function normalizePayload(payload) {
  if (payload?.value_payed) payload.value_payed = Number(payload.value_payed);
  if (payload?.year) payload.year = Number(payload.year);
  if (payload?.total_pages) payload.total_pages = Number(payload.total_pages);
  return payload;
}

export const ComicController = {
  create: async (req, res) => {
    const parsed = createComicSchema.parse(req.body);
    const data = normalizePayload(parsed);
    const result = await ComicService.create(data);
    return created(res, result);
  },

  list: async (req, res) => {
    const { page, limit, sort, q, publisher, year, country, genre, comic_type } = req.query;
    const result = await ComicService.list({ page, limit, sort, q, publisher, year, country, genre, comic_type });
    return ok(res, result);
  },

  get: async (req, res) => {
    const result = await ComicService.get(req.params.id);
    return ok(res, result);
  },

  update: async (req, res) => {
    const parsed = updateComicSchema.parse(req.body);
    const data = normalizePayload(parsed);
    const result = await ComicService.update(req.params.id, data);
    return ok(res, result);
  },

  remove: async (req, res) => {
    await ComicService.remove(req.params.id);
    return noContent(res);
  }
};
