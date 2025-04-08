import { useState, useEffect } from 'react';
import stylesGeneral from '../../../Listas.module.scss';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ListadoDosCol from '../../../GeneralComponents/ListadoDosCol';
import { getBusquedasPalabra } from '@/components/Inicialized/data/helpersGetDB'; // usa el helper

const BusquedasPorPalabra = () => {
  const [busquedas, setBusquedas] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const getBusquedas = async () => {
    const data = await getBusquedasPalabra();
    if (data) setBusquedas(data);
  };

  useEffect(() => {
    getBusquedas();
  }, []);

  const refresh = () => {
    getBusquedas();
  };

  return (
    <div className={stylesGeneral.lista}>
      <span className={stylesGeneral.title}>Busquedas por palabra</span>
      
      <div className={stylesGeneral.filters}>
        {openFilter ? (
          <KeyboardArrowUpOutlinedIcon
            className={stylesGeneral.openFilter}
            onClick={() => setOpenFilter(!openFilter)}
          />
        ) : (
          <KeyboardArrowDownOutlinedIcon
            className={stylesGeneral.openFilter}
            onClick={() => setOpenFilter(!openFilter)}
          />
        )}

        <div
          className={stylesGeneral.contentFilter}
          style={openFilter ? { height: '150px' } : { height: '18px' }}
        >
          <span className={stylesGeneral.titleFilters}>Filtros</span>
          {openFilter && (
            <div className={stylesGeneral.filtersToApply}>
              <span>fdfsgdfsg</span>
              <span>fdfsgdfsg</span>
              <span>fdfsgdfsg</span>
              <span>fdfsgdfsg</span>
              <span>fdfsgdfsg</span>
              <span>fdfsgdfsg</span>
              <span>fdfsgdfsg</span>
            </div>
          )}
        </div>
      </div>

      <div className={stylesGeneral.contentLista}>
        <ListadoDosCol data={busquedas} refresh={refresh} />
      </div>
    </div>
  );
};

export default BusquedasPorPalabra;
