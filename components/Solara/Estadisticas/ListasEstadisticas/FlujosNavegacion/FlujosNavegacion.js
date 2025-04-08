import { useState, useEffect } from 'react';
import stylesGeneral from '../../../Listas.module.scss';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import TarjetaBasica from '../../../GeneralComponents/TarjetaBasica';
import { getFlujosNavegacion } from '@/components/Inicialized/data/helpersGetDB';

const FlujosNavegacion = () => {

    const [flujos, setFlujos] = useState([]);
    const [data, setData] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    
    async function getFlujos() {
        const flujosJson = await getFlujosNavegacion();
        if (flujosJson) {
            setFlujos(flujosJson);
            const normalizados = normalizarLista(flujosJson);
            setData(normalizados);
        }
    }

    useEffect(() => {
        getFlujos();
    }, []);

    const refresh = () => {
        getFlujos();
    }

    function normalizarLista(data){
        const result = Object.groupBy(data, ({ hashSession }) => hashSession);
        const resultList = Object.entries(result)

        resultList.map((item) => {
            item[1].sort(((a, b) => a.id - b.id)).map((data, index) => {
                item[1][index] = {
                    datoUno: data.flujo,
                    datoDos: data.etiqueta
                }
            })
        })

        return resultList
    }

    return (
        <div className={`${stylesGeneral.lista}`}>
            <span className={`${stylesGeneral.title}`}>Flujos de navegación</span>
            <div className={`${stylesGeneral.filters}`}>
                {openFilter ?
                    <KeyboardArrowUpOutlinedIcon className={`${stylesGeneral.openFilter}`} onClick={() => setOpenFilter(!openFilter)} />
                    :
                    <KeyboardArrowDownOutlinedIcon className={`${stylesGeneral.openFilter}`} onClick={() => setOpenFilter(!openFilter)} />
                }
            </div>
            <div className={`${stylesGeneral.contentLista}`}>
                {data.map((item, index) => (
                    <TarjetaBasica key={index} titulo={item[0]} descripcion={item[1].length} />
                ))}
            </div>
        </div>
    );
}

export default FlujosNavegacion;
