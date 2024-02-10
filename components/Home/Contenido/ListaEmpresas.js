import styles from "./ListaEmpresas.module.scss";
import { useState, useEffect } from 'react';
import Empresa from './Empresa'
import { useDataContext, useSetDataContext } from "../../Inicialized/DataProvider";
import Cargando from "../../Inicialized/Cargando";


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





const ListaEmpresas = ({ empresas}) => {

    const data = useDataContext();
    const setData = useSetDataContext();
    const [cargando, setCargando] = useState(true);

    const [listaEmpresas, setListaEmpresas] = useState(empresas)

    useEffect(() => {
        setCargando(true);
        getEmpresas(data.search.busqueda, data.search.ciudad, data.search.categoria).then((response) => {
            setListaEmpresas(response); // sets ariaInfo state
            setCargando(false);
        })
    }
        , [data]
    );


    function renderListaEmpresas(listaempresas) {
        return (
            listaEmpresas.length != 0 ? listaempresas.slice(0, 12).map((empresa) => <Empresa key={empresa.codigo} empresa={empresa} />): <span>Sin resultados</span>
            
        )
    }

    return (
        <div className={styles.listaEmpresas}>
            {cargando ? <Cargando/>:renderListaEmpresas(listaEmpresas)}
        </div>
    )

}

export default ListaEmpresas;
