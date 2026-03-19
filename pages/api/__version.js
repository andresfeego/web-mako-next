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

  // Runtime: end-to-end check (front -> backend -> DB)
  // We resolve via current host to avoid env/base URL mismatches.
  let runtime = null
  try {
    const host = req.headers.host
    if (host) {
      const url = `https://${host}/api/responseMako/__runtime`
      const r = await fetch(url, { cache: 'no-store' })
      if (r.ok) runtime = await r.json()
      else runtime = { ok: false, error: 'runtime_http_' + r.status }
    }
  } catch (e) {
    runtime = { ok: false, error: 'runtime_fetch_failed' }
  }

  res.status(200).json({ ...base, runtime })
}
