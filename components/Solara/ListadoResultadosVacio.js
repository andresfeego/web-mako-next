import { useEffect } from 'react';
import stylesGeneral from './listadoResultados.module.scss'
import { useState } from 'react';
import { getBusquedasPalabra } from '@/components/Inicialized/data/helpersGetDB';

const ListadoResultadosVacio = () => {

    const[busquedas, setBusquedas] = useState(false)

    async function getBusquedas(){
        const resBusquedas = await getBusquedasPalabra();
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