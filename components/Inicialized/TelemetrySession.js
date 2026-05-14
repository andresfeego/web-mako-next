const STORAGE_KEY = 'mako_telemetry_session_v1';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function generateUuidV4() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, (char) => {
    const rand = Math.floor(Math.random() * 16);
    const value = char === 'x' ? rand : ((rand & 0x3) | 0x8);
    return value.toString(16);
  });
}

function nowMs() {
  return Date.now();
}

function parseStoredSession(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.id || !parsed?.lastSeenAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistSession(session) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function rotateTelemetrySessionId() {
  const sessionId = `sess_${generateUuidV4()}`;
  const session = { id: sessionId, lastSeenAt: nowMs() };
  persistSession(session);
  return sessionId;
}

export function getOrCreateTelemetrySessionId() {
  if (typeof window === 'undefined') return `sess_${generateUuidV4()}`;

  const stored = parseStoredSession(window.localStorage.getItem(STORAGE_KEY));
  const currentTime = nowMs();

  if (!stored) {
    return rotateTelemetrySessionId();
  }

  const isExpired = currentTime - Number(stored.lastSeenAt) > SESSION_TTL_MS;
  if (isExpired) {
    return rotateTelemetrySessionId();
  }

  stored.lastSeenAt = currentTime;
  persistSession(stored);
  return stored.id;
}
