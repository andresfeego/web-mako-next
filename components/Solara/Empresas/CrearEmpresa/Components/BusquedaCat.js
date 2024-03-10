import { useEffect, useState } from "react"
import React from 'react'
import "./BusquedaCat.module.scss"
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';



async function getCategorias(cat) {

    const response = await fetch(process.env.HOST_NAME + '/categoriasCompletas/' + cat)
    const categorias = await response.json()
    return categorias
}


const BusquedaCat = ({setCategoria}) => {
    const [categorias, setcategorias] = useState([])
    const [subCategorias1, setsubCategorias1] = useState([])
    const [subCategorias2, setsubCategorias2] = useState([])
    const [listaBusquedaCAt, setlistaBusquedaCAt] = useState([])
    const [busquedaCat, setbusquedaCat] = useState('')
    const [subCategoria1, setsubCategoria1] = useState(0)
    const [subCategoria2, setsubCategoria2] = useState(0)
    const [categoriaEscogida, setcategoriaEscogida] = useState(null)

    useEffect(() => {
        //setlistaBusquedaCAt(getCategorias('a'))
        getCategorias('a').then((lista) => {
            setlistaBusquedaCAt(lista)
        })
    }, [])

    function getCategoriasBusqueda(busqueda) {
        getCategorias(busqueda).then((lista) => {
            setlistaBusquedaCAt(lista)
        })
    }


    function asignarCategoria(item) {
        setsubCategoria2(item.id)
        setCategoria(item.id)
        setcategoriaEscogida(item)
    }

    function BorrarCat() {
        setsubCategoria2(0)
        setCategoria(0)
        setcategoriaEscogida(null)
    }

    function renderCategoria(item) {
        return (
            <div className="contCategoria" key={item.id}>
                <div className="categoria">
                    <div>
                        <span className="labelCat"> Categoría: </span> <br className="saltoLineaCat" />{item.nombre}
                    </div>

                    <div>
                        <span className="labelCat"> Subcategoria 1: </span><br className="saltoLineaCat" />{item.nombreSub1}
                    </div>

                    <div>
                        <span className="labelCat"> Subcategoria 2: </span><br className="saltoLineaCat" />{item.nombreSub2}
                    </div>

                    {subCategoria2 == 0 ?
                        <div className="btnCat btnAsignar" onClick={() => asignarCategoria(item)} >Asignar</div>
                        :
                        <CancelIcon style={{ fontSize: 40 }} className="btnCat btnBorrar" onClick={() => BorrarCat()} />
                    }

                </div>


            </div>
        )
    }

    function onChangeCat(event) {
        setbusquedaCat(event.target.value)
    }

    return (
        <div className="PasoCincoContainer">
            <form noValidate className="formularioRegistroEmp">
                <div className="selectDepertamentos">


                    {subCategoria2 == 0 ?
                        <div className="busquedaCat">
                            <div className="contBarraBusqueda">
                                <div className="barraBusqueda">
                                    <Input className="inputformBusCat" type="text" placeholder="Busca una categoría" value={busquedaCat} name="busquedaCat" onChange={onChangeCat} />
                                </div>
                                <div className="iconBuscar">
                                    <SearchIcon onClick={() => getCategoriasBusqueda(busquedaCat)} />
                                </div>

                            </div>

                            <div className="categoriasSeleccionables">
                                {listaBusquedaCAt.length != 0 ?
                                    listaBusquedaCAt.map((item) => renderCategoria(item))
                                    :
                                    "Lista vacía"
                                }
                            </div>
                        </div>
                        :
                        [
                            renderCategoria(categoriaEscogida),
                            <br />
                        ]
                    }

                </div>


            </form>


        </div>
    );
}

export default BusquedaCat;