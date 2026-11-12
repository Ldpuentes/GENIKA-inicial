import { getPool, sql } from '../../config/database.js';

export async function findMany({ search = '', status = '', limit = 100 }) {
  const pool = await getPool();
  const request = pool.request()
    .input('search', sql.NVarChar(120), `%${search}%`)
    .input('status', sql.NVarChar(50), status || null)
    .input('limit', sql.Int, limit);
  const result = await request.query(`
    SELECT TOP (@limit) ReturnId AS id, Reference AS reference, Customer AS customer,
      Material AS material, QuantityKg AS quantityKg, Reason AS reason, Condition AS condition,
      Status AS status, ReceivedAt AS receivedAt
    FROM dbo.Returns
    WHERE (@status IS NULL OR Status = @status)
      AND (@search = '%%' OR Reference LIKE @search OR Customer LIKE @search OR Material LIKE @search)
    ORDER BY ReceivedAt DESC
  `);
  return result.recordset;
}

export async function create(data) {
  const pool = await getPool();
  const result = await pool.request()
    .input('reference', sql.NVarChar(30), data.reference)
    .input('customer', sql.NVarChar(120), data.customer)
    .input('material', sql.NVarChar(80), data.material)
    .input('quantityKg', sql.Decimal(12, 2), data.quantityKg)
    .input('reason', sql.NVarChar(500), data.reason)
    .input('condition', sql.NVarChar(40), data.condition)
    .query(`
      INSERT INTO dbo.Returns (Reference, Customer, Material, QuantityKg, Reason, Condition, Status)
      OUTPUT INSERTED.ReturnId AS id, INSERTED.Reference AS reference,
        INSERTED.Customer AS customer, INSERTED.Material AS material,
        INSERTED.QuantityKg AS quantityKg, INSERTED.Reason AS reason,
        INSERTED.Condition AS condition, INSERTED.Status AS status,
        INSERTED.ReceivedAt AS receivedAt
      VALUES (@reference, @customer, @material, @quantityKg, @reason, @condition, 'Recibida')
    `);
  return result.recordset[0];
}
