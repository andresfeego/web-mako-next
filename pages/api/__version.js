export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  const data = {
    app: process.env.APP_NAME || 'mako-web',
    env: process.env.APP_ENV || null,
    sha: process.env.APP_SHA || null,
    builtAt: process.env.BUILT_AT || null,
    nodeEnv: process.env.NODE_ENV || null,
  };

  res.status(200).json(data);
}
