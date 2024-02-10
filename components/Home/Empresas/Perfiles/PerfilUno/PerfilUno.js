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