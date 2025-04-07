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
    //HOST_NAME: 'http://localhost:3020/api/responseMako',
    HOST_NAME: 'https://feegosystem.com:8443/api/responseMako',
    HOST_NAME_MAKO: 'https://www.mako.guru/',
    DEV_ENV: false,
    NEXT_PUBLIC_ID_ANALYTICS: "G-5JYYZXZD6J"
  },
  quiet: true
});
