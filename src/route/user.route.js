import { Router } from 'express';
import { asyncHandler } from '../middleware/async.js';
import { UserController } from '../controller/user.controller.js';

const router = Router();

router.get('/',     asyncHandler(UserController.list));
router.post('/',    asyncHandler(UserController.create));
router.get('/:id',  asyncHandler(UserController.get));
router.put('/:id',  asyncHandler(UserController.update));
router.delete('/:id', asyncHandler(UserController.remove));

export default router;
