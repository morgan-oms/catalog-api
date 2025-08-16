import { ComicService } from '../service/comic.service.js';
import { createComicSchema, updateComicSchema } from './schema/comic.schema.js';
import { ok, created, noContent } from '../utils/ApiResponse.js';

function normalizePayload(payload) {
  if (payload?.year) payload.year = Number(payload.year);
  if (payload?.total_pages) payload.total_pages = Number(payload.total_pages);
  if (payload?.value_payed) payload.value_payed = Number(payload.value_payed);
  return payload;
}

export const ComicController = {
  create: async (req, res) => {
    const parsed = createComicSchema.parse(req.body);
    const data = normalizePayload(parsed);
    data.owner = req.user.id
    const result = await ComicService.create(data);
    return created(res, result);
  },

  list: async (req, res) => {
    const { page, limit, sort, q, publisher, year, country, genre, comic_type } = req.query;
    const result = await ComicService.list({
      page, limit, sort, q, publisher, year, country, genre, comic_type,
      owner: req.user.id
    });
    return ok(res, result);
  },

   get: async (req, res) => {
    const item = await ComicService.get(req.params.id);
    if (String(item.owner?._id || item.owner) !== req.user.id) {
      return res.status(403).json({ success: false, error: 'FORBIDDEN' });
    }
    return ok(res, item);
  },

  update: async (req, res) => {
    const parsed = updateComicSchema.parse(req.body);
    const data = normalizePayload(parsed);

    const current = await ComicService.get(req.params.id);
    if (String(current.owner?._id || current.owner) !== req.user.id) {
      return res.status(403).json({ success: false, error: 'FORBIDDEN' });
    }
    const updated = await ComicService.update(req.params.id, data);
    return ok(res, updated);
  },


   remove: async (req, res) => {
    const current = await ComicService.get(req.params.id);
    if (String(current.owner?._id || current.owner) !== req.user.id) {
      return res.status(403).json({ success: false, error: 'FORBIDDEN' });
    }
    await ComicService.remove(req.params.id);
    return noContent(res);
  }
};