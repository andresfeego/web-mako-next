const path = require('path');
const withImages = require('next-images');

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  reloadOnOnLine: true,
  swcMinify: true,
  disable: false,
  workboxOption: {
    disableDevLogs: true,
  }
});

const isProd = process.env.NODE_ENV === 'production';

const HOST_NAME = isProd
  ? 'https://feegosystem.com:8443/api/responseMako'
  : 'http://localhost:3020/api/responseMako';

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("HOST_NAME:", HOST_NAME);
console.log("VERCEL_ENV:", process.env.VERCEL_ENV || 'local');
console.log("VERCEL_URL:", process.env.VERCEL_URL || 'http://localhost:3000');

module.exports = withPWA({
  reactStrictMode: isProd, // ✅ Solo activado en producción
  ...withImages(),
  sassOptions: {
    includePaths: [path.join(__dirname, './components/Inicialized')],
    prependData: `@import "variables.scss";`,
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.feegosystem.com',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/directorio-empresarial',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ];
  },
  future: {
    webpack5: true,
  },
  env: {
    HOST_NAME, // usa la constante que ya es dinámica
    HOST_NAME_MAKO: 'https://www.mako.guru/',
    NEXT_PUBLIC_ID_ANALYTICS: "G-5JYYZXZD6J"
  },
  quiet: true
});