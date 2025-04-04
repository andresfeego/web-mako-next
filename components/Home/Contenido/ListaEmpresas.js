import styles from "./ListaEmpresas.module.scss";
import { useState, useEffect } from 'react';
import Empresa from './Empresa';
import Cargando from "../../Inicialized/Cargando";
import { getEmpresas } from "../../Inicialized/GetDB/GetDB";
import useDataStore from '@/components/Stores/useDataStore';

const ListaEmpresas = () => {
  const busqueda = useDataStore((state) => state.search.busqueda);
  const ciudad = useDataStore((state) => state.search.ciudad);
  const categoria = useDataStore((state) => state.search.categoria);
  const limLisEmpresas = useDataStore((state) => state.ux.limLisEmpresas);

  const [cargando, setCargando] = useState(true);
  const [moreState, setMoreState] = useState(false);
  const [loadMoreState, setLoadMoreState] = useState(false);
  const [page, setPage] = useState(0);
  const [listaEmpresas, setListaEmpresas] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setMoreState(false);
    setCargando(true);

    getEmpresas(busqueda, ciudad, categoria, signal, 0, limLisEmpresas).then((response) => {
      setListaEmpresas(response);
      setCargando(false);
      if (response.length === limLisEmpresas) setMoreState(true);
      setPage(1);
    });

    return () => controller.abort('por el usuario');
  }, [busqueda, ciudad, categoria, limLisEmpresas]);

  function moreList() {
    setMoreState(false);
    setLoadMoreState(true);
    setPage(page + 1);

    getEmpresas(busqueda, ciudad, categoria, null, page * limLisEmpresas, limLisEmpresas).then((response) => {
      setListaEmpresas(listaEmpresas.concat(response));
      setLoadMoreState(false);
      if (response.length === limLisEmpresas) setMoreState(true);
    });
  }

  function renderListaEmpresas(lista) {
    return lista.length !== 0
      ? lista.map((empresa) => <Empresa key={empresa.codigo} empresa={empresa} />)
      : <span>Sin resultados</span>;
  }

  return (
    <div className={styles.contentListaEmpresas}>
      <h2 style={{ display: 'none' }}>Listado de empresas</h2>
      <div className={styles.listaEmpresas}>
        {cargando ? <Cargando /> : renderListaEmpresas(listaEmpresas)}
      </div>
      {loadMoreState && <Cargando className={styles.loadMore} />}
      {moreState && <div className={styles.moreButton} onClick={moreList}>Ver Más</div>}
    </div>
  );
};

export default ListaEmpresas;
