import styles from './BarraBusquedaEmpresa.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { clearBusqueda, clearCiudad, clearlblCategoria, clearCategoria, saveBusqueda, saveCiudad } from '../../../Inicialized/Actions';
import { connect } from 'react-redux';
import { MaysPrimera } from '../../../Inicialized/GlobalFunctions';
import Cargando from '../../../Inicialized/Cargando';
import Empresa from '../../Contenido/Empresa';

async function getEmpresas(busqueda, ciudad, categoria) {

    const response = await fetch('http://localhost:3020/responseMako/empresas',
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

    var buscarBar

    const [listaCiudades, setLC] = useState(props.municipios)
    const [listaCiudadesOriginal, setLCO] = useState(props.municipios)
    const [busCiudad, setBusCiudad] = useState(props.ciudad)
    const [mostrarAuto, setmostrarAuto] = useState(true)
    const [listaEmpresas, setListaEmpresas] = useState(props.empresas)

    const [busquedaB, setBusqueda] = useState(props.busqueda)

    function onSubmitCiudad(ciudad) {
        props.saveCiudad(ciudad);
        setBusCiudad(ciudad)
        setmostrarAuto(false)

    }

    function onClearCiudad() {
        props.clearCiudad();
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
        props.saveBusqueda(busquedaB);
    }

    function onClear() {
        props.clearBusqueda();
        setBusqueda('')
    }

    function onChange(e) {
        setBusqueda(e.target.value)
    }


    useEffect(() => {
        setBusqueda(props.busqueda)
    }, [props.busqueda])

    useEffect(() => {
        setBusCiudad(props.ciudad)
    }, [props.ciudad])

    useEffect(() => {
        getEmpresas(props.busqueda, props.ciudad, 0).then((response) => {
            setListaEmpresas(response); // sets ariaInfo state
        })
    }
        , [props.busqueda, props.ciudad]
    );

    let estiloBuscando = { height: '0.1vw' }
    if (props.busqueda != '' || props.ciudad != '') {
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

                <Link href="/directorioempresarial">
                    <img className={styles.logoMako} src={require('../../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.png')} alt="Mako directorio comercial" />
                </Link>

                <div className={styles.barra}>
                    <input type="text" placeholder="Que buscas ?" className={styles.buscar} onKeyDown={handleKeyDown} value={busquedaB} onChange={onChange}></input>
                    {props.busqueda === '' ?
                        <div className={styles.botonBuscar} onClick={() => onSubmit()} > <BtnSearch style={{ width: '95%', height: '95%' }} /></div>
                        :
                        <div className={styles.botonBuscar} onClick={() => onClear()} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
                    }

                </div>

                <div className={styles.busquedaCiudad}>
                    <input type="text" placeholder="En que ciudad lo buscas ?" className={styles.buscarCiudad} onKeyDown={handleKeyDownCiudad} name="busCiudad" value={busCiudad} onChange={onChangeCiudad}></input>
                    {props.ciudad === '' ?
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
                {props.busqueda != '' || props.ciudad != '' ?
                    renderListaEmpresas(listaEmpresas)
                    :
                    null
                }
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda,
        ciudad: state.ciudad,
    }
}

const mapDispatchToProps = {
    clearBusqueda: clearBusqueda,
    clearlblCategoria: clearlblCategoria,
    clearCategoria: clearCategoria,
    clearCiudad: clearCiudad,
    saveBusqueda: saveBusqueda,
    saveCiudad: saveCiudad,
}


export default connect(mapStateToProps, mapDispatchToProps)(BarraBusquedaEmpresa);
