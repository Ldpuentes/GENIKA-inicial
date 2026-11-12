import { Router } from 'express';
import { getPool } from '../../config/database.js';

const router = Router();
router.get('/summary', async (_req, res, next) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT
        (SELECT COUNT_BIG(*) FROM dbo.Returns WHERE Status NOT IN ('Cerrada', 'Cancelada')) AS openReturns,
        (SELECT COUNT_BIG(*) FROM dbo.Returns WHERE CAST(ReceivedAt AS date) = CAST(SYSUTCDATETIME() AS date)) AS returnsToday,
        (SELECT COUNT_BIG(*) FROM dbo.Returns WHERE Status = 'En revisión') AS underReview,
        (SELECT COUNT_BIG(*) FROM dbo.Returns WHERE Status = 'Pendiente de reclasificación') AS awaitingClassification
    `);
    res.json(result.recordset[0]);
  } catch (error) {
    if (error.code === 'EREQUEST' && error.message.includes('Invalid object name')) {
      return res.json({ openReturns: 0, returnsToday: 0, underReview: 0, awaitingClassification: 0 });
    }
    next(error);
  }
});

export default router;
