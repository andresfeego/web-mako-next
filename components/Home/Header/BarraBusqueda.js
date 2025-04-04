import styles from './BarraBusqueda.module.scss';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { useState, useEffect } from 'react';
import useDataStore from '@/components/Stores/useDataStore';
import { EvBiBusqueda } from '../../Inicialized/Bitacora';

const BarraBusqueda = () => {
  const busqueda = useDataStore((state) => state.search.busqueda);
  const setSearch = useDataStore((state) => state.setSearch);

  const [busquedaB, setBusqueda] = useState(busqueda);

  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit();
  }

  function onSubmit() {
    setSearch({ busqueda: busquedaB });
    EvBiBusqueda('Barra busqueda', busquedaB);
  }

  function onClear() {
    setSearch({ busqueda: '' });
    setBusqueda('');
  }

  function onChange(e) {
    setBusqueda(e.target.value);
  }

  useEffect(() => {
    setBusqueda(busqueda);
  }, [busqueda]);

  return (
    <div className={styles.barra}>
      <input type="text" placeholder="Que buscas ?" className={styles.buscar} onKeyDown={handleKeyDown} value={busquedaB} onChange={onChange} />
      {busqueda === ''
        ? <div className={styles.botonBuscar} onClick={onSubmit}><BtnSearch style={{ width: '95%', height: '95%' }} /></div>
        : <div className={styles.botonBuscar} onClick={onClear}><BtnClose style={{ width: '90%', height: '90%' }} /></div>}
    </div>
  );
};

export default BarraBusqueda;
