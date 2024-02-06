import Head from 'next/head'
import Header from '../components/Home/Header/Header';
import ListaEmpresas from "../components/Home/Contenido/ListaEmpresas";
import request from "superagent";
import { useState, useEffect } from 'react';
import Filtros from "../components/Home/Contenido/Filtros";
import PerfilCero from "../components/Home/PerfilCero";
import { useDataContext, useSetDataContext } from '../components/Inicialized/DataProvider'
import { MaysPrimera } from '../components/Inicialized/GlobalFunctions'
import { nuevoMensaje, tiposAlertas } from '../components/Inicialized/Toast';


async function getEmpresas(busqueda, ciudad, categoria) {

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
                ciudad: ciudad,
                busServicios: busqueda,
                busCategoria: categoria
            })
        })



    if (response.ok) {
        return await response.json()
    } else {
        return null
    }



}



const Index = ({ slides, empresas, municipios, tipo, saveIdComercio, codigo, empresa, mensaje }) => {

    function renderPerfil(tipo) {
        
        if (tipo[0].tipo == 0 || tipo[0].tipo == -1) {
            
            const isInactive = (tipo == -1)
            return [
                <PerfilCero inactivo={isInactive} Perfilempresa={empresa} />,
                <Head>
                    <title>{`${MaysPrimera(empresa.nombre)} - ${MaysPrimera(empresa.nombreMun)} - ${MaysPrimera(empresa.nombreDep)}`}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
            ]
        }

        
    }

    if(mensaje){
        nuevoMensaje(tiposAlertas.info, mensaje)

    }

    return (
        <div id="contentBody">
            {tipo.length != 0 ? 
                renderPerfil(tipo)
            : 
                <Head>
                    <title>.: MAKO :. Directorio empresarial</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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

    const empresas = await getEmpresas("", "", 0)
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
            props.props = {...props.props, mensaje: 'La empresa no existe'}
         return props
        }else{
         return props
        }
    }else{
        const empresa = props.props.empresas.find( ({ codigo }) => codigo === props.props.codigo );
        switch (tipoJson[0].tipo) {
            case 0:
            case -1:
            props.props = { ...props.props, empresa: empresa}
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
