export async function setDB(endpoint, data = {}, options = {}) {
  const url = process.env.HOST_NAME + endpoint;

  const isFormData = data instanceof FormData;
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      //credentials: 'include', 
      headers: isFormData
        ? { 'Accept': 'application/json', ...options.headers }
        : { 'Accept': 'application/json', 'Content-Type': 'application/json', ...options.headers },
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!res.ok) {
      console.error(`[setDB] Error en ${endpoint}:`, res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`[setDB] Fallo en fetch: ${url}`, error);
    return null;
  }
}
