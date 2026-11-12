export function notFound(_req, res) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'La ruta solicitada no existe.' } });
}

export function errorHandler(error, _req, res, _next) {
  const status = Number(error.status) || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: status >= 500 ? 'Ocurrió un error interno.' : error.message
    }
  });
}
