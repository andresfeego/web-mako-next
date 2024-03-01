import Head from 'next/head'
import Header from '../components/Home/Header/Header';
import ListaEmpresas from "../components/Home/Contenido/ListaEmpresas";
import request from "superagent";
import { useState, useEffect } from 'react';
import Filtros from "../components/Home/Contenido/Filtros";
import PerfilCero from "../components/Home/Empresas/Perfiles/PerfilCero";
import { useDataContext, useSetDataContext } from '../components/Inicialized/DataProvider'
import { MaysPrimera } from '../components/Inicialized/GlobalFunctions'
import { nuevoMensaje, tiposAlertas } from '../components/Inicialized/Toast';
import { EvBiVisita } from "../components/Inicialized/Bitacora";
import { getEmpresas } from '../components/Inicialized/GetDB/GetDB';

const Index = ({ slides, empresas, municipios, tipo, saveIdComercio, codigo, empresa, mensaje, env }) => {

    function renderPerfil(tipo) {

        if (tipo[0].tipo == 0 || tipo[0].tipo == -1) {

            const isInactive = (tipo == -1)
            return [
                <PerfilCero inactivo={isInactive} Perfilempresa={empresa} />,
                <Head>
                    <meta charset="utf-8" />
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
                    <meta property="og:image" content={'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo} />
                    <meta property="og:locale" content="es_ES" />

                    <meta name="twitter:title" content={`.: Mako.guru :. Directorio empresarial -  ${empresa.nombre}`} />
                    <meta name="twitter:description" content={empresa.descripcion} />
                    <meta name="twitter:image" content={'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
            ]
        }


    }

    if (mensaje) {
        nuevoMensaje(tiposAlertas.info, mensaje)

    }

    /*  useEffect(() => {
         if (tipo.length != 0) {
             EvBiVisita(empresa.codigo)
         }
     }, []) */

    return (
        <div id="contentBody">
            {tipo.length != 0 ?
                renderPerfil(tipo)
                :
                <Head>
                    <title>.: MAKO :. Directorio empresarial</title>
                    <link rel="icon" href={require('./favicon.ico')} sizes="any" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                    <meta name="keywords" content='directorio telefonico, directorio empresarial, numeros de contacto empresas, colombia, bogota, medellin, sogamoso, duitama, tunja' />
                    <link rel="canonical" href={process.env.HOST_NAME_MAKO + 'directorio-empresarial'} />
                    <meta name="robots" content="index, follow" />
                    <meta name="author" content="www.mako.guru" />
                    <meta name="audience" content="Everyone" />

                    <meta property="og:title" content={`.: Mako.guru :. Directorio empresarial - un directorio con superpoderes`} />
                    <meta property="og:description" content='📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆' />
                    <meta property="og:url" content={process.env.HOST_NAME_MAKO + 'directorio-empresarial'} />
                    <meta property="og:image" content={require('../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
                    <meta property="og:locale" content="es_ES" />

                    <meta name="twitter:title" content={`.: Mako.guru :. Directorio empresarial - un directorio con superpoderes`} />
                    <meta name="twitter:description" content='📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆' />
                    <meta name="twitter:image" content={require('../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
            }


            <Header slides={slides} municipios={municipios} />
            <Filtros />
            <ListaEmpresas empresas={empresas} />
        </div>
    )
}

export async function getServerSideProps(ctx) {

    var props = { props: {} }

    const resSlides = await fetch(process.env.HOST_NAME + '/slides')
    const slidesJson = await resSlides.json()
    props.props = { slides: slidesJson }

    const empresas = await getEmpresas('', '', 0, null)
    props.props = { ...props.props, empresas: empresas }

    const response = await fetch(process.env.HOST_NAME + '/listaMunicipios')
    const responseJson = await response.json()
    props.props = { ...props.props, municipios: responseJson }

    const codigo = ctx.query.id;
    const resTipo = await fetch(process.env.HOST_NAME + '/tipoEmpresa/' + codigo)
    const tipoJson = await resTipo.json()

    props.props = { ...props.props, tipo: tipoJson, codigo: codigo }

    if (tipoJson.length == 0) {
        if (codigo != 'directorio-empresarial') {
            props.props = { ...props.props, mensaje: 'La empresa no existe' }
            return props
        } else {
            return props
        }
    } else {
        const empresa = props.props.empresas.find(({ codigo }) => codigo === props.props.codigo);
        switch (tipoJson[0].tipo) {
            case 0:
            case -1:
                props.props = { ...props.props, empresa: empresa }
                break;
            case 1:
                const urlEmpresa = `/directorio-empresas/${empresa.nombreMun}-${empresa.nombreDep}/${empresa.nombre.replace(/\s/g, '-')}/${empresa.codigo}`
                return {
                    redirect: {
                        destination: encodeURI(urlEmpresa),
                        permanent: false,
                    },
                }
                break;

            default:
                break;
        }
        return props
    }
}

export default Index;
