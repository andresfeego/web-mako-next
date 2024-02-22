
import { useRouter } from "next/router"
import Head from 'next/head'
import { MaysPrimera } from '../../../../components/Inicialized/GlobalFunctions'
import EmpresaTipoUno from "../../../../components/Home/Empresas/EmpresaTipoUno";
import EmpresaTipoCero from "../../../../components/Home/Empresas/EmpresaTipoCero";
import { useEffect } from 'react'
import { useDataContext, useSetDataContext, useSetUserContext, useUserContext } from "../../../../components/Inicialized/DataProvider";
import { search } from "superagent";
import { EvBiVisita } from "../../../../components/Inicialized/Bitacora";
import PerfilCero from "../../../../components/Home/Empresas/Perfiles/PerfilCero";
import PerfilUno from "../../../../components/Home/Empresas/Perfiles/PerfilUno/PerfilUno";

const Empresa = ({ empresa, municipios, empresas, slides }) => {

     return (
        <PerfilUno perfilEmpresa={empresa} municipios={municipios} empresas={empresas} slides={slides}/>
    )
}


export async function getServerSideProps(ctx) {
    var props = { props: {} }


    const resEmpresa = await fetch(process.env.HOST_NAME + '/empresas/' + ctx.query.id)
    const empresaJson = await resEmpresa.json()
    props.props = { empresa: empresaJson[0] }




    const response = await fetch(process.env.HOST_NAME + '/listaMunicipios')
    const responseJson = await response.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson }

    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: [] }

    /* const resSlidesEmpresa = await fetch(process.env.HOST_NAME + '/empresas/imagenesSlide/' + ctx.query.id) */
    const resSlidesEmpresa = await fetch(process.env.HOST_NAME + '/slides')
    const slidesEmpresaJson = await resSlidesEmpresa.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: [], slides: slidesEmpresaJson }

    console.log(props.props.slides)
    return props
}





export default Empresa;
