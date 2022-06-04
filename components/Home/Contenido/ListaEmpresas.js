import styles from "./ListaEmpresas.module.scss";
import { connect } from 'react-redux'
import { clearBusqueda } from '../../Inicialized/Actions';
import { useState, useEffect } from 'react';
import Empresa from './Empresa'


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





const ListaEmpresas = ({ empresas, busqueda, ciudad, categoria }) => {
    const [listaEmpresas, setListaEmpresas] = useState(empresas)

    useEffect(() => {
        getEmpresas(busqueda, ciudad, categoria).then((response) => {
            setListaEmpresas(response); // sets ariaInfo state
        })
    }
        , [busqueda, ciudad, categoria]
    );


    function renderListaEmpresas(listaempresas) {
        return (
            listaempresas.map((empresa) => <Empresa key={empresa.codigo} empresa={empresa} />)
        )
    }

    return (
        <div className={styles.listaEmpresas}>
            {renderListaEmpresas(listaEmpresas)}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda,
        ciudad: state.ciudad,
        categoria: state.categoria
    }
}

const mapDispatchToProps = {
    clearBusqueda: clearBusqueda
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaEmpresas);
