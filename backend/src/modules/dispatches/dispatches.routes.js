import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => res.json({ items: [], message: 'Módulo de despachos listo para implementar.' }));
export default router;
