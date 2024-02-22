import styles from "./ListaEmpresas.module.scss";
import { useState, useEffect } from 'react';
import Empresa from './Empresa'
import { useDataContext, useSetDataContext } from "../../Inicialized/DataProvider";
import Cargando from "../../Inicialized/Cargando";
import { getEmpresas } from "../../Inicialized/GetDB/GetDB";


const ListaEmpresas = ({ empresas }) => {

    const data = useDataContext();
    const setData = useSetDataContext();
    const [cargando, setCargando] = useState(true);
    const [moreState, setMoreState] = useState(false);
    const [loadMoreState, setLoadMoreState] = useState(false);
    const [page, setPage] = useState(0);

    const [listaEmpresas, setListaEmpresas] = useState(empresas)

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        setCargando(true);
        console.log(data)
        getEmpresas(data.search.busqueda, data.search.ciudad, data.search.categoria, signal, 0, data.ux.limLisEmpresas).then((response) => {
            setListaEmpresas(response); // sets ariaInfo state
            setCargando(false);
            if (response.length == data.ux.limLisEmpresas) {
                setMoreState(true)
            }
            setPage(1)
        })
        return () => controller.abort();
    }
        , [data]
    );

    function moreList() {
        setMoreState(false)
        setLoadMoreState(true)
        setPage(page + 1)
        getEmpresas(data.search.busqueda, data.search.ciudad, data.search.categoria, null, (page * data.ux.limLisEmpresas), data.ux.limLisEmpresas).then((response) => {
            setListaEmpresas(listaEmpresas.concat(response)); // sets ariaInfo state
            setLoadMoreState(false)
            if (response.length == data.ux.limLisEmpresas) {
                setMoreState(true)
            }
        })
    }

    function renderListaEmpresas(listaempresas) {
        return (
            listaEmpresas.length != 0 ? listaempresas.map((empresa) => <Empresa key={empresa.codigo} empresa={empresa} />) : <span>Sin resultados</span>

        )
    }

    return (
        <div className={styles.contentListaEmpresas}>
            <h2 style={{ display: 'none' }}>Listado de empresas</h2>
            <div className={styles.listaEmpresas}>
                {cargando ? <Cargando /> : renderListaEmpresas(listaEmpresas)}
            </div>
            {loadMoreState ? <Cargando className={styles.loadMore} /> : null}
            {moreState ? <div className={styles.moreButton} onClick={() => moreList()}>Ver Más</div> : null}
        </div>
    )

}

export default ListaEmpresas;
