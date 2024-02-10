import styles from './BarraBusquedaEmpresa.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { MaysPrimera } from '../../../Inicialized/GlobalFunctions';
import Cargando from '../../../Inicialized/Cargando';
import Empresa from '../../Contenido/Empresa';
import { useDataContext, useSetDataContext } from '../../../Inicialized/DataProvider';
import Image from 'next/image';

async function getEmpresas(busqueda, ciudad, categoria) {

    const response = await fetch(process.env.HOST_NAME + '/empresas',
        {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                ciudad: ciudad,
                busServicios: busqueda,
                busCategoria: categoria
            })
        })

    if (response.ok) {
        return await response.json()
    } else {
        return null
    }
}



const BarraBusquedaEmpresa = (props) => {

    const data = useDataContext();
    const setData = useSetDataContext();

    var buscarBar

    const [listaCiudades, setLC] = useState(props.municipios)
    const [listaCiudadesOriginal, setLCO] = useState(props.municipios)
    const [busCiudad, setBusCiudad] = useState(data.search.ciudad)
    const [mostrarAuto, setmostrarAuto] = useState(true)
    const [listaEmpresas, setListaEmpresas] = useState(null)

    const [busquedaB, setBusqueda] = useState(data.search.busqueda)

    function onSubmitCiudad(ciudad) {
        setData({search: {...data.search, ciudad: ciudad}})
        setBusCiudad(ciudad)
        setmostrarAuto(false)

    }

    function onClearCiudad() {
        setData({search: {...data.search, ciudad: ''}})
        setBusCiudad('')
    }

    function handleKeyDownCiudad(e) {
        if (e.key === 'Enter') {
            onSubmitCiudad(busCiudad);
        }
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


    function onChangeCiudad(e) {
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
                    listaCiudades.map((item) => <div className={styles.ciudad} onClick={() => { onSubmitCiudad(MaysPrimera(item.nombre)) }}><h1>{MaysPrimera(item.nombre) + " - " + MaysPrimera(item.nombreDep)}</h1></div>)
                )

            }
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    function onSubmit() {
        setData({search: {...data.search, busqueda: busquedaB}})

    }

    function onClear() {
        setData({search: {...data.search, busqueda: ''}})
        setBusqueda('')
    }

    function onChange(e) {
        setBusqueda(e.target.value)
    }


    useEffect(() => {
        setBusqueda(data.search.busqueda)
        setBusCiudad(data.search.ciudad)
        setmostrarAuto(false)
        getEmpresas(data.search.busqueda, data.search.ciudad, 0).then((response) => {
            setListaEmpresas(response); // sets ariaInfo state
        })
    }, [data])


    let estiloBuscando = { height: '0.1vw' }
    if (data.search.busqueda != '' || data.search.ciudad != '') {
        estiloBuscando = { height: '11vw' }
    }



    function renderListaEmpresas(listaempresas) {
        return (
            listaempresas.map((empresa) => <div className={styles.empresaPeque} ><Empresa key={empresa.codigo} empresa={empresa} /></div>)
        )
    }


    return (
        <div className={styles.barraBusqueda}>
            <div className={styles.panelBusqueda}>

                <Link href="/directorio-empresarial" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆">
                    <div>
                        <Image width={0} height={0} sizes="100vw" className={styles.logoMako} src={require('../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.png')} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                    </div>
                </Link>

                <div className={styles.barra}>
                    <input type="text" placeholder="Que buscas ?" className={styles.buscar} onKeyDown={handleKeyDown} value={busquedaB} onChange={onChange}></input>
                    {data.search.busqueda === '' ?
                        <div className={styles.botonBuscar} onClick={() => onSubmit()} > <BtnSearch style={{ width: '95%', height: '95%' }} /></div>
                        :
                        <div className={styles.botonBuscar} onClick={() => onClear()} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
                    }

                </div>

                <div className={styles.busquedaCiudad}>
                    <input type="text" placeholder="En que ciudad lo buscas ?" className={styles.buscarCiudad} onKeyDown={handleKeyDownCiudad} name="busCiudad" value={busCiudad} onChange={onChangeCiudad}></input>
                    {data.search.ciudad === '' ?
                        <div className={styles.botonBuscar} onClick={() => onSubmitCiudad(busCiudad)} > <BtnSearch style={{ width: '90%', height: '90%' }} /></div>
                        :
                        <div className={styles.botonBuscar} onClick={() => onClearCiudad()} > <BtnClose style={{ width: '85%', height: '85%' }} /></div>
                    }
                    {busCiudad != '' && mostrarAuto ?
                        <div className={styles.autocompletado}>
                            {renderBusqueda()}
                        </div> :
                        null
                    }

                </div>

            </div>

            <div className={styles.panelResultados} style={estiloBuscando}>
                {listaEmpresas != null ?
                    renderListaEmpresas(listaEmpresas)
                    :
                    null
                }
            </div>

        </div>
    )
}

export default BarraBusquedaEmpresa;
