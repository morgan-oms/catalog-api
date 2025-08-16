import User from '../model/User.js';

export const UserRepository = {
  create: (data) => User.create(data),
  findById: (id) => User.findById(id).lean(),
  findByEmail: (email) => User.findOne({ email }).lean(),
  list: ({ page = 1, limit = 10, sort = '-createdAt', q }) => {
    const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
    return User.find(filter).sort(sort).skip((page - 1) * limit).limit(Number(limit)).lean();
  },
  count: ({ q }) => {
    const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
    return User.countDocuments(filter);
  },
  updateById: (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean(),
  deleteById: (id) => User.findByIdAndDelete(id),
};
