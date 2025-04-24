import { useState, useEffect } from 'react';
import styles from './BusquedaCiudad.module.scss';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import Cargando from '../../Inicialized/Cargando';
import { MaysPrimera } from '../../Inicialized/GlobalFunctions';
import { EvBiBusqueda } from '../../Inicialized/Bitacora';
import useDataStore from '@/components/Stores/useDataStore';
import { getListaMunicipios } from '@/components/Inicialized/data/helpersGetDB';
import { useAplicarFiltros } from '@/components/utils/useAplicarFiltros'; 

let buscarBar;

const BusquedaCiudad = () => {
  const ciudad = useDataStore((state) => state.search.ciudad);
  const setSearch = useDataStore((state) => state.setSearch);
  const aplicarFiltros = useAplicarFiltros();

  const [listaCiudades, setLC] = useState(null);
  const [listaCiudadesOriginal, setLCO] = useState(null);
  const [busCiudad, setBusCiudad] = useState(ciudad);
  const [mostrarAuto, setmostrarAuto] = useState(true);

  useEffect(() => {
    getListaMunicipios().then((data) => {
      if (data) {
        setLC(data);
        setLCO(data);
      }
    });
  }, []);

  function onSubmit(ciudad, id) {
    setSearch({ ciudad });
    aplicarFiltros(); 
    EvBiBusqueda('Busqueda ciudad', id);
    setBusCiudad(ciudad);
    setmostrarAuto(false);
  }

  function onClear() {
    setSearch({ ciudad: '' });
    setBusCiudad('');
    aplicarFiltros(); 
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit(busCiudad);
  }

  function buscar(valor) {
    setLC("init");
    if (valor === "") {
      setLC(listaCiudadesOriginal);
    } else {
      const prepBus = new RegExp(valor, 'i');
      const Auxi = listaCiudadesOriginal.filter(item =>
        prepBus.test(item.nombre) || prepBus.test(item.nombreDep)
      );
      setLC(Auxi.length === 0 ? [] : Auxi);
    }
  }

  function onChange(e) {
    setmostrarAuto(true);
    clearTimeout(buscarBar);
    const value = e.target.value;
    setBusCiudad(value);
    buscarBar = setTimeout(() => buscar(value), 500);
  }

  function renderBusqueda() {
    if (listaCiudades === "init") return <Cargando />;
    if (listaCiudades.length === 0) return <span>sin resultados</span>;
    return listaCiudades.map((item) => (
      <div className={styles.ciudad} onClick={() => onSubmit(MaysPrimera(item.nombre), item.id)}>
        <h1>{MaysPrimera(item.nombre)} - {MaysPrimera(item.nombreDep)}</h1>
      </div>
    ));
  }

  useEffect(() => {
    setBusCiudad(ciudad);
    setmostrarAuto(false);
  }, [ciudad]);

  return (
    <div className={styles.busquedaCiudad}>
      <input
        type="text"
        placeholder="En que ciudad lo buscas ?"
        className={styles.buscarCiudad}
        onKeyDown={handleKeyDown}
        name="busCiudad"
        value={busCiudad}
        onChange={onChange}
      />
      {ciudad === ''
        ? <div className={styles.botonBuscar} onClick={() => onSubmit()}><BtnSearch style={{ width: '90%', height: '90%' }} /></div>
        : <div className={styles.botonBuscar} onClick={onClear}><BtnClose style={{ width: '85%', height: '85%' }} /></div>
      }
      {busCiudad !== '' && mostrarAuto &&
        <div className={styles.autocompletado}>
          {listaCiudades ? renderBusqueda() : <Cargando />}
        </div>
      }
    </div>
  );
};

export default BusquedaCiudad;
