import { useState } from 'react';
import stylesGeneral from '../../../Listas.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import TarjetaBasica from '../../../GeneralComponents/TarjetaBasica';
import { useEffect } from 'react';

const FlujosNavegacion = () => {

    const [flujos, setFlujos] = useState([])
    const [data, setData] = useState([])
    const [openFilter, setOpenFilter] = useState(false);
    
    async function getFlujos() {
        const resFlujos = await fetch(process.env.HOST_NAME + '/bitacora/flujosNavegacion')
        const flujosJson = await resFlujos.json()
        setFlujos(flujosJson)
        setData(flujosJson)
        normalizarLista(flujosJson)
    }

    useEffect(() => {
        getFlujos()
    }, [])


    const refresh = () => {
        getFlujos()
    }

    function normalizarLista(data){
        const result = Object.groupBy(data, ({ hashSession }) => hashSession);
        const resultList = Object.entries(result)

        resultList.map((item) => {
            item[1].map((data, index) => {
                item[1][index] = {
                    datoUno: data.flujo,
                    datoDos: data.etiqueta
                }
            })
        })

        return resultList

    }

    function rederLista(lista) {


        return(
            lista.map((item) =>
                <TarjetaBasica titulo={item[0]} contenido={item[1]} />
            )
        )

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
                <div className={`${stylesGeneral.contentFilter}`} style={openFilter ? { height: '150px' } : { height: '18px' }}>
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
                {data.length != 0 ?
                    rederLista(normalizarLista(data))
                    :
                    'Sin resultados'
                }
            </div>
        </div>
    );
}

export default FlujosNavegacion;