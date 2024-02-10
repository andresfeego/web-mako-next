import { useRouter } from "next/router"
import Head from 'next/head'
import { MaysPrimera } from '../../../../Inicialized/GlobalFunctions'
import EmpresaTipoUno from "../../../../../components/Home/Empresas/EmpresaTipoUno";
import EmpresaTipoCero from "../../../../../components/Home/Empresas/EmpresaTipoCero";
import { useEffect, useState } from 'react'
import { useDataContext, useSetDataContext, useSetUserContext, useUserContext } from "../../../../../components/Inicialized/DataProvider";
import { search } from "superagent";
import { EvBiVisita } from "../../../../../components/Inicialized/Bitacora";
import PerfilCero from "../../../../../components/Home/Empresas/Perfiles/PerfilCero";
import DatosContacto from "../../Contenido/DatosContacto";
import styles from './PerfilUno.module.scss'
import BarraBusquedaEmpresa from "../../Header/BarraBusquedaEmpresa";
import Header from "../../Header/Header";


function renderPerfilUno(perfilEmpresa, municipios, empresas, slides){
    return (
        <div className={`${styles.perfilUno}`}>
            <BarraBusquedaEmpresa municipios={municipios} empresas={empresas} />
            <Header empresa={perfilEmpresa} slides={slides} />
            <DatosContacto Perfilempresa={perfilEmpresa} styles={styles} />
        </div>
    )
}

const PerfilUno = ({ perfilEmpresa, municipios, empresas, slides }) => {

    console.log(perfilEmpresa)
    const data = useDataContext();
    const setData = useSetDataContext();

    const user = useUserContext();
    const setUser = useSetUserContext();


    const router = useRouter();
    const { id, ciudad } = router.query;
    const [empresa, setEmpresa] = useState(perfilEmpresa)

     useEffect(() => {
        EvBiVisita(empresa.codigo)
    }, []) 
    const isInactive = (empresa.tipo == -1)


    return (
        <div>
            <Head>
                <title>{`${MaysPrimera(empresa.nombre)} - ${MaysPrimera(empresa.nombreMun)} - ${MaysPrimera(empresa.nombreDep)}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                    <meta charset="utf-8" />
                    <title>{`Datos de contacto de ${MaysPrimera(empresa.nombre)} - ${MaysPrimera(empresa.nombreMun)} - ${MaysPrimera(empresa.nombreDep)}`}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content={empresa.slogan + ' - ' +empresa.descripcion} />
                    <meta name="keywords" content={empresa.palabras_clave} />
                    <link rel="canonical" href={process.env.HOST_NAME_MAKO + empresa.codigo} />
                    <meta name="robots" content="index, follow" />
                    <meta name="author" content="www.mako.guru" />
                    <meta name="audience" content="Everyone" />

                    <meta property="og:title" content={`${empresa.nombre} - .: Mako.guru :. Directorio empresarial`} />
                    <meta property="og:description" content={empresa.slogan + ' - ' +empresa.descripcion} />
                    <meta property="og:url" content={process.env.HOST_NAME_MAKO + empresa.codigo} />
                    <meta property="og:image" content={'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo} />
                    <meta property="og:locale" content="es_ES" />

                    <meta name="twitter:title" content={`${empresa.nombre} - .: Mako.guru :. Directorio empresarial`} />
                    <meta name="twitter:description" content={empresa.slogan + ' - ' +empresa.descripcion} />
                    <meta name="twitter:image" content={'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo} />
                    <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {empresa.tipo == 1 ?
                renderPerfilUno(perfilEmpresa, municipios, empresas, slides)
                :
                <PerfilCero inactivo={isInactive} Perfilempresa={empresa} />
            }
        </div>
    );
}

export default PerfilUno;