import styles from "./directorioempresarial.module.scss"
import Header from '../components/Home/Header/Header';
import ListaEmpresas from "../components/Home/Contenido/ListaEmpresas";
import request from "superagent";
import { connect } from 'react-redux'
import { clearBusqueda } from '../components/Inicialized/Actions';
import { useState, useEffect } from 'react';
import Filtros from "../components/Home/Contenido/Filtros";


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



const Index = ({ slides, empresas, municipios }) => {

    return (
        <div>
            <Header slides={slides} municipios={municipios} />
            <Filtros />
            <ListaEmpresas empresas={empresas} />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    console.log("serversidepropsindex")
    var props = { props: {} }

    const resSlides = await fetch('http://localhost:3020/responseMako/slides')
    const slidesJson = await resSlides.json()
    props.props = { slides: slidesJson }

    const empresas = await getEmpresas("", "", 0)
    props.props = { slides: slidesJson, empresas: empresas }

    const response = await fetch('http://localhost:3020/responseMako/listaMunicipios')
    const responseJson = await response.json()
    props.props = { slides: slidesJson, empresas: empresas, municipios: responseJson }


    return props
}


const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda
    }
}

const mapDispatchToProps = {
    clearBusqueda: clearBusqueda
}


export default connect(mapStateToProps, mapDispatchToProps)(Index);
