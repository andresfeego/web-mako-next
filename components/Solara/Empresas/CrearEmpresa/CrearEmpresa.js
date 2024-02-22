import { useState } from 'react';
import stylesGeneral from '../../Listas.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import styles from './CrearEmpresa.module.scss'
import { Button, Input } from '@mui/material';

const CrearEmpresa = () => {

    const [openFilter, setOpenFilter] = useState(false);
    return (
        <div className={`${stylesGeneral.lista}`}>
            <span className={`${stylesGeneral.title}`}>Crear empresa</span>
            
            <div className={styles.general}>
            <p className={styles.texto}>LOGO</p>
            <Input name='nombre' className={[styles.texto, styles.customMuiInput]}></Input>
            <p className={styles.texto}>NOMBRE</p>
            <Input name='celular' className={[styles.texto, styles.customMuiInput]}></Input>
            <p className={styles.texto}>SLOGAN</p>
            <Input name='correo' className={[styles.texto, styles.customMuiInput]}></Input>
            <p className={styles.texto}>DESCRIPCION</p>
            <Input name='genero' className={[styles.texto, styles.customMuiInput]}></Input>
            <p className={styles.texto}>DIRECCION</p>
            <Input name='CONTRASEÑA' className={[styles.texto, styles.customMuiInput]}></Input>
            <p className={styles.texto}>TELEFONO</p>
            <Input name='CONTRASEÑA' className={[styles.texto, styles.customMuiInput]}></Input>
            <p className={styles.texto}>CORREOS</p>
            <Input name='CONTRASEÑA' className={[styles.texto, styles.customMuiInput]}></Input>
            <p className={styles.texto}>MUNICIPIO</p>
            <Input name='CONTRASEÑA' className={[styles.texto, styles.customMuiInput]}></Input>
            <div></div>
            <Button title='REGISTRAR' className={styles.texto}>REGISTRAR</Button>
        </div>

        </div>
    );
}

export default CrearEmpresa;