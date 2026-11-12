import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => res.json({ items: [], message: 'Módulo de inventario listo para implementar.' }));
export default router;
