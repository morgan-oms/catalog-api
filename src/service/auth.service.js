import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/User.js';

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export const AuthService = {
  async signup({ name, email, password }) {
    const exists = await User.findOne({ email }).lean();
    if (exists) throw new Error('EMAIL_IN_USE');

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, passwordHash });

    const token = jwt.sign({ sub: user._id, email: user.email, name: user.name }, jwtSecret, { expiresIn: jwtExpiresIn });
    return { user: { _id: user._id, name: user.name, email: user.email }, token };
  },

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('INVALID_CREDENTIALS');

    const ok = await user.comparePassword(password);
    if (!ok) throw new Error('INVALID_CREDENTIALS');

    const token = jwt.sign({ sub: user._id, email: user.email, name: user.name }, jwtSecret, { expiresIn: jwtExpiresIn });
    return { user: { _id: user._id, name: user.name, email: user.email }, token };
  },

  verify(token) {
    return jwt.verify(token, jwtSecret);
  }
};
