import express from 'express';
import { getBlocks, getBlockById } from '../controllers/blockController.js';
const router = express.Router();
router.get('/', getBlocks);
router.get('/:id', getBlockById);
export default router;