import React from 'react';

import { Button, Input } from '@mui/material';
import styles from '../../Solara/CrearEmpresa/CrearEmpresa.module.scss';

const CrearEmpresa = () => {
    return (

        <div className={styles.general}>
            <p className={styles.texto}>LOGO</p>
            <Input name='nombre' className={styles.texto}></Input>
            <p className={styles.texto}>NOMBRE</p>
            <Input name='celular' className={styles.texto}></Input>
            <p className={styles.texto}>SLOGAN</p>
            <Input name='correo' className={styles.texto}></Input>
            <p className={styles.texto}>DESCRIPCION</p>
            <Input name='genero' className={styles.texto}></Input>
            <p className={styles.texto}>DIRECCION</p>
            <Input name='CONTRASEÑA' className={styles.texto}></Input>
            <p className={styles.texto}>TELEFONO</p>
            <Input name='CONTRASEÑA' className={styles.texto}></Input>
            <p className={styles.texto}>CORREOS</p>
            <Input name='CONTRASEÑA' className={styles.texto}></Input>
            <p className={styles.texto}>MUNICIPIO</p>
            <Input name='CONTRASEÑA' className={styles.texto}></Input>
            <div></div>
            <Button title='REGISTRAR' className={styles.texto}>REGISTRAR</Button>
        </div>

    );
}

export default CrearEmpresa;