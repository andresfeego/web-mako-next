import { useEffect, useState } from "react"
import React from 'react'
import "./BusquedaCat.module.scss"
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import styles from './BusquedaCat.module.scss'
import CloseIcon from '@material-ui/icons/Close';

async function getCategorias(cat) {

    const response = await fetch(process.env.HOST_NAME + '/categoriasCompletas/' + cat)
    const categorias = await response.json()
    return categorias
}


const BusquedaCat = ({ setCategoria, categoria }) => {
    const [categorias, setcategorias] = useState([])
    const [subCategorias1, setsubCategorias1] = useState([])
    const [subCategorias2, setsubCategorias2] = useState([])
    const [listaBusquedaCAt, setlistaBusquedaCAt] = useState([])
    const [busquedaCat, setbusquedaCat] = useState('')
    const [subCategoria1, setsubCategoria1] = useState(0)
    const [subCategoria2, setsubCategoria2] = useState(0)
    const [categoriaEscogida, setcategoriaEscogida] = useState(null)

    useEffect(() => {
        getCategorias('a').then((lista) => {
            setlistaBusquedaCAt(lista)
        })
    }, [])

    useEffect(() => {
        if (categoria == 0) {
            BorrarCat()
        }
    }, [categoria])

    function asignarCategoria(item) {
        setsubCategoria2(item.id)
        setCategoria(item.id)
        setcategoriaEscogida(item)
    }

    function BorrarCat() {
        setsubCategoria2(0)
        setCategoria(0)
        setcategoriaEscogida(null)
        setbusquedaCat('')
    }

    function renderCategoria(item) {
        return (
            <div className={styles.categoria} key={item.id}>
                <div className={styles.textoCategoria}>
                    <span>Categoría principal</span>
                    <h3>{item.nombre}</h3>
                    <span>Subcategoría 1</span>
                    <h4>{item.nombreSub1}</h4>
                    <span>Subcategoría 2</span>
                    <h5>{item.nombreSub2}</h5>
                </div>

                {subCategoria2 == 0 ?
                    <div className={`${styles.btn} ${styles.btnAsignar}`} onClick={() => asignarCategoria(item)} >
                        <CheckIcon />
                    </div>
                    :
                    <div className={`${styles.btn} ${styles.btnCancelar}`} onClick={() => BorrarCat()} >
                        <CloseIcon />
                    </div>
                }

            </div>
        )
    }

    function onChangeCat(event) {
        setbusquedaCat(event.target.value)
        if (event.target.value == '') {
            getCategorias('a').then((lista) => {
                setlistaBusquedaCAt(lista)
            })
        }else{
            getCategorias(event.target.value).then((lista) => {
                setlistaBusquedaCAt(lista)
            })
        }
    }

    return (
        <div className={styles.contCategoria}>

            {subCategoria2 == 0 ?
                <div className={styles.busquedaCat}>
                    <div className={styles.contBarraBusqueda}>
                        <Input  className={styles.inputformBusCat} type="text" placeholder="Busca una categoría" value={busquedaCat} name="busquedaCat" onChange={onChangeCat} />

                    </div>

                    <div className={styles.categoriasSeleccionables}>
                        {listaBusquedaCAt.length != 0 ?
                            listaBusquedaCAt.map((item) => renderCategoria(item))
                            :
                            "Lista vacía"
                        }
                    </div>
                </div>
                :
                renderCategoria(categoriaEscogida)
            }

        </div>
    );
}

export default BusquedaCat;