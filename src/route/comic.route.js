import { Router } from 'express';
import { ComicController } from '../controller/comic.controller.js';
import { asyncHandler } from '../middleware/async.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth); // tudo abaixo exige login

router.get('/',     asyncHandler(ComicController.list));
router.post('/',    asyncHandler(ComicController.create));
router.get('/:id',  asyncHandler(ComicController.get));
router.put('/:id',  asyncHandler(ComicController.update));
router.delete('/:id', asyncHandler(ComicController.remove));

export default router;
