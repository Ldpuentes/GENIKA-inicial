import { createReturnSchema } from './returns.schema.js';
import * as service from './returns.service.js';

export async function getReturns(req, res, next) {
  try {
    res.json(await service.listReturns(req.query));
  } catch (error) {
    next(error);
  }
}

export async function postReturn(req, res, next) {
  try {
    const parsed = createReturnSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0].message } });
    }
    res.status(201).json(await service.registerReturn(parsed.data));
  } catch (error) {
    if (error.number === 2627 || error.number === 2601) {
      return res.status(409).json({ error: { code: 'DUPLICATE_REFERENCE', message: 'Ya existe una devolución con esa referencia.' } });
    }
    next(error);
  }
}
