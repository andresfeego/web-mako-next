import styles from './BarraBusquedaEmpresa.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { MaysPrimera } from '../../../Inicialized/GlobalFunctions';
import Cargando from '../../../Inicialized/Cargando';
import Empresa from '../../Contenido/Empresa';
import Image from 'next/image';
import { getEmpresas } from '../../../Inicialized/GetDB/GetDB';
import useDataStore from '@/components/Stores/useDataStore';

const BarraBusquedaEmpresa = (props) => {
  const busqueda = useDataStore((state) => state.search.busqueda);
  const ciudad = useDataStore((state) => state.search.ciudad);
  const setSearch = useDataStore((state) => state.setSearch);

  let buscarBar;

  const [listaCiudades, setLC] = useState(props.municipios);
  const [listaCiudadesOriginal, setLCO] = useState(props.municipios);
  const [busCiudad, setBusCiudad] = useState(ciudad);
  const [mostrarAuto, setmostrarAuto] = useState(true);
  const [listaEmpresas, setListaEmpresas] = useState(null);
  const [busquedaB, setBusqueda] = useState(busqueda);

  function onSubmitCiudad(ciudadValue) {
    setSearch({ ciudad: ciudadValue });
    setBusCiudad(ciudadValue);
    setmostrarAuto(false);
  }

  function onClearCiudad() {
    setSearch({ ciudad: '' });
    setBusCiudad('');
  }

  function handleKeyDownCiudad(e) {
    if (e.key === 'Enter') onSubmitCiudad(busCiudad);
  }

  function buscar(valor) {
    setLC("init");
    if (valor === "") {
      setLC(listaCiudadesOriginal);
    } else {
      const prepBus = new RegExp(valor, 'i');
      const Auxi = listaCiudadesOriginal.filter((item) =>
        prepBus.test(item.nombre) || prepBus.test(item.nombreDep)
      );
      setLC(Auxi.length === 0 ? [] : Auxi);
    }
  }

  function onChangeCiudad(e) {
    setmostrarAuto(true);
    clearTimeout(buscarBar);
    const value = e.target.value;
    setBusCiudad(value);
    buscarBar = setTimeout(() => buscar(value), 500);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit();
  }

  function onSubmit() {
    setSearch({ busqueda: busquedaB });
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
    setBusCiudad(ciudad);
    setmostrarAuto(false);
    getEmpresas(busqueda, ciudad, 0).then((response) => setListaEmpresas(response));
  }, [busqueda, ciudad]);

  let estiloBuscando = { height: '0.1vw' };
  if (busqueda !== '' || ciudad !== '') estiloBuscando = { height: '11vw' };

  function renderBusqueda() {
    if (listaCiudades === "init") return <Cargando />;
    if (listaCiudades.length === 0) return <span>sin resultados</span>;
    return listaCiudades.map((item) => (
      <div className={styles.ciudad} onClick={() => onSubmitCiudad(MaysPrimera(item.nombre))}>
        <h1>{MaysPrimera(item.nombre)} - {MaysPrimera(item.nombreDep)}</h1>
      </div>
    ));
  }

  function renderListaEmpresas(lista) {
    return lista.map((empresa) => (
      <div className={styles.empresaPeque} key={empresa.codigo}>
        <Empresa empresa={empresa} />
      </div>
    ));
  }

  return (
    <div className={styles.barraBusqueda}>
      <div className={styles.panelBusqueda}>
        <Link href="/directorio-empresarial" title="📖✔ Directorio con súper poderes para empresas.">
          <div>
            <Image width={0} height={0} sizes="100vw" className={styles.logoMako} src={require('../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.webp')} alt="Logo Mako" title="Directorio empresarial Mako" />
          </div>
        </Link>

        <div className={styles.barra}>
          <input type="text" placeholder="Que buscas ?" className={styles.buscar} onKeyDown={handleKeyDown} value={busquedaB} onChange={onChange} />
          {busqueda === ''
            ? <div className={styles.botonBuscar} onClick={onSubmit}><BtnSearch style={{ width: '95%', height: '95%' }} /></div>
            : <div className={styles.botonBuscar} onClick={onClear}><BtnClose style={{ width: '90%', height: '90%' }} /></div>}
        </div>

        <div className={styles.busquedaCiudad}>
          <input type="text" placeholder="En que ciudad lo buscas ?" className={styles.buscarCiudad} onKeyDown={handleKeyDownCiudad} name="busCiudad" value={busCiudad} onChange={onChangeCiudad} />
          {ciudad === ''
            ? <div className={styles.botonBuscar} onClick={() => onSubmitCiudad(busCiudad)}><BtnSearch style={{ width: '90%', height: '90%' }} /></div>
            : <div className={styles.botonBuscar} onClick={onClearCiudad}><BtnClose style={{ width: '85%', height: '85%' }} /></div>}
          {busCiudad !== '' && mostrarAuto &&
            <div className={styles.autocompletado}>{renderBusqueda()}</div>}
        </div>
      </div>

      <div className={styles.panelResultados} style={estiloBuscando}>
        {listaEmpresas != null && (busqueda !== '' || ciudad !== '') && renderListaEmpresas(listaEmpresas)}
      </div>
    </div>
  );
};

export default BarraBusquedaEmpresa;
