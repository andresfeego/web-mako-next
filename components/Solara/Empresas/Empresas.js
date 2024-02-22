import React from 'react';
import stylesTableros from '../Tableros.module.scss'
import styles from './Empresa.module.scss';
import ListaVacia from '../ListaVacia';
import CrearEmpresa from './CrearEmpresa/CrearEmpresa';

const Empresas = () => {
    return (

        <div className={`${styles.crearEmpresa} ${stylesTableros.tablero}`}>
            <CrearEmpresa/>
           
        </div>

    );
}

export default Empresas;