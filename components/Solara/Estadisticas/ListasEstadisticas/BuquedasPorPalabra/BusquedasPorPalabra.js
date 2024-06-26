import { useState } from 'react';
import stylesGeneral from '../../../Listas.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ListadoDosCol from '../../../GeneralComponents/ListadoDosCol';
import { useEffect } from 'react';

const BusquedasPorPalabra = () => {

    const[busquedas, setBusquedas] = useState([])

    async function getBusquedas(){
        const resBusquedas = await fetch(process.env.HOST_NAME + '/bitacora/busquedasPalabra')
        const busquedasJson = await resBusquedas.json()
        setBusquedas(busquedasJson)
    }

    useEffect(() => {
        getBusquedas()
    },[])

    const refresh = () =>{
        getBusquedas()
    }

    const [openFilter, setOpenFilter] = useState(false);
    return (
        <div className={`${stylesGeneral.lista}`}>
            <span className={`${stylesGeneral.title}`}>Busquedas por palabra</span>
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
                            <span>fdfsgdfsg</span>
                            <span>fdfsgdfsg</span>
                            <span>fdfsgdfsg</span>
                            <span>fdfsgdfsg</span>
                            <span>fdfsgdfsg</span>
                            <span>fdfsgdfsg</span>
                            <span>fdfsgdfsg</span>
                        </div>
                        :
                        null
                    }
                </div>
            </div>

            <div className={`${stylesGeneral.contentLista}`}>
                <ListadoDosCol data={busquedas} refresh={refresh} />
            </div>
        </div>
    );
}

export default BusquedasPorPalabra;