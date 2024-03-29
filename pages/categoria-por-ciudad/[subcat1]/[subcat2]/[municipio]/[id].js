import Head from 'next/head'
import Header from '../../../../../components/Home/Header/Header';
import ListaEmpresas from "../../../../../components/Home/Contenido/ListaEmpresas";
import request from "superagent";
import { useState, useEffect } from 'react';
import Filtros from "../../../../../components/Home/Contenido/Filtros";
import PerfilCero from "../../../../../components/Home/Empresas/Perfiles/PerfilCero";
import { useDataContext, useSetDataContext } from '../../../../../components/Inicialized/DataProvider'
import { MaysPrimera } from '../../../../../components/Inicialized/GlobalFunctions'
import { nuevoMensaje, tiposAlertas } from '../../../../../components/Inicialized/Toast';

const Index = ({ slides, empresas, municipios, idCat, subcatdos, municipio, categoriaCompleta}) => {

    const data = useDataContext();
    const setData = useSetDataContext();

    useEffect(() =>{
        if (municipio && !data.ux.renderCiudad) {
            if (municipio && data.search.ciudad != municipio) {
                setData({...data, search: { ...data.search, ciudad: MaysPrimera(municipio), categoria: idCat, lblCategoria: MaysPrimera(subcatdos) }, ux: { ...data.ux, renderCiudad: true } })
            }
        }
    }, []);


    return (
        <div id="contentBody">

            {idCat != 0 ?

                <Head>
                    <title>{'✔ Listado de empresas de ' + subcatdos + ' en ' + MaysPrimera(municipio) + ' para 【2024】'}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content={'.: Mako.guru :. Directorio comercial 📖✔ Encuentra aqui un Listado de empresas de ' + subcatdos + ' en ' + MaysPrimera(municipio) + ' Colombia con números de contacto, Whatsapp, correos, direcciones, como llegar, mapa, horarios, medios de pago y teléfonos.'} />
                    <meta name="keywords" content={` ${categoriaCompleta.palabras_clave}, directorio telefonico, directorio empresarial, directorio comercial, numeros de contacto empresas, colombia, ${MaysPrimera(municipio)}`} />
                    <meta name="robots" content="index, follow" />
                    <meta name="author" content="www.mako.guru" />
                    <meta name="audience" content="Everyone" />

                    <meta property="og:title" content={'.: Mako.guru :.📖✔ Listado de empresas de ' + subcatdos + ' en ' + MaysPrimera(municipio)} />
                    <meta property="og:description" content={'.: Mako.guru :.📖✔ Listado de empresas de ' + subcatdos + ' en ' + MaysPrimera(municipio) + '  con números de contacto para Colombia👆'} />
                    <meta property="og:image" content={require('../../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
                    <meta property="og:locale" content="es_ES" />

                    <meta name="twitter:title" content={'.: Mako.guru :.📖✔ Listado de empresas de ' + subcatdos + ' en ' + MaysPrimera(municipio)} />
                    <meta name="twitter:description" content={'.: Mako.guru :.📖✔ Listado de empresas de ' + subcatdos + ' en ' + MaysPrimera(municipio) + ' con números de contacto para Colombia👆'} />
                    <meta name="twitter:image" content={require('../../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.webp')} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>

                :

                <Head>
                    <title>.: MAKO :. Directorio empresarial</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
            }


            <Header slides={slides} municipios={municipios} />
            <h1 className="titleH1" >
                {'Listado de empresas de ' + subcatdos + ' en ' + MaysPrimera(municipio) + '.: Mako.guru :.📖✔ Directorio comercial'}
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


    const idCat = ctx.query.id;
    const subcatdos = ctx.query.subcat2;
    const municipio = ctx.query.municipio;

    const responseCat = await fetch(process.env.HOST_NAME + '/subcategoria2Xid/' + idCat)
    const responseCatJson = await responseCat.json()
    
    props.props = { ...props.props, categoriaCompleta: responseCatJson[0] }

    props.props = { ...props.props, idCat: idCat, subcatdos: subcatdos.replace(/\-/g, ' '), municipio: municipio.replace(/\-/g, ' ') }

    return props
}

export default Index;
