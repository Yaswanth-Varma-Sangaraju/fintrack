import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(verifyToken, requireAdmin);

router.get('/stats', getAdminStats);

export default router;
