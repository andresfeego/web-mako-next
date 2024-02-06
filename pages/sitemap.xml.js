async function getEmpresas() {

  const response = await fetch(process.env.HOST_NAME + '/empresas',
    {
      method: 'POST',
      headers: {
        // Check what headers the API needs. A couple of usuals right below
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Validation data coming from a form usually
        ciudad: '',
        busServicios: '',
        busCategoria: 0
      })
    })



  if (response.ok) {
    return await response.json()
  } else {
    return null
  }

}


function generateSitemap(empresas) {
  const pages = [
    { url: '/directorio-empresarial', changefreq: 'monthly', priority: 0.7 },
  ];

  empresas.map(empresa => {

    pages.push(
      {
        url: `https://www.mako.guru/${empresa.codigo}`,
        changefreq: 'monthly',
        priority: 0.7
      }
      )


  });



  return pages;
}

function Page(props) {
  return <p>hello world</p>
}

export default Page

function buildSitemapXml(fields) {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(
        ([key, value]) => {
          if (!value) return '';
          return `<${key}>${value}</${key}>`;
        },
      );

      return `<url>${field.join('')}</url>\n`;
    })
    .join('');

  return withXMLTemplate(content);
};

function withXMLTemplate(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`;
};


export async function getServerSideProps({ res }) {

  const response = await getEmpresas();

  const pages = generateSitemap(response);
  const sitemapContent = buildSitemapXml(pages);

  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapContent);

  res.end();

  // Empty since we don't render anything
  return {
    props: {},
  };
}






