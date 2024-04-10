
import { useRouter } from "next/router"
import { useEffect } from 'react'
import { EvBiVisita } from "../../../../components/Inicialized/Bitacora";
import PerfilUno from "../../../../components/Home/Empresas/Perfiles/PerfilUno/PerfilUno";

const Empresa = ({ empresa, municipios, empresas, slides, codigo }) => {

    useEffect(() => {
        if(empresa){
            console.warn(empresa)
            EvBiVisita(empresa.codigo)
        }
    }, [codigo])
     return (
        <PerfilUno perfilEmpresa={empresa} municipios={municipios} empresas={empresas} slides={slides}/>
    )
}


export async function getServerSideProps(ctx) {
    var props = { props: {} }
const codigo = ctx.query.id

    const resEmpresa = await fetch(process.env.HOST_NAME + '/empresas/' + codigo)
    const empresaJson = await resEmpresa.json()
    props.props = { empresa: empresaJson[0] }




    const response = await fetch(process.env.HOST_NAME + '/listaMunicipios')
    const responseJson = await response.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson }

    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: [] }

    /* const resSlidesEmpresa = await fetch(process.env.HOST_NAME + '/empresas/imagenesSlide/' + ctx.query.id) */
    const resSlidesEmpresa = await fetch(process.env.HOST_NAME + '/slides')
    const slidesEmpresaJson = await resSlidesEmpresa.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: [], slides: slidesEmpresaJson, codigo: codigo }

    return props
}





export default Empresa;
