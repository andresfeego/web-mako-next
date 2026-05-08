import Head from 'next/head';
import Header from '../../../../components/Home/Header/Header';
import ListaEmpresas from "../../../../components/Home/Contenido/ListaEmpresas";
import { useEffect } from 'react';
import Filtros from "../../../../components/Home/Contenido/Filtros";
import PerfilCero from "../../../../components/Home/Empresas/Perfiles/PerfilCero";
import { MaysPrimera } from '../../../../components/Inicialized/GlobalFunctions';
import { nuevoMensaje, tiposAlertas } from '../../../../components/Inicialized/Toast';
import useDataStore from '@/components/Stores/useDataStore';
import { getSlides, getListaMunicipios } from '@/components/Inicialized/data/helpersGetDB';
import { useRouter } from 'next/router'; // ✅ agregado

const Index = ({ slides, empresas, municipios, idCiudad, departamento, municipio, empresa, mensaje }) => {
  const router = useRouter(); // ✅ agregado
  const ciudadStore = useDataStore((state) => state.search.ciudad);
  const setSearch = useDataStore((state) => state.setSearch);
  const setUx = useDataStore((state) => state.setUx);
  const initFiltrosDesdeQuery = useDataStore((state) => state.initFiltrosDesdeQuery); // ✅ agregado

  useEffect(() => {
    if (router.isReady) {
      initFiltrosDesdeQuery(router.query);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (municipio && ciudadStore !== municipio) {
      setSearch({ ciudad: municipio });
      setUx({ renderCiudad: true });
    }
  }, []);

  useEffect(() => {
    if (mensaje) {
      nuevoMensaje(tiposAlertas.info, mensaje);
    }
  }, [mensaje]);

  return (
    <div id="contentBody">
      {idCiudad != 0 ? (
        <>
          <Head>
            <title>{'.: Mako.guru :.📖✔ Listado de empresas en ' + MaysPrimera(municipio) + ' - ' + MaysPrimera(departamento)}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content={`.: Mako.guru :. Empresas en la ciudad de ${MaysPrimera(municipio)} - ${MaysPrimera(departamento)} en Colombia -- 📖✔ Listado de empresas con números de contacto, Whatsapp, correos, direcciones, mapa, horarios y medios de pago.`} />
            <meta name="keywords" content={`directorio telefonico, directorio empresarial, numeros de contacto empresas, colombia, ${municipio}`} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content={process.env.NEXT_PUBLIC_SITE_HOST || 'localhost'} />
            <meta name="audience" content="Everyone" />
            <meta property="og:title" content={`.: MAKO :. Directorio empresarial - Ciudades - ${departamento} - ${municipio}`} />
            <meta property="og:description" content={`📖✔ Listado de empresas de ${MaysPrimera(municipio)} - ${MaysPrimera(departamento)} con números de contacto para Colombia👆`} />
            <meta property="og:image" content={require('../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
            <meta property="og:locale" content="es_ES" />
            <meta name="twitter:title" content={`.: MAKO :. Directorio empresarial - Ciudades - ${departamento} - ${municipio}`} />
            <meta name="twitter:description" content={`📖✔ Listado de empresas de ${MaysPrimera(municipio)} - ${MaysPrimera(departamento)} con números de contacto para Colombia👆`} />
            <meta name="twitter:image" content={require('../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
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
      <h1 className="titleH1">
        {'.: Mako.guru :.📖✔ Listado de empresas en ' + MaysPrimera(municipio) + ' - ' + MaysPrimera(departamento)}
      </h1>
      <Filtros />
      <ListaEmpresas empresas={empresas} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const props = { props: {} };

  const resSlides = await getSlides();
  const slidesJson = await resSlides;
  props.props.slides = slidesJson;

  props.props.empresas = [];

  const response = await getListaMunicipios();
  const responseJson = await response;
  props.props.municipios = responseJson;

  const idCiudad = ctx.query.id;
  const departamento = ctx.query.departamento;
  const municipio = ctx.query.municipio;

  props.props = {
    ...props.props,
    idCiudad,
    departamento,
    municipio: municipio.replace(/\-/g, ' ')
  };

  return props;
}

export default Index;
