
import styles from './BarraBusqueda.module.scss';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { useState, useEffect } from 'react';
import { useDataContext, useSetDataContext } from '../../Inicialized/DataProvider';
import { EvBiBusqueda } from '../../Inicialized/Bitacora';





const BarraBusqueda = (props) => {
    const data = useDataContext();
    const setData = useSetDataContext();

    const [busquedaB, setBusqueda] = useState(data.search.busqueda)

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    function onSubmit() {
        setData({...data,search: {...data.search, busqueda: busquedaB}})
        EvBiBusqueda('Barra busqueda', busquedaB)

    }

    function onClear() {
        setData({...data,search: {...data.search, busqueda: ''}})
        setBusqueda('')
    }

    function onChange(e) {
        setBusqueda(e.target.value)
    }


    useEffect(() => {
        setBusqueda(data.search.busqueda)
    }, [data])


    return (

        <div className={styles.barra}>
            <input type="text" placeholder="Que buscas ?" className={styles.buscar} onKeyDown={handleKeyDown} value={busquedaB} onChange={onChange}></input>
            {data.search.busqueda === '' ?
                <div className={styles.botonBuscar} onClick={() => onSubmit()} > <BtnSearch style={{ width: '95%', height: '95%' }} /></div>
                :
                <div className={styles.botonBuscar} onClick={() => onClear()} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
            }

        </div>
    );
}

export default BarraBusqueda;



