import express from 'express';
import { 
    getTransactions, 
    createTransaction, 
    deleteTransaction, 
    getMonthlyTransactions 
} from '../controllers/transactionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

router.route('/')
    .get(getTransactions)
    .post(createTransaction);

router.get('/monthly', getMonthlyTransactions);

router.delete('/:id', deleteTransaction);

export default router;
