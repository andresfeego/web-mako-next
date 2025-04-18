export async function getDB(endpoint, options = {}) {
  const url = process.env.HOST_NAME + endpoint;
  const method = options.method || 'POST';

  const config = {
    method,
    credentials: 'include', // 🔥 necesario para que el navegador envíe/reciba cookies
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
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

    // ⚠️ Error HTTP (por ejemplo 500, 404, etc.)
    if (!res.ok) {
      const errText = await res.text();
      const msg = `[getDB] ❗ HTTP ${res.status} ${res.statusText} → ${url}\nRespuesta RAW:\n${errText}`;
      console.error(msg);
      throw new Error(msg);
    }

    // ⚠️ Respuesta no es JSON
    if (!contentType || !contentType.includes('application/json')) {
      const raw = await res.text();
      const msg = `[getDB] ⚠️ Respuesta no-JSON en ${url}\nContenido crudo:\n${raw}`;
      console.warn(msg);
      throw new Error(msg);
    }

    // ✅ Todo OK
    return await res.json();

  } catch (err) {
    const msg = `[getDB] 🧨 Error general al hacer fetch a ${url} → ${err.message || err}`;
    console.error(msg);
    throw new Error(msg);
  }
}
