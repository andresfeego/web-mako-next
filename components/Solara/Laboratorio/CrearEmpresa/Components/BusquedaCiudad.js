import { useState, useEffect } from 'react'
import styles from './BusquedaCiudad.module.scss'
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import request from 'superagent';
import Cargando from '../../../../Inicialized/Cargando';
import { MaysPrimera } from '../../../../Inicialized/GlobalFunctions';
import { useDataContext, useSetDataContext } from '../../../../Inicialized/DataProvider';
import { EvBiBusqueda } from '../../../../Inicialized/Bitacora';




const BusquedaCiudad = ({municipios, setMunicipio, ciudadInicial}) => {

    const data = useDataContext();
    const setData = useSetDataContext();

    var buscarBar

    const [listaCiudades, setLC] = useState(municipios)
    const [listaCiudadesOriginal, setLCO] = useState(municipios)
    const [busCiudad, setBusCiudad] = useState(ciudadInicial)
    const [mostrarAuto, setmostrarAuto] = useState(true)

    useEffect(() =>{
        fetch(process.env.HOST_NAME + '/listaMunicipios')
        .then((res) => res.json())
        .then((data) =>{
            setLC(data)
            setLCO(data)
        })
    
    }, [])

    useEffect(() =>{
        if (ciudadInicial == 0) {
            setBusCiudad('')
            setMunicipio(0)
        }
    
    }, [ciudadInicial])

        function onSubmit(ciudad, id) {
            setBusCiudad(ciudad)
            setMunicipio(id)
            setmostrarAuto(false)
        }

    function onClear() {
        setBusCiudad('')
        setMunicipio(0)
    }



    function buscar(busqueda) {
        setLC("init")

        if (busqueda == "") {

            setLC(listaCiudadesOriginal)

        } else {
            var prepBus = new RegExp(busqueda, 'i'); // preparando termino de busqueda
            let Auxi = listaCiudadesOriginal.filter((item) => {
                if (prepBus.test(item.nombre) || prepBus.test(item.nombreDep)) {
                    return true
                } else {
                    return false
                }
            });
            if (Auxi.length == 0) {
                Auxi = []
            }
            setLC(Auxi)

        }
    }


    function onChange(e) {
        setmostrarAuto(true)
        clearTimeout(buscarBar)
        var value = e.target.value
        setBusCiudad(value)

        buscarBar = setTimeout(() => buscar(value), 500);
    }

    function renderBusqueda() {
        if (listaCiudades == "init") {
            return <Cargando />
        } else {
            if (listaCiudades.length == 0) {
                return <span>sin resultados</span>
            } else {

                return (
                    listaCiudades.map((item) => <div className={styles.ciudad} onClick={() => { onSubmit(MaysPrimera(item.nombre), item.id) }}><h1>{MaysPrimera(item.nombre) + " - " + MaysPrimera(item.nombreDep)}</h1></div>)
                )

            }
        }
    }

    useEffect(() => {
        setmostrarAuto(false)
    }, [data])


    return (
        <div className={styles.busquedaCiudad}>
            <input type="text" placeholder="Ciudad"  className={styles.buscarCiudad}  name="busCiudad" value={busCiudad} onChange={onChange}></input>
           
            {busCiudad != '' && mostrarAuto ?
                <div className={styles.autocompletado}>
                    {renderBusqueda()}
                </div> :
                null
            }

        </div>
    )
}

export default BusquedaCiudad;

