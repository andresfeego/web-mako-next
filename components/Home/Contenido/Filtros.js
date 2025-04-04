import useDataStore from '@/components/Stores/useDataStore';
import styles from './Filtros.module.scss';

const Filtros = () => {
  const search = useDataStore((state) => state.search);
  const setSearch = useDataStore((state) => state.setSearch);

  function borrarBusqueda() {
    setSearch({ busqueda: '' });
  }

  function borrarCiudad() {
    setSearch({ ciudad: '' });
  }

  function borrarCategoria() {
    setSearch({ lblCategoria: '', categoria: '' });
  }

  function renderFiltros() {
    const { busqueda, ciudad, categoria, lblCategoria } = search;

    if (busqueda || ciudad || categoria) {
      return (
        <div className={styles.filtros}>
          <span>Filtros aplicados:</span>
          {busqueda && <div className={styles.filtroAplicado}>{busqueda} <div className={styles.close} onClick={borrarBusqueda}>X</div></div>}
          {ciudad && <div className={styles.filtroAplicado}>{ciudad} <div className={styles.close} onClick={borrarCiudad}>X</div></div>}
          {categoria && <div className={styles.filtroAplicado}>{lblCategoria} <div className={styles.close} onClick={borrarCategoria}>X</div></div>}
        </div>
      );
    }

    return null;
  }

  return renderFiltros();
};

export default Filtros;
