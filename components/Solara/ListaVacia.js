import { useState } from 'react';
import stylesGeneral from '../../../Listas.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import TarjetaVacia from './TarjetaVacia';
import ListadoResultadosVacio from './ListadoResultadosVacio';

const ListaVacia = () => {

    const [openFilter, setOpenFilter] = useState(false);
    return (
        <div className={`${stylesGeneral.lista}`}>
            <span className={`${stylesGeneral.title}`}>Aqui va el titulo</span>
            <div className={`${stylesGeneral.filters}`}>
                {openFilter ?
                    <KeyboardArrowUpOutlinedIcon className={`${stylesGeneral.openFilter}`} onClick={() => setOpenFilter(!openFilter)} />
                    :
                    <KeyboardArrowDownOutlinedIcon className={`${stylesGeneral.openFilter}`} onClick={() => setOpenFilter(!openFilter)} />
                }
                <div className={`${stylesGeneral.contentFilter}`} style={openFilter? {height: '150px'} : {height: '18px'}}>
                    <span className={`${stylesGeneral.titleFilters}`}>Filtros</span>
                    {openFilter ?
                        <div className={`${stylesGeneral.filtersToApply}`}>
                            <span>Aqui van los filtros</span>
                        </div>
                        :
                        null
                    }
                </div>
            </div>

            <div className={`${stylesGeneral.contentLista}`}>
                <span>Aqui va el contenido</span>
            </div>
        </div>
    );
}

export default ListaVacia;