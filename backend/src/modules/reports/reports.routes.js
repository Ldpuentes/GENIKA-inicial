import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => res.json({ items: [], message: 'Módulo de informes listo para implementar.' }));
export default router;
