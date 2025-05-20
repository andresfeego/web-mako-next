export async function setDB(endpoint, data = {}, options = {}) {
  const url = process.env.HOST_NAME + endpoint;

  const method = data.method || 'POST';
  const isFormData = data instanceof FormData;
  const body = isFormData ? data : data.body ?? data;

  // DEBUG opcional
  console.log('[setDB] URL:', url);
  console.log('[setDB] METHOD:', method);
  console.log('[setDB] BODY:', body);

  try {
    const res = await fetch(url, {
      method,
      headers: isFormData
        ? { Accept: 'application/json', ...options.headers }
        : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
          },
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`[setDB] HTTP ${res.status}: ${errorBody}`);
    }

    const json = await res.json();

    if (json.ok === false) {
      throw new Error(`[setDB] Respuesta fallida: ${JSON.stringify(json)}`);
    }

    return json;
  } catch (error) {
    console.error(`[setDB] Fallo en fetch: ${url}`, error);
    throw error;
  }
}
