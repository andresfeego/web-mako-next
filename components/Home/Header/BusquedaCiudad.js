import { useState, useEffect } from 'react';
import styles from './BusquedaCiudad.module.scss';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';

import Cargando from '../../Inicialized/Cargando';
import { MaysPrimera } from '../../Inicialized/GlobalFunctions';
import { EvBiBusqueda } from '../../Inicialized/Bitacora';

import useDataStore from '@/components/Stores/useDataStore';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { getListaMunicipios } from '@/components/Inicialized/data/helpersGetDB';
import { useAplicarFiltros } from '@/components/utils/useAplicarFiltros';

let buscarBar;

/**
 * Componente de autocompletado de ciudad.
 *
 * ▸ Modo FILTROS (por defecto)   → maneja store search y aplica filtros.  
 * ▸ Modo FORMULARIO (onSelect)   → devuelve { id, nombre, nombreDep } al padre sin tocar el store.
 *
 * Props:
 *   onSelect?(ciudadObj|null)   // activar modo formulario
 *   initialValue?               // texto inicial en el input (modo formulario)
 */
const BusquedaCiudad = ({ onSelect, initialValue = '', dropdownMode = 'inline' }) => {
  /* ----- detectar modo ----- */
  const esFormulario = typeof onSelect === 'function';

  /* ----- store para modo filtros ----- */
  const ciudadStore = useDataStore((s) => s.search.ciudad);
  const setSearch = useDataStore((s) => s.setSearch);
  const aplicarFiltros = useAplicarFiltros();

  /* ----- estado local ----- */
  const [listaCiudades, setLC] = useState(null);
  const [listaCiudadesOriginal, setLCO] = useState(null);
  const [busCiudad, setBusCiudad] = useState(esFormulario ? initialValue : ciudadStore);
  const [mostrarAuto, setMostrarAuto] = useState(true);

  /* ----- lista en store de usuario (cache) ----- */
  const setlistaCiudades = useUsuarioStore((s) => s.setlistaCiudades);
  const listaCiud = useUsuarioStore((s) => s.listaCiudades);

  /* ===== cargar lista (solo una vez) ===== */
  useEffect(() => {
    if (listaCiud.length === 0) {
      getListaMunicipios().then((data) => {
        if (data) setlistaCiudades(data);
      });
    }
  }, []);

  /* guardar en local cuando llega la lista */
  useEffect(() => {
    setLC(listaCiud);
    setLCO(listaCiud);
  }, [listaCiud]);

  /* ===== sincronizar con store cuando cambia (solo modo filtros) ===== */
  useEffect(() => {
    if (!esFormulario) {
      setBusCiudad(ciudadStore);
      setMostrarAuto(false);
    }
  }, [ciudadStore, esFormulario]);
  /* ⇢  Sincronizar el input con initialValue en modo formulario  */
  useEffect(() => {
    if (esFormulario) {
      setBusCiudad(initialValue);
      setMostrarAuto(false);      // oculta autocompletado
    }
  }, [initialValue, esFormulario]);

  /* ===== submit & clear según modo ===== */
  const onSubmit = (ciudad, id, nombreDep) => {
    if (esFormulario) {
      onSelect({ id, nombre: ciudad, nombreDep });
    } else {
      setSearch({ ciudad });
      aplicarFiltros();
      EvBiBusqueda('Busqueda ciudad', id);
    }
    setBusCiudad(ciudad);
    setMostrarAuto(false);
  };

  const onClear = () => {
    if (esFormulario) {
      onSelect(null);
    } else {
      setSearch({ ciudad: '' });
      aplicarFiltros();
    }
    setBusCiudad('');
  };

  /* ===== handlers de texto ===== */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSubmit(busCiudad);
  };

  const buscar = (valor) => {
    setLC('init');
    if (valor === '') {
      setLC(listaCiudadesOriginal);
    } else {
      const prepBus = new RegExp(valor, 'i');
      const auxi = listaCiudadesOriginal.filter(
        (itm) => prepBus.test(itm.nombre) || prepBus.test(itm.nombreDep)
      );
      setLC(auxi.length === 0 ? [] : auxi);
    }
  };

  const onChange = (e) => {
    setMostrarAuto(true);
    clearTimeout(buscarBar);
    const value = e.target.value;
    setBusCiudad(value);
    buscarBar = setTimeout(() => buscar(value), 500);
  };

  /* ===== render listado ===== */
  const renderBusqueda = () => {
    if (listaCiudades === 'init') return <Cargando />;
    if (listaCiudades.length === 0) return <span>Sin resultados</span>;
    return listaCiudades.map((item) => (
      <div
        key={item.id}
        className={styles.ciudad}
        onClick={() =>
          onSubmit(MaysPrimera(item.nombre), item.id, MaysPrimera(item.nombreDep))
        }
      >
        <h1>
          {MaysPrimera(item.nombre)} - {MaysPrimera(item.nombreDep)}
        </h1>
      </div>
    ));
  };



  /* ===== JSX ===== */
  return (
    <div className={styles.busquedaCiudad} data-mode={dropdownMode}>
      <input
        type="text"
        placeholder="¿En qué ciudad?"
        className={styles.buscarCiudad}
        value={busCiudad}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {busCiudad === '' ? (
        <div className={styles.botonBuscar} onClick={() => onSubmit(busCiudad)}>
          <BtnSearch style={{ width: '90%', height: '90%' }} />
        </div>
      ) : (
        <div className={styles.botonBuscar} onClick={onClear}>
          <BtnClose style={{ width: '85%', height: '85%' }} />
        </div>
      )}

      {busCiudad !== '' && mostrarAuto && (
        <div className={styles.autocompletado} data-mode={dropdownMode}>
          {listaCiudades ? renderBusqueda() : <Cargando />}
        </div>
      )}
    </div>
  );
};

export default BusquedaCiudad;
