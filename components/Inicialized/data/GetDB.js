const LOG = process.env.LOG_GETDB == true;

export async function getDB(endpoint, options = {}) {
  const url = process.env.HOST_NAME + endpoint;
  const method = options.method || 'POST';
  const body = options.body || {};

  const config = {
    method,
    //credentials: 'include', // 🔐 Cookies activas
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (method !== 'GET' && method !== 'HEAD' && body) {
    config.body = JSON.stringify(body);
  }

  if (LOG) {
    console.log(`[getDB] 🌐 Fetching: ${method} ${url}`);
    if (config.body) console.log(`[getDB] 📦 Body:`, config.body);
  }

  try {
    const res = await fetch(url, config);
    const contentType = res.headers.get('content-type');
    // ⚠️ Manejo de errores HTTP (401 controlado)
    if (!res.ok) {
      const errText = await res.text();
      const msg = `[getDB] ❗ HTTP ${res.status} ${res.statusText} → ${url}\nRespuesta RAW:\n${errText}`;
  
      if (res.status == 401) {
        if (LOG) console.warn('[getDB] ⚠️ 401 no autorizado (NO se lanza error)');
        return { status: 401, data: null };
      }
  
      if (LOG) console.error(msg);
      throw new Error(msg); // solo se lanza si no es 401
    }
  
    // ⚠️ Respuesta no JSON
    if (!contentType || !contentType.includes('application/json')) {
      const raw = await res.text();
      const msg = `[getDB] ⚠️ Respuesta no-JSON en ${url}\nContenido crudo:\n${raw}`;
      if (LOG) console.warn(msg);
      throw new Error(msg);
    }
  
    // ✅ Todo bien
    return await res.json();
  
  } catch (err) {
    const msg = `[getDB] 🧨 Error general al hacer fetch a ${url} → ${err.message || err}`;
    if (LOG) console.error(msg);
  
    // Lanzar el error solo si no es 401 (por si hubo un fallo inesperado fuera del control anterior)
    if (!err.message.includes('401')) {
      throw new Error(msg);
    }
  
    // Devuelve estructura controlada si llega aquí por error inesperado pero era 401
    return { status: 401, data: null };
  }
  
}
