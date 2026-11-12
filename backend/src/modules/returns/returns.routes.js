import { Router } from 'express';
import { getReturns, postReturn } from './returns.controller.js';

const router = Router();
router.get('/', getReturns);
router.post('/', postReturn);
export default router;
