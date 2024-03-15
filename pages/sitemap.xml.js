import { getEmpresas } from "../components/Inicialized/GetDB/GetDB"

async function getCategorias() {

  const response = await fetch(process.env.HOST_NAME + '/categoriasConEmpresas')



  if (response.ok) {
    return await response.json()
  } else {

    return null
  }

}


async function getCiudades() {

  const response = await fetch(process.env.HOST_NAME + '/ciudadesConEmpresas')



  if (response.ok) {
    return await response.json()
  } else {

    return null
  }

}

async function getCiuycat() {

  const response = await fetch(process.env.HOST_NAME + '/ciuycatConEmpresas')



  if (response.ok) {
    return await response.json()
  } else {

    return null
  }

}

function normalizarUrl(texto) {

  texto= texto.toLowerCase().replace(/\s/g, '-')
  texto= texto.toLowerCase().replace(/\,/g, '')
  texto= texto.toLowerCase().replace(/\./g, '')

  if (texto.charAt(texto.length - 1) == '-') {
    texto = texto.slice(0, -1)
  }

    console.log(texto)
  return((texto));
  
}



function generateSitemap(empresas, categoriasConEmpresas, ciudadesConEmpresas, ciuycatConEmpresas) {
  const pages = [
    { loc: 'https://www.mako.guru/directorio-empresarial', 
    changefreq: 'daily', 
    priority: 0.7 },
  ];

  empresas.map(empresa => {

    pages.push(
      {
        loc: `https://www.mako.guru/${empresa.codigo}`,
        changefreq: 'weekly',
      }
      )


  });



  
    categoriasConEmpresas.map(categoriasConEmpresas => {
  
      pages.push(
        {
          loc: `https://www.mako.guru/categorias/${normalizarUrl(categoriasConEmpresas.nombre)}/${normalizarUrl(categoriasConEmpresas.nombreSub1)}/${normalizarUrl(categoriasConEmpresas.nombreSub2)}/${categoriasConEmpresas.id}`,
          changefreq: 'weekly',
        }
        )
  
  
    });


    ciudadesConEmpresas.map(ciudadesConEmpresas => {
  
      pages.push(
        {
          loc: `https://www.mako.guru/ciudades/${normalizarUrl(ciudadesConEmpresas.nombreDep)}/${normalizarUrl(ciudadesConEmpresas.nombre)}/${ciudadesConEmpresas.id}`,
          changefreq: 'weekly',
        }
        )
  
  
    });
    
    ciuycatConEmpresas.map(ciuycatConEmpresas => {
      pages.push(
        {
          loc: `https://www.mako.guru/categoria-por-ciudad/${normalizarUrl(ciuycatConEmpresas.nombreSub1)}/${normalizarUrl(ciuycatConEmpresas.nombreSub2)}/${normalizarUrl(ciuycatConEmpresas.nombre)}/${ciuycatConEmpresas.id}`,
          changefreq: 'weekly',
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

  const empresas = await getEmpresas('','',0);
  const categorias = await getCategorias();
  const ciudades = await getCiudades();
  const ciuycat = await getCiuycat();
  


  const pages = generateSitemap(empresas, categorias, ciudades, ciuycat);
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






