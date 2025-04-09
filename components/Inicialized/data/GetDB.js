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

  // Log de inicio de la petición
  console.log(`[getDB] 🌐 Fetching: ${method} ${url}`);
  if (config.body) console.log(`[getDB] 📦 Body:`, config.body);

  try {
    const res = await fetch(url, config);

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      console.error(`[getDB] ❗ Error HTTP: ${res.status} ${res.statusText} -> ${url}`);
      const errText = await res.text();
      console.error(`[getDB] ❗ Respuesta RAW:`, errText);
      return null;
    }

    if (!contentType || !contentType.includes('application/json')) {
      console.warn(`[getDB] ⚠️ Respuesta inesperada (no JSON) en: ${url}`);
      const raw = await res.text();
      console.log('[getDB] 🔍 Contenido crudo:', raw);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`[getDB] ❌ Fallo total al hacer fetch a ${url}`);
    console.error('[getDB] 🧨 Error:', err.message || err);
    return null;
  }
}
