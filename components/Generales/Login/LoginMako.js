
import { Box, Button, Input, TextField } from '@mui/material';
import styles from './LoginMako.module.scss';
import React from 'react';
import { EvBiClickButton } from '../../Inicialized/Bitacora';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';






const LoginMako = (props) => {
  const [menu, setMenu] = React.useState(0);


  

function renderContenido(menu) {

  switch (menu) {
    case 0:
      return (
        <div className={styles.container}>

          <img className={styles.logoMako} src={require('../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.webp')} alt="" />
          <Box
            component="form"
            className={styles.fomrulario}
            noValidate
            autoComplete="off"
          >
            <TextField id="correo" label="Correo" variant="standard" />
            <TextField id="password" label="Contraseña" type='password' variant="standard" />
            <Button title='GUARDAR' className={styles.guardar} onClick={() => { EvBiClickButton('Menu pincipal', 'Boton login Mako'); handleOpen() }} > Iniciar Sesión</Button>
          </Box>

        <div className={styles.separador}/>
        <div className={styles.creaCuenta} onClick={()=> setMenu(1)}>Crear cuenta</div>

        </div>
      )

      break;

      case 1:
        return (
          <div className={styles.container}>
  
            <img className={styles.logoMako} src={require('../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.webp')} alt="" />
            <Box
              component="form"
              className={styles.fomrulario}
              noValidate
              autoComplete="off"
            >
              <TextField id="correo" label="Nombres" variant="standard" />
              <TextField id="correo" label="Apellidos" variant="standard" />
              <TextField id="correo" label="Correo" variant="standard" />
              <TextField id="password" label="Contraseña" type='password' variant="standard" />
              <TextField id="password" label="Confirmación de contraseña" type='password' variant="standard" />
              <TextField id="correo" type='text' label="Genero" variant="standard" />
              <Button title='GUARDAR' className={styles.guardar} onClick={() => { EvBiClickButton('Menu pincipal', 'Boton login Mako'); handleOpen() }} >Crear cuenta</Button>
            </Box>
  
          </div>
        )
      break;

    default:
      break;
  }

}

  return (
    <div className={styles.contentLogin}>
      {renderContenido(menu)}
    </div>


  );
}



export default LoginMako;



