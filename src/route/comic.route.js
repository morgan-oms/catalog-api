import { Router } from 'express';
import { ComicController } from '../controller/comic.controller.js';
import { asyncHandler } from '../middleware/async.js';

const router = Router();

router.get('/',     asyncHandler(ComicController.list));
router.post('/',    asyncHandler(ComicController.create));
router.get('/:id',  asyncHandler(ComicController.get));
router.put('/:id',  asyncHandler(ComicController.update));
router.delete('/:id', asyncHandler(ComicController.remove));

export default router;
