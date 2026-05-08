function Page() {
  return null;
}

export default Page;

export async function getServerSideProps({ res }) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const content = `User-agent: *
Disallow: /admin/
Disallow: /solara/
Disallow: /usuario/
Disallow: /login/
Disallow: /registro/
Disallow: /favoritos/
Disallow: /contactar/
Disallow: /mis-empresas/

Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();

  return { props: {} };
}
