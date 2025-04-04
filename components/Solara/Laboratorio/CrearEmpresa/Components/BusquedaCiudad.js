import { useState, useEffect } from 'react';
import styles from './BusquedaCiudad.module.scss';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import Cargando from '../../../../Inicialized/Cargando';
import { MaysPrimera } from '../../../../Inicialized/GlobalFunctions';

let buscarBar;

const BusquedaCiudad = ({ municipios, setMunicipio, ciudadInicial }) => {
  const [listaCiudades, setLC] = useState(municipios);
  const [listaCiudadesOriginal, setLCO] = useState(municipios);
  const [busCiudad, setBusCiudad] = useState(ciudadInicial);
  const [mostrarAuto, setmostrarAuto] = useState(true);

  useEffect(() => {
    fetch(process.env.HOST_NAME + '/listaMunicipios')
      .then((res) => res.json())
      .then((data) => {
        setLC(data);
        setLCO(data);
      });
  }, []);

  useEffect(() => {
    if (ciudadInicial == 0) {
      setBusCiudad('');
      setMunicipio(0);
    }
  }, [ciudadInicial]);

  function onSubmit(ciudad, id) {
    setBusCiudad(ciudad);
    setMunicipio(id);
    setmostrarAuto(false);
  }

  function onClear() {
    setBusCiudad('');
    setMunicipio(0);
  }

  function buscar(busqueda) {
    setLC("init");
    if (busqueda === "") {
      setLC(listaCiudadesOriginal);
    } else {
      const prepBus = new RegExp(busqueda, 'i');
      let Auxi = listaCiudadesOriginal.filter(item =>
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
    return listaCiudades.map(item =>
      <div className={styles.ciudad} onClick={() => onSubmit(MaysPrimera(item.nombre), item.id)}>
        <h1>{MaysPrimera(item.nombre)} - {MaysPrimera(item.nombreDep)}</h1>
      </div>
    );
  }

  useEffect(() => {
    setmostrarAuto(false);
  }, []);

  return (
    <div className={styles.busquedaCiudad}>
      <input type="text" placeholder="Ciudad" className={styles.buscarCiudad} name="busCiudad" value={busCiudad} onChange={onChange} />
      {busCiudad !== '' && mostrarAuto &&
        <div className={styles.autocompletado}>
          {renderBusqueda()}
        </div>}
    </div>
  );
};

export default BusquedaCiudad;
