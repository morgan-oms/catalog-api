import { UserRepository } from '../repository/user.repository.js';

export const UserService = {
  async create(data) {
    return UserRepository.create(data);
  },
  async get(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('NOT_FOUND');
    return user;
  },
  async list(params) {
    const [items, total] = await Promise.all([UserRepository.list(params), UserRepository.count(params)]);
    return { items, total, page: Number(params.page || 1), limit: Number(params.limit || 10) };
  },
  async update(id, data) {
    const updated = await UserRepository.updateById(id, data);
    if (!updated) throw new Error('NOT_FOUND');
    return updated;
  },
  async remove(id) {
    const deleted = await UserRepository.deleteById(id);
    if (!deleted) throw new Error('NOT_FOUND');
    return;
  }
};
