import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../components/Home/Header/Header';
import request from "superagent";
import { useState, useEffect } from 'react';
import Filtros from "../components/Home/Contenido/Filtros";
import PerfilCero from "../components/Home/Empresas/Perfiles/PerfilCero";
import { MaysPrimera } from '../components/Inicialized/GlobalFunctions';
import { nuevoMensaje, tiposAlertas } from '../components/Inicialized/Toast';
import { EvBiVisita } from "../components/Inicialized/Bitacora";
import Cargando from '../components/Inicialized/Cargando';
import { getEmpresa } from '@/components/Inicialized/data/helpersGetDB';
import useDataStore from '@/components/Stores/useDataStore'; // ✅ agregado
import { useRouter } from 'next/router'; // ✅ agregado

const ListaEmpresas = dynamic(() => import('../components/Home/Contenido/ListaEmpresas'), {
  ssr: false,
});

const Index = ({ tipo, saveIdComercio, codigo, empresa, mensaje, env }) => {
  const router = useRouter(); // ✅ agregado
  const initFiltrosDesdeQuery = useDataStore((state) => state.initFiltrosDesdeQuery); // ✅ agregado

  // ✅ Inicializar filtros si estamos en /directorio-empresarial
  useEffect(() => {
    if (router.isReady && router.query.id === 'directorio-empresarial') {
      initFiltrosDesdeQuery(router.query);
    }
  }, [router.isReady]);

  function renderPerfil(tipo) {
    if (tipo == 0 || tipo == -1) {
      const isInactive = (tipo == -1);
      return [
        <PerfilCero key={'keycompPerf-' + codigo} inactivo={isInactive} Perfilempresa={empresa} />,
        <Head key={'keycompHead-' + codigo}>
          <meta charSet="utf-8" />
          <title>{`Datos de contacto de ${MaysPrimera(empresa.nombre)} - ${MaysPrimera(empresa.nombreMun)} - ${MaysPrimera(empresa.nombreDep)}`}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content={empresa.descripcion} />
          <meta name="keywords" content={empresa.palabras_clave} />
          <link rel="canonical" href={process.env.HOST_NAME_MAKO + empresa.codigo} />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="www.mako.guru" />
          <meta name="audience" content="Everyone" />
          <meta property="og:title" content={`.: Mako.guru :. Directorio empresarial -  ${empresa.nombre}`} />
          <meta property="og:description" content={empresa.descripcion} />
          <meta property="og:url" content={process.env.HOST_NAME_MAKO + empresa.codigo} />
          <meta property="og:image" content={`https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`} />
          <meta property="og:locale" content="es_ES" />
          <meta name="twitter:title" content={`.: Mako.guru :. Directorio empresarial -  ${empresa.nombre}`} />
          <meta name="twitter:description" content={empresa.descripcion} />
          <meta name="twitter:image" content={`https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      ];
    }
  }

  useEffect(() => {
    if (mensaje) {
      nuevoMensaje(tiposAlertas.info, mensaje);
    }
  }, [mensaje]);

  useEffect(() => {
    if (tipo.length !== 0 && (tipo === 0 || tipo === -1)) {
      EvBiVisita(empresa.codigo);
    }
  }, [empresa]);

  return (
    <div key={'keycompPerf-' + codigo} id="contentBody">
      {tipo.length !== 0 ? renderPerfil(tipo) : (
        <Head key={'keycompHead-' + codigo}>
          <title>.: MAKO :. Directorio empresarial</title>
          <link rel="icon" href={require('./favicon.ico')} sizes="any" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="📖✔ Directorio con súper poderes para empresas..." />
          <meta name="keywords" content='directorio telefonico, directorio empresarial, numeros de contacto empresas, colombia, bogota, medellin, sogamoso, duitama, tunja' />
          <link rel="canonical" href={process.env.HOST_NAME_MAKO + 'directorio-empresarial'} />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="www.mako.guru" />
          <meta name="audience" content="Everyone" />
          <meta name="facebook-domain-verification" content="6f5ij55sc8w96zyf4g559gj0ex6ajb" />
          <meta property="og:title" content=".: Mako.guru :. Directorio empresarial - un directorio con superpoderes" />
          <meta property="og:description" content="📖✔ Directorio con súper poderes para empresas..." />
          <meta property="og:url" content={process.env.HOST_NAME_MAKO + 'directorio-empresarial'} />
          <meta property="og:image" content={require('../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
          <meta property="og:locale" content="es_ES" />
          <meta name="twitter:title" content=".: Mako.guru :. Directorio empresarial - un directorio con superpoderes" />
          <meta name="twitter:description" content="📖✔ Directorio con súper poderes para empresas..." />
          <meta name="twitter:image" content={require('../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      )}
      <Header />
      <Filtros />
      <ListaEmpresas />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  let props = { props: {} };
  const codigo = ctx.query.id;

  if (codigo !== 'directorio-empresarial') {
    const responseJson = await getEmpresa(codigo);
    if (responseJson) {
      if (responseJson.length === 0) {
        props.props = { tipo: [], codigo, mensaje: 'La empresa no existe' };
        return props;
      } else {
        const empresa = responseJson[0];
        switch (empresa.tipo) {
          case 0:
          case -1:
            props.props = { tipo: empresa.tipo, codigo, empresa };
            return props;
          case 1:
            const urlEmpresa = `/directorio-empresas/${empresa.nombreMun}-${empresa.nombreDep}/${empresa.nombre.replace(/\s/g, '-')}/${empresa.codigo}`;
            return {
              redirect: {
                destination: encodeURI(urlEmpresa),
                permanent: false,
              },
            };
          default:
            props.props = { tipo: [], codigo };
            return props;
        }
      }
    } else {
      props.props = { tipo: [], codigo, mensaje: 'error al cargar los datos' };
      return props;
    }
  } else {
    props.props = { tipo: [], codigo };
    return props;
  }
}

export default Index;
