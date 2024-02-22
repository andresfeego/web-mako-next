import { useDataContext, useSetDataContext } from '../../Inicialized/DataProvider'
import styles from './Filtros.module.scss'

const Filtros = (props) => {

    const data = useDataContext();
    const setData = useSetDataContext();

    function borrarBusqueda() {
        setData({...data, search: {...data.search, busqueda: ''}})
    }

    function borrarCiudad() {
        setData({...data, search: {...data.search, ciudad: ''}})
    }

    function borrarCategoria() {
        setData({...data, search: {...data.search, lblCategoria: '', categoria: ''}})
    }


    function renderFiltros() {
        const busqueda = data.search.busqueda;
        const ciudad = data.search.ciudad;
        const categoria = data.search.categoria;
        const lblCategoria = data.search.lblCategoria;

        if (busqueda || ciudad || categoria) {
            return (

                <div className={styles.filtros}>

                    <span>Filtros aplicados:</span>
                    {busqueda && <div className={styles.filtroAplicado}>{busqueda} <div className={styles.close} onClick={() => borrarBusqueda()}>X</div></div>}
                    {ciudad && <div className={styles.filtroAplicado}>{ciudad} <div className={styles.close} onClick={() => borrarCiudad()}>X</div></div>}
                    {categoria && <div className={styles.filtroAplicado}>{lblCategoria} <div className={styles.close} onClick={() => borrarCategoria()}>X</div></div>}
                </div>
            )
        } else {
            return null
        }
    }

    return (
        renderFiltros()

    )
}

export default Filtros;
