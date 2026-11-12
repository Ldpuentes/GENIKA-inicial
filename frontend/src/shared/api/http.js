const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers }
    });
  } catch {
    throw new Error('No se pudo conectar con la API. Verifica que el servidor esté iniciado.');
  }
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.error?.message || 'La solicitud no pudo completarse.');
  return body;
}
