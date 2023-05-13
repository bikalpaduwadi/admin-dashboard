import express from 'express';
import { getSales } from '../controllers/sales';

const router = express.Router();

router.get('/salesStats', getSales);

export default router;
