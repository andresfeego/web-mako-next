import Head from 'next/head'
import Header from '../../../../components/Home/Header/Header';
import ListaEmpresas from "../../../../components/Home/Contenido/ListaEmpresas";
import request from "superagent";
import { useState, useEffect } from 'react';
import Filtros from "../../../../components/Home/Contenido/Filtros";
import PerfilCero from "../../../../components/Home/Empresas/Perfiles/PerfilCero";
import { useDataContext, useSetDataContext } from '../../../../components/Inicialized/DataProvider'
import { MaysPrimera } from '../../../../components/Inicialized/GlobalFunctions'
import { nuevoMensaje, tiposAlertas } from '../../../../components/Inicialized/Toast';



const Index = ({ slides, empresas, municipios, idCiudad, departamento, municipio, empresa, mensaje }) => {

    function renderMunicipio(municipio) {

        if (municipio && !data.ux.renderCiudad) {
            if (municipio && data.search.ciudad != municipio) {
                setData({...data,  search: { ...data.search, ciudad: municipio }, ux: { ...data.ux, renderCiudad: true } })
            }
        }


    }

    if (mensaje) {
        nuevoMensaje(tiposAlertas.info, mensaje)

    }
    const data = useDataContext();
    const setData = useSetDataContext();

    return (
        <div id="contentBody">

            {idCiudad != 0 ?
                [
                    renderMunicipio(municipio),
                    <Head>
                        <title>{'.: Mako.guru :.📖✔ Listado de empresas en  ' + MaysPrimera(municipio) + ' - ' + MaysPrimera(departamento)}</title>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <meta name="description" content={'.: Mako.guru :. Empresas en la cuidad de  ' + MaysPrimera(municipio) + ' - ' + MaysPrimera(departamento) + ' en Colombia --' + '📖✔ Listado de empresas de ' + municipio + '  con números de contacto, Whatsapp, correos, direcciones, como llegar, mapa, horarios, medios de pago y teléfonos para Colombia👆'} />
                        <meta name="keywords" content={'directorio telefonico, directorio empresarial, directorio comercial, numeros de contacto empresas, colombia, bogota, medellin, sogamoso, duitama, tunja'} />
                        <meta name="robots" content="index, follow" />
                        <meta name="author" content="www.mako.guru" />
                        <meta name="audience" content="Everyone" />

                        <meta property="og:title" content={'.: MAKO :. Directorio empresarial - Ciudades - ' + departamento + ' - ' + municipio} />
                        <meta property="og:description" content={'📖✔ Listado de empresas de ' + MaysPrimera(municipio) + ' - ' + MaysPrimera(departamento) + '  con números de contacto para Colombia👆'} />
                        <meta property="og:image" content={require('../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
                        <meta property="og:locale" content="es_ES" />

                        <meta name="twitter:title" content={'.: MAKO :. Directorio empresarial - Ciudades - ' + departamento + ' - ' + municipio} />
                        <meta name="twitter:description" content={'📖✔ Listado de empresas de ' + MaysPrimera(municipio) + ' - ' + MaysPrimera(departamento) + '  con números de contacto para Colombia👆'} />
                        <meta name="twitter:image" content={require('../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
                        <meta name="twitter:card" content="summary_large_image" />
                    </Head>

                ]
                :

                <Head>
                    <title>.: MAKO :. Directorio empresarial</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
            }


            <Header slides={slides} municipios={municipios} />
            <h1 className="titleH1" >
                {'.: Mako.guru :.📖✔ Listado de empresas en  ' + MaysPrimera(municipio) + ' - ' + MaysPrimera(departamento)}
            </h1>
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

    props.props = { ...props.props, empresas: [] }

    const response = await fetch(process.env.HOST_NAME + '/listaMunicipios')
    const responseJson = await response.json()
    props.props = { ...props.props, municipios: responseJson }


    const idCiudad = ctx.query.id;
    const departamento = ctx.query.departamento;
    const municipio = ctx.query.municipio;

    props.props = { ...props.props, idCiudad: idCiudad, departamento: departamento, municipio: municipio.replace(/\-/g, ' ') }

    return props
}

export default Index;
