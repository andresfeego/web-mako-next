import styles from './Filtros.module.scss'
import { clearBusqueda, clearCiudad, clearlblCategoria, clearCategoria } from '../../Inicialized/Actions';
import { connect } from 'react-redux';

const Filtros = (props) => {

    function borrarBusqueda() {
        props.clearBusqueda()
    }

    function borrarCiudad() {
        props.clearCiudad()
    }

    function borrarCategoria() {
        props.clearlblCategoria()
        props.clearCategoria()
    }


    function renderFiltros() {
        if (props.busqueda || props.ciudad || props.categoria) {
            return (

                <div className={styles.filtros}>

                    <span>Filtros aplicados:</span>
                    {props.busqueda && <div className={styles.filtroAplicado}>{props.busqueda} <div className={styles.close} onClick={() => borrarBusqueda()}>X</div></div>}
                    {props.ciudad && <div className={styles.filtroAplicado}>{props.ciudad} <div className={styles.close} onClick={() => borrarCiudad()}>X</div></div>}
                    {props.categoria && <div className={styles.filtroAplicado}>{props.lblCategoria} <div className={styles.close} onClick={() => borrarCategoria()}>X</div></div>}
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


export default connect(mapStateToProps, mapDispatchToProps)(Filtros);
