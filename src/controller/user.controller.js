import { UserService } from '../service/user.service.js';
import { ok, created, noContent } from '../utils/ApiResponse.js';

export const UserController = {
  create: async (req, res) => created(res, await UserService.create(req.body)),
  list:   async (req, res) => ok(res, await UserService.list(req.query)),
  get:    async (req, res) => ok(res, await UserService.get(req.params.id)),
  update: async (req, res) => ok(res, await UserService.update(req.params.id, req.body)),
  remove: async (req, res) => { await UserService.remove(req.params.id); return noContent(res); }
};
