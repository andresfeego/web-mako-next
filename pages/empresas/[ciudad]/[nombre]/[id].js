
import { useRouter } from "next/router"
import Head from 'next/head'
import { MaysPrimera } from '../../../../components/Inicialized/GlobalFunctions'
import EmpresaTipoUno from "../../../../components/Home/Empresas/EmpresaTipoUno";
import EmpresaTipoCero from "../../../../components/Home/Empresas/EmpresaTipoCero";
import { clearBusqueda, clearCiudad, clearlblCategoria, clearCategoria } from '../../../../components/Inicialized/Actions';
import { connect } from 'react-redux';
import { useEffect } from 'react'

async function getEmpresas(busqueda, ciudad, categoria) {

    const response = await fetch('http://localhost:3020/responseMako/empresas',
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


const Empresa = ({ empresa, municipios, empresas, clearBusqueda, clearCiudad, slides }) => {


    const router = useRouter();
    const { id, ciudad } = router.query;

    useEffect(() => {
        clearBusqueda()
        clearCiudad()
    }, [empresa])

    return (
        <div>
            <Head>
                <title>{`${MaysPrimera(empresa.nombre)} - ${MaysPrimera(empresa.nombreMun)} - ${MaysPrimera(empresa.nombreDep)}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            {empresa.tipo == 1 ?
                <EmpresaTipoUno empresa={empresa} municipios={municipios} empresas={empresas} slides={slides} />
                :
                <EmpresaTipoCero empresa={empresa} municipios={municipios} empresas={empresas} />
            }

        </div>
    )
}


export async function getServerSideProps(ctx) {
    var props = { props: {} }



    const resEmpresa = await fetch('http://localhost:3020/responseMako/empresas/' + ctx.query.id)
    const empresaJson = await resEmpresa.json()
    props.props = { empresa: empresaJson[0] }




    const response = await fetch('http://localhost:3020/responseMako/listaMunicipios')
    const responseJson = await response.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson }

    const empresas = await getEmpresas("", "", 0)
    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: empresas }

    const resSlidesEmpresa = await fetch('http://localhost:3020/responseMako/empresas/imagenesSlide/' + ctx.query.id)
    const slidesEmpresaJson = await resSlidesEmpresa.json()
    props.props = { empresa: empresaJson[0], municipios: responseJson, empresas: empresas, slides: slidesEmpresaJson }

    console.log(props.props.slides)
    return props
}



const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda,
        ciudad: state.ciudad,
        categoria: state.categoria,
        lblCategoria: state.lblCategoria,
    }
}

const mapDispatchToProps = {
    clearBusqueda: clearBusqueda,
    clearlblCategoria: clearlblCategoria,
    clearCategoria: clearCategoria,
    clearCiudad: clearCiudad
}


export default connect(mapStateToProps, mapDispatchToProps)(Empresa);
