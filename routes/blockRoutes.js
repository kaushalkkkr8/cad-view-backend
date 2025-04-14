import express from 'express';
import { getBlocks, getBlockById, getAllBlocks } from '../controllers/blockController.js';
const router = express.Router();
router.get('/allBlocks/:fileId', getBlocks);
router.get('/allBlocksData',getAllBlocks)
router.get('/:id', getBlockById);
export default router;