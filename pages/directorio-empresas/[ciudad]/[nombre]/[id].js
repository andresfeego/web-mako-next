
import { useRouter } from "next/router"
import Head from 'next/head'
import { MaysPrimera } from '../../../../components/Inicialized/GlobalFunctions'
import EmpresaTipoUno from "../../../../components/Home/Empresas/EmpresaTipoUno";
import EmpresaTipoCero from "../../../../components/Home/Empresas/EmpresaTipoCero";
import { useEffect } from 'react'
import { useDataContext, useSetDataContext, useSetUserContext, useUserContext } from "../../../../components/Inicialized/DataProvider";
import { search } from "superagent";
import { EvBiVisita } from "../../../../components/Inicialized/Bitacora";

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


const Empresa = ({ empresa, municipios, empresas, slides }) => {

    const data = useDataContext();
    const setData = useSetDataContext();
   
    const user = useUserContext();
    const setUser = useSetUserContext();
    

    const router = useRouter();
    const { id, ciudad } = router.query;

    useEffect(() => {
        EvBiVisita(empresa.codigo)
    }, [])

     return (
        <div>
            <Head>
                <title>{`${MaysPrimera(empresa.nombre)} - ${MaysPrimera(empresa.nombreMun)} - ${MaysPrimera(empresa.nombreDep)}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            {empresa.tipo == 1 ?
                <EmpresaTipoUno  empresa={empresa} municipios={municipios} empresas={empresas} slides={slides} />
                :
                <EmpresaTipoCero empresa={empresa} municipios={municipios} empresas={empresas} />
            }
            <span onClick={() => setData({ux: {...data.ux, scroll: 5}})}>{data.ux.scroll}</span>
            

        </div>
    )
}


export async function getServerSideProps(ctx) {
    var props = { props: {} }


    console.log("getnin")
    const resEmpresa = await fetch(process.env.HOST_NAME + '/empresas/' + ctx.query.id)
    const empresaJson = await resEmpresa.json()
    props.props = { empresa: empresaJson[0] }




    const response = await fetch(process.env.HOST_NAME + '/listaMunicipios')
    const responseJson = await response.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson }

    const empresas = await getEmpresas("", "", 0)
    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: empresas }

    const resSlidesEmpresa = await fetch(process.env.HOST_NAME + '/empresas/imagenesSlide/' + ctx.query.id)
    const slidesEmpresaJson = await resSlidesEmpresa.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: empresas, slides: slidesEmpresaJson }

    console.log(props.props.slides)
    return props
}





export default Empresa;
