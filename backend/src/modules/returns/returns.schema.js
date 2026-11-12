import { z } from 'zod';

export const createReturnSchema = z.object({
  reference: z.string().trim().min(2).max(30),
  customer: z.string().trim().min(2).max(120),
  material: z.string().trim().min(2).max(80),
  quantityKg: z.number().positive().max(1000000),
  reason: z.string().trim().min(3).max(500),
  condition: z.enum(['Bueno', 'Requiere revisión', 'Deteriorado']).default('Requiere revisión')
});
