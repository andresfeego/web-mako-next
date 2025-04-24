const path = require('path');
const withImages = require('next-images');


const isProd = process.env.NODE_ENV === 'production';

const HOST_NAME = isProd
  ? 'https://feegosystem.com/proxyPassthrough.php?path=/api/responseMako'
  : 'http://127.0.0.1:3020/api/responseMako';

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("HOST_NAME:", HOST_NAME);
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
  env: {
    HOST_NAME,
    HOST_NAME_MAKO: 'https://www.mako.guru/',
    NEXT_PUBLIC_ID_ANALYTICS: "G-5JYYZXZD6J",
    DEV_ENV: true
  }
};