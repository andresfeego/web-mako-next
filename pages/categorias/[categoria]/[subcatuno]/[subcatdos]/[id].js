import Head from 'next/head';
import Header from '../../../../../components/Home/Header/Header';
import ListaEmpresas from "../../../../../components/Home/Contenido/ListaEmpresas";
import { useEffect } from 'react';
import Filtros from "../../../../../components/Home/Contenido/Filtros";
import { MaysPrimera } from '../../../../../components/Inicialized/GlobalFunctions';
import { nuevoMensaje, tiposAlertas } from '../../../../../components/Inicialized/Toast';
import useDataStore from '@/components/Stores/useDataStore';

const Index = ({ slides, empresas, municipios, tipo, categoria, subcatuno, subcatdos, idCat, empresa, mensaje, categoriaCompleta }) => {
  const categoriaStore = useDataStore((state) => state.search.categoria);
  const setSearch = useDataStore((state) => state.setSearch);
  const setUx = useDataStore((state) => state.setUx);

  useEffect(() => {
    if (idCat && categoriaStore !== idCat) {
      setSearch({ categoria: idCat, lblCategoria: subcatdos });
      setUx({ renderCategoria: true });
    }
  }, []);

  useEffect(() => {
    if (mensaje) {
      nuevoMensaje(tiposAlertas.info, mensaje);
    }
  }, [mensaje]);

  return (
    <div id="contentBody">
      {idCat != 0 ? (
        <>
          <Head>
            <title>{'Listado de empresas de ' + subcatdos + ' en diferentes cuidades de Colombia'}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content={`.: Mako.guru :. Empresas de ${subcatdos} en Colombia -- 📖✔ Listado de empresas de ${subcatdos} con números de contacto, Whatsapp, correos, direcciones, como llegar, mapa, horarios, medios de pago y teléfonos para Colombia👆`} />
            <meta name="keywords" content={` ${categoriaCompleta.palabras_clave}, directorio telefonico, directorio empresarial, directorio comercial, numeros de contacto empresas, colombia, bogota, medellin, sogamoso, duitama, tunja, ${subcatdos}`} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="www.mako.guru" />
            <meta name="audience" content="Everyone" />
            <meta property="og:title" content={`.: Mako.guru :. Empresas de ${subcatdos} en Colombia`} />
            <meta property="og:description" content={`📖✔ Listado de empresas de ${subcatdos} con números de contacto para Colombia👆`} />
            <meta property="og:image" content={require('../../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
            <meta property="og:locale" content="es_ES" />
            <meta name="twitter:title" content={`.: Mako.guru :. Empresas de ${subcatdos} en Colombia`} />
            <meta name="twitter:description" content={`📖✔ Listado de empresas de ${subcatdos} con números de contacto para Colombia👆`} />
            <meta name="twitter:image" content={require('../../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>
        </>
      ) : (
        <Head>
          <title>.: MAKO :. Directorio empresarial</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
      )}

      <Header slides={slides} municipios={municipios} />
      <h1 className="titleH1">{'Listado de empresas de ' + subcatdos + ' en Colombia'}</h1>
      <Filtros />
      <ListaEmpresas empresas={empresas} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const props = { props: {} };

  const resSlides = await fetch(process.env.HOST_NAME + '/slides');
  const slidesJson = await resSlides.json();
  props.props.slides = slidesJson;
  props.props.empresas = [];

  const response = await fetch(process.env.HOST_NAME + '/listaMunicipios');
  const responseJson = await response.json();
  props.props.municipios = responseJson;

  const idCat = ctx.query.id;
  const categoria = ctx.query.categoria;
  const subcatuno = ctx.query.subcatuno;
  const subcatdos = ctx.query.subcatdos;

  const responseCat = await fetch(process.env.HOST_NAME + '/subcategoria2Xid/' + idCat);
  const responseCatJson = await responseCat.json();

  props.props = {
    ...props.props,
    categoriaCompleta: responseCatJson[0],
    idCat,
    categoria,
    subcatuno,
    subcatdos: subcatdos.replace(/\-/g, ' ')
  };

  return props;
}

export default Index;
