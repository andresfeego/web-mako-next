import { useEffect } from 'react';
import stylesGeneral from './listadoResultados.module.scss'
import { useState } from 'react';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

const ListadoResultadosVacio = () => {

    const[busquedas, setBusquedas] = useState(false)

    async function getBusquedas(){
        const resBusquedas = await fetch(process.env.HOST_NAME + '/bitacora/busquedasPalabra')
        const busquedasJson = await resBusquedas.json()
        setBusquedas(busquedasJson)
    }

    useEffect(() => {
        getBusquedas()
    },[])


    function renderLista(){
        return(
            busquedas.map((item) => 
                <div className={`${stylesGeneral.palabraBuscada}`}>
                    <span>{item.etiqueta}</span>
                    <span>{item.count}</span>
                </div>
            )
    )
    }

    return ( 
        <div className={`${stylesGeneral.listadoResultados}`}>
            <span>Aqui va el contenido</span>
        </div>
     );
}
 
export default ListadoResultadosVacio;