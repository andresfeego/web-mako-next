const path = require('path');
const withImages = require('next-images');


const isProd = process.env.NODE_ENV === 'production';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_HOSTNAME = new URL(SITE_URL).hostname;

const HOST_NAME = isProd
  ? (process.env.HOST_NAME_PROD || `${SITE_URL}/api/responseMako`)
  : 'http://127.0.0.1:3020/api/responseMako';
const FILES_BASE_URL = process.env.NEXT_PUBLIC_FILES_BASE_URL || (isProd
  ? `${SITE_URL}/files`
  : 'http://127.0.0.1:3020/files');

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("SITE_URL:", SITE_URL);
console.log("HOST_NAME:", HOST_NAME);
console.log("FILES_BASE_URL:", FILES_BASE_URL);
console.log("VERCEL_ENV:", process.env.VERCEL_ENV || 'local');
console.log("VERCEL_URL:", process.env.VERCEL_URL || 'http://localhost:3000');


module.exports = {
  reactStrictMode: isProd,
  ...withImages(),
  sassOptions: {
    includePaths: [path.join(__dirname, './components/Inicialized')],
    prependData: `@use './variables' as *;`,
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: SITE_URL.startsWith('https') ? 'https' : 'http',
        hostname: SITE_HOSTNAME,
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
  env: {
    HOST_NAME,
    NEXT_PUBLIC_SITE_URL: SITE_URL,
    NEXT_PUBLIC_SITE_HOST: SITE_HOSTNAME,
    NEXT_PUBLIC_FILES_BASE_URL: FILES_BASE_URL,
    HOST_NAME_MAKO: `${SITE_URL}/`,
    NEXT_PUBLIC_ID_ANALYTICS: "G-5JYYZXZD6J",
    DEV_ENV: true,
    LOG_GETDB:true,
    LOG_SETDB:true,
    SCREEN_SIZE_OVERLAY: false,
  }
};
