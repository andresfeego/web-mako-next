
import { Button, Input } from '@mui/material';
import styles from '../../Home/Header/MenuUsuario.module.scss';
import React from 'react';
import { EvBiClickButton } from '../../Inicialized/Bitacora';






const RegistroMako = (props) => {
    const [open, setOpen] = React.useState(false);
    function handleOpen() {
        setOpen(true);
    };
    function handleClose() {
        setOpen(false);
    };

    return (


        <div className={styles.contentRegistrar}>
            <p className={styles.texto}>NOMBRE</p>
            <Input name='nombre' className={styles.formulario}></Input>
            <p className={styles.texto}>CELULAR</p>
            <Input name='celular' className={styles.formulario}></Input>
            <p className={styles.texto}>CORREO</p>
            <Input name='correo' className={styles.formulario}></Input>
            <p className={styles.texto}>GENERO</p>
            <Input name='genero' className={styles.formulario}></Input>
            <p className={styles.texto}>CONTRASEÑA</p>
            <Input name='CONTRASEÑA' className={styles.formulario}></Input>
            <p className={styles.texto}>REPETIR CONTRASEÑA</p>
            <Input name='CONTRASEÑA' className={styles.formulario}></Input>
            
            <Button title='REGISTRAR' className={styles.guardar} onClick={() => { EvBiClickButton('Menu pincipal', 'Boton Registrar Persona'); handleOpen() }} > REGISTRAR</Button>
        </div>

    );
}



export default RegistroMako;



