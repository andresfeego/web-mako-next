export const EVENT_SCHEMA_VERSION = '1.0.0'

export const EVENT_CATALOG = {
  SEARCH_SUBMITTED: {
    event_name: 'search_submitted',
    event_category: 'navigation',
    default_action: 'Barra busqueda',
    title: 'Búsqueda enviada',
    icon: 'search',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#5bc0de',
  },
  PROFILE_VIEWED: {
    event_name: 'profile_viewed',
    event_category: 'engagement',
    default_action: 'Apertura local',
    title: 'Perfil visitado',
    icon: 'eye',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#5cb85c',
  },
  CTA_CLICKED: {
    event_name: 'cta_clicked',
    event_category: 'engagement',
    default_action: 'UI action',
    title: 'Click en acción',
    icon: 'click',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#f0ad4e',
  },
  LOGIN_STARTED: {
    event_name: 'login_started',
    event_category: 'auth',
    default_action: 'login_start',
    title: 'Login iniciado',
    icon: 'login',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#6f42c1',
  },
  LOGIN_SUCCEEDED: {
    event_name: 'login_succeeded',
    event_category: 'auth',
    default_action: 'login_success',
    title: 'Login exitoso',
    icon: 'auth_ok',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#3cba54',
  },
  LOGIN_FAILED: {
    event_name: 'login_failed',
    event_category: 'auth',
    default_action: 'login_failed',
    title: 'Login fallido',
    icon: 'auth_fail',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#d9534f',
  },
  LOGOUT_SUCCEEDED: {
    event_name: 'logout_succeeded',
    event_category: 'auth',
    default_action: 'logout',
    title: 'Cierre de sesión',
    icon: 'logout',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#95a5a6',
  },
  CLAIM_STARTED: {
    event_name: 'claim_started',
    event_category: 'commerce',
    default_action: 'claim_start',
    title: 'Reclamo iniciado',
    icon: 'claim_start',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#f39c12',
  },
  CLAIM_SUBMITTED: {
    event_name: 'claim_submitted',
    event_category: 'commerce',
    default_action: 'claim_submit',
    title: 'Reclamo enviado',
    icon: 'claim_done',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#2e86de',
  },
  COUPON_CLAIMED: {
    event_name: 'coupon_claimed',
    event_category: 'commerce',
    default_action: 'coupon_claim',
    title: 'Cupón reclamado',
    icon: 'coupon_claim',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#20c997',
  },
  COUPON_REDEEMED: {
    event_name: 'coupon_redeemed',
    event_category: 'commerce',
    default_action: 'coupon_redeem',
    title: 'Cupón redimido',
    icon: 'coupon_redeem',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#17a2b8',
  },
}

export function eventDefinition(key) {
  return EVENT_CATALOG[key]
}

export function resolveEventMeta(eventName) {
  const found = Object.values(EVENT_CATALOG).find((event) => event.event_name === eventName)
  if (found) return found
  return {
    event_name: eventName || 'unknown_event',
    event_category: 'ops',
    default_action: 'unknown_action',
    title: 'Evento no catalogado',
    icon: 'unknown',
    summaryFields: ['event_name', 'event_action', 'event_label'],
    color: '#7f8c8d',
  }
}
