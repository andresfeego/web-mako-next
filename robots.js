export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
    sitemap: 'https://mako.guru/sitemap.xml',
  }
}