import React from 'react';
import stylesTableros from '../Tableros.module.scss'
import styles from './Empresa.module.scss';
import ListaVacia from '../ListaVacia';
import CrearEmpresa from './CrearEmpresa/CrearEmpresa';

const Empresas = ({municipios}) => {
    return (

        <div className={`${styles.crearEmpresa} ${stylesTableros.tablero}`}>
            <CrearEmpresa municipios={municipios}/>
           
        </div>

    );
}

export default Empresas;