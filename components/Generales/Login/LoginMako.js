
import { Button, Input } from '@mui/material';
import styles from '../../Home/Header/MenuUsuario.module.scss';
import React from 'react';
import { EvBiClickButton } from '../../Inicialized/Bitacora';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';






const LoginMako = (props) => {
    const [open, setOpen] = React.useState(false);
    function handleOpen() {
        setOpen(true);
    };
    function handleClose() {
        setOpen(false);
    };

    return (
        <div className={styles.contentLogin}>

<FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=> alert('okokok')}
                >
                    <VisibilityOff/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

            <Button title='GUARDAR' className={styles.guardar} onClick={() => { EvBiClickButton('Menu pincipal', 'Boton login Mako'); handleOpen() }} > Iniciar Sesión</Button>
        </div>


    );
}



export default LoginMako;



