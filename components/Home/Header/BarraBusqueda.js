
import styles from './BarraBusqueda.module.scss';
import { connect } from 'react-redux'
import { saveBusqueda, clearBusqueda } from '../../Inicialized/Actions';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { useState, useEffect } from 'react';





const BarraBusqueda = (props) => {
    const [busquedaB, setBusqueda] = useState(props.busqueda)

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    function onSubmit() {
        props.saveBusqueda(busquedaB);
    }

    function onClear() {
        props.clearBusqueda();
        setBusqueda('')
    }

    function onChange(e) {
        setBusqueda(e.target.value)
    }


    useEffect(() => {
        setBusqueda(props.busqueda)
    }, [props.busqueda])


    return (

        <div className={styles.barra}>
            <input type="text" placeholder="Que buscas ?" className={styles.buscar} onKeyDown={handleKeyDown} value={busquedaB} onChange={onChange}></input>
            {props.busqueda === '' ?
                <div className={styles.botonBuscar} onClick={() => onSubmit()} > <BtnSearch style={{ width: '95%', height: '95%' }} /></div>
                :
                <div className={styles.botonBuscar} onClick={() => onClear()} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
            }

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda
    }
}

const mapDispatchToProps = {
    saveBusqueda: saveBusqueda,
    clearBusqueda: clearBusqueda
}


export default connect(mapStateToProps, mapDispatchToProps)(BarraBusqueda);



