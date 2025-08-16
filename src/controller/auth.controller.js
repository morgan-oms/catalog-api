import { AuthService } from '../service/auth.service.js';
import { ok, created } from '../utils/ApiResponse.js';

export const AuthController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const data = await AuthService.signup({ name, email, password });
    return created(res, data);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const data = await AuthService.login({ email, password });
    return ok(res, data);
  }
};
