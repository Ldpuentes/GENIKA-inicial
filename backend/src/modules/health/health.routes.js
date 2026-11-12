import { Router } from 'express';
import { getPool } from '../../config/database.js';

const router = Router();
router.get('/', async (_req, res, next) => {
  try {
    const pool = await getPool();
    await pool.request().query('SELECT 1 AS connected');
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

export default router;
