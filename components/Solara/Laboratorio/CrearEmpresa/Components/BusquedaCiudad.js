import { useState, useEffect } from 'react';
import styles from './BusquedaCiudad.module.scss';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import Cargando from '../../../../Inicialized/Cargando';
import { MaysPrimera } from '../../../../Inicialized/GlobalFunctions';
import { getListaMunicipios } from '@/components/Inicialized/data/helpersGetDB';

let buscarBar;

const BusquedaCiudad = ({ municipios, setMunicipio, ciudadInicial }) => {
  const [listaCiudades, setLC] = useState(municipios || []);
  const [listaCiudadesOriginal, setLCO] = useState(municipios || []);
  const [busCiudad, setBusCiudad] = useState(ciudadInicial);
  const [mostrarAuto, setmostrarAuto] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMunicipios = async () => {
      const data = await getListaMunicipios();
      setLC(data || []);
      setLCO(data || []);
      setLoading(false);
    };

    fetchMunicipios();
  }, []);

  useEffect(() => {
    if (ciudadInicial === 0) {
      setBusCiudad('');
      setMunicipio(0);
    }
  }, [ciudadInicial]);

  const onSubmit = (ciudad, id) => {
    setBusCiudad(ciudad);
    setMunicipio(id);
    setmostrarAuto(false);
  };

  const onClear = () => {
    setBusCiudad('');
    setMunicipio(0);
  };

  const buscar = (busqueda) => {
    if (!busqueda) {
      setLC(listaCiudadesOriginal);
      return;
    }

    const prepBus = new RegExp(busqueda, 'i');
    const filtrado = listaCiudadesOriginal.filter(item =>
      prepBus.test(item.nombre) || prepBus.test(item.nombreDep)
    );

    setLC(filtrado);
  };

  const onChange = (e) => {
    setmostrarAuto(true);
    clearTimeout(buscarBar);
    const value = e.target.value;
    setBusCiudad(value);
    buscarBar = setTimeout(() => buscar(value), 500);
  };

  const renderBusqueda = () => {
    if (loading) return <Cargando />;
    if (!Array.isArray(listaCiudades) || listaCiudades.length === 0) {
      return <span>sin resultados</span>;
    }

    return listaCiudades.map(item => (
      <div
        key={item.id}
        className={styles.ciudad}
        onClick={() => onSubmit(MaysPrimera(item.nombre), item.id)}
      >
        <h1>
          {MaysPrimera(item.nombre)} - {MaysPrimera(item.nombreDep)}
        </h1>
      </div>
    ));
  };

  useEffect(() => {
    setmostrarAuto(false);
  }, []);

  return (
    <div className={styles.busquedaCiudad}>
      <input
        type="text"
        placeholder="Ciudad"
        className={styles.buscarCiudad}
        name="busCiudad"
        value={busCiudad}
        onChange={onChange}
      />
      {busCiudad !== '' && mostrarAuto && (
        <div className={styles.autocompletado}>
          {renderBusqueda()}
        </div>
      )}
    </div>
  );
};

export default BusquedaCiudad;
