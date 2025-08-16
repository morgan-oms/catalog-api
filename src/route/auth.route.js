import { Router } from 'express';
import { asyncHandler } from '../middleware/async.js';
import { AuthController } from '../controller/auth.controller.js';

const router = Router();

router.post('/signup', asyncHandler(AuthController.signup));
router.post('/login',  asyncHandler(AuthController.login));

export default router;
