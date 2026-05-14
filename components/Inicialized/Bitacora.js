import { trackEvent } from '@/components/Inicialized/data/helpersSetDB'
import { EVENT_CATALOG, EVENT_SCHEMA_VERSION } from './EventCatalog'
import { getOrCreateTelemetrySessionId } from './TelemetrySession'

function generateSessionId() {
  if (process.env.DEV_ENV) return 'SuperAdmin'
  return getOrCreateTelemetrySessionId()
}

function getPlatform() {
  if (typeof window === 'undefined') return 'web_desktop'
  return window.innerWidth <= 768 ? 'web_mobile' : 'web_desktop'
}

function parseBrowser() {
  const ua = navigator.userAgent
  let match = ua.match(/(edg|edge|chrome|safari|firefox|opr)\/?\s*(\d+)/i)
  if (!match) return { name: 'unknown', version: '' }
  let name = match[1].toLowerCase()
  if (name === 'opr') name = 'opera'
  if (name === 'edg') name = 'edge'
  return { name, version: match[2] }
}

function detectOS() {
  const platform = navigator.platform
  if (platform.includes('Win')) return 'Windows'
  if (platform.includes('Mac')) return 'macOS'
  if (platform.includes('Linux')) return 'Linux'
  if (platform.includes('iPhone')) return 'iOS'
  if (platform.includes('Android')) return 'Android'
  return 'Unknown'
}

function buildBaseEvent({ eventName, eventCategory, eventAction, eventLabel, properties }) {
  const browser = parseBrowser()
  const isProd = process.env.NODE_ENV === 'production'

  return {
    event_name: eventName,
    event_category: eventCategory,
    event_action: eventAction,
    event_label: eventLabel ?? null,
    event_value: null,
    occurred_at: new Date().toISOString(),
    source_channel: 'web',
    platform: getPlatform(),
    app_version: null,
    web_build: process.env.NEXT_PUBLIC_BUILD_ID || null,
    session_id: generateSessionId(),
    user_id: null,
    is_authenticated: false,
    request_id: `web-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    page_url: window.location?.href || null,
    referrer_url: document.referrer || null,
    screen_name: null,
    device_model: null,
    os_name: detectOS(),
    os_version: null,
    browser_name: browser.name,
    browser_version: browser.version,
    locale: navigator.language || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    country_code: 'COL',
    city: null,
    ip_mode: isProd ? 'hashed' : 'raw',
    ip_value: null,
    user_agent_raw: isProd ? null : navigator.userAgent,
    user_agent_hash: null,
    properties: properties || {},
    schema_version: EVENT_SCHEMA_VERSION,
  }
}

export const EvBiClickButton = (flujo, etiqueta) => {
  const def = EVENT_CATALOG.CTA_CLICKED
  const event = buildBaseEvent({
    eventName: def.event_name,
    eventCategory: def.event_category,
    eventAction: flujo || def.default_action,
    eventLabel: etiqueta,
    properties: { legacy_tipoAccion: 4, legacy_flujo: flujo, legacy_etiqueta: etiqueta },
  })
  trackEvent(event)
}

export const EvBiVisita = (idComercio) => {
  const def = EVENT_CATALOG.PROFILE_VIEWED
  const event = buildBaseEvent({
    eventName: def.event_name,
    eventCategory: def.event_category,
    eventAction: def.default_action,
    eventLabel: idComercio,
    properties: { legacy_tipoAccion: 2, legacy_flujo: def.default_action, legacy_etiqueta: idComercio },
  })
  trackEvent(event)
}

export const EvBiBusqueda = (flujo, busqueda) => {
  const def = EVENT_CATALOG.SEARCH_SUBMITTED
  const event = buildBaseEvent({
    eventName: def.event_name,
    eventCategory: def.event_category,
    eventAction: flujo || def.default_action,
    eventLabel: busqueda,
    properties: { legacy_tipoAccion: 1, legacy_flujo: flujo, legacy_etiqueta: busqueda },
  })
  trackEvent(event)
}

export const EvBiLoginStarted = (provider = 'mako_form') => {
  const def = EVENT_CATALOG.LOGIN_STARTED
  const event = buildBaseEvent({
    eventName: def.event_name,
    eventCategory: def.event_category,
    eventAction: provider || def.default_action,
    eventLabel: null,
    properties: { auth_provider: provider },
  })
  trackEvent(event)
}

export const EvBiLoginSucceeded = (provider = 'mako_form', userId = null) => {
  const def = EVENT_CATALOG.LOGIN_SUCCEEDED
  const event = buildBaseEvent({
    eventName: def.event_name,
    eventCategory: def.event_category,
    eventAction: provider || def.default_action,
    eventLabel: null,
    properties: { auth_provider: provider },
  })
  event.user_id = Number.isFinite(Number(userId)) ? Number(userId) : null
  event.is_authenticated = true
  trackEvent(event)
}

export const EvBiLoginFailed = (provider = 'mako_form', reason = 'unknown') => {
  const def = EVENT_CATALOG.LOGIN_FAILED
  const event = buildBaseEvent({
    eventName: def.event_name,
    eventCategory: def.event_category,
    eventAction: provider || def.default_action,
    eventLabel: String(reason || 'unknown').slice(0, 120),
    properties: { auth_provider: provider, auth_error: reason || 'unknown' },
  })
  trackEvent(event)
}

export const EvBiLogoutSucceeded = (provider = 'app', userId = null) => {
  const def = EVENT_CATALOG.LOGOUT_SUCCEEDED
  const event = buildBaseEvent({
    eventName: def.event_name,
    eventCategory: def.event_category,
    eventAction: provider || def.default_action,
    eventLabel: null,
    properties: { auth_provider: provider },
  })
  event.user_id = Number.isFinite(Number(userId)) ? Number(userId) : null
  event.is_authenticated = false
  trackEvent(event)
}
