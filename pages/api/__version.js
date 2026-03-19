export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')

  const base = {
    app: process.env.APP_NAME || 'mako-web',
    env: process.env.APP_ENV || null,
    sha: process.env.APP_SHA || null,
    builtAt: process.env.BUILT_AT || null,
    nodeEnv: process.env.NODE_ENV || null,
  }

  // Runtime: validate end-to-end (front -> backend -> DB)
  // We keep this best-effort so /__version never breaks the page.
  let runtime = null
  try {
    const hostBase = process.env.HOST_NAME_MAKO || ''
    if (hostBase) {
      const url = new URL('api/responseMako/__runtime', hostBase)
      const r = await fetch(url.toString(), { cache: 'no-store' })
      if (r.ok) runtime = await r.json()
      else runtime = { ok: false, error: 'runtime_http_' + r.status }
    }
  } catch (e) {
    runtime = { ok: false, error: 'runtime_fetch_failed' }
  }

  res.status(200).json({ ...base, runtime })
}
