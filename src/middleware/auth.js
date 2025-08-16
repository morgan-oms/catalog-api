import { AuthService } from '../service/auth.service.js';

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' '); // "Bearer <token>"
    if (!token) return res.status(401).json({ success: false, error: 'UNAUTHORIZED' });

    const payload = AuthService.verify(token);
    req.user = { id: payload.sub, email: payload.email, name: payload.name };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'UNAUTHORIZED' });
  }
}
