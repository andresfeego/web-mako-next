export async function getDB(endpoint, options = {}) {
  const url = process.env.HOST_NAME + endpoint;
  const method = options.method || 'POST';

  const config = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    }
  };

  if (method !== 'GET' && method !== 'HEAD' && options.body) {
    config.body = JSON.stringify(options.body);
  }
/* 
  console.log('[getDB] ➜ URL:', url);
  console.log('[getDB] ➜ Config:', config);
   */

  try {
    const res = await fetch(url, config);

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('[getDB] ⚠ Respuesta inesperada (no JSON):', url);
      const raw = await res.text();
      console.log('[getDB] Contenido crudo:', raw);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error('[getDB] ❌ Error en fetch:', err.message || err);
    return null;
  }
}
