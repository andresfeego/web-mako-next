import { Button } from '@mui/material';
import styles from '../../Home/Header/MenuUsuario.module.scss';
import React, { useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LoginMako from './LoginMako';
import RegistroMako from './RegistroMako';
import { EvBiClickButton } from '../../Inicialized/Bitacora';






const LoginUsuario = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [menu, setMenu] = React.useState(0);
  const [accion, setAccion] = React.useState(0);

  const usuario = true;

  useEffect(() => {
    if (usuario) {
      setMenu(0);
    }
    else {
      setMenu(0);
    }
  }, [usuario]);

  function RenderContenido() {

    switch (menu) {
      case 0:
        return (
          <div className="buttons">
            <Button title='Iniciar Sesion' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Iniciar Sesion')
              setAccion(0)
              setMenu(1)
            }} > Iniciar Sesión</Button>
            <Button title='Registrarse' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Registrarse')
              setAccion(1)
              setMenu(1)
            }} > Registrarse</Button>
          </div>
        )
        break;


      case 1:
        return (
          <div className="buttons">
            <ArrowBackIcon className='backModal' onClick={() => {
              EvBiClickButton('Menu pincipal', 'atras menu login')
              setMenu(0)
            }} />

            <Button title='GOOGLE' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Iniciar Sesion Google')
              setMenu(2)
            }} > GOOGLE</Button>
            <Button title='FACEBOOK' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Iniciar Sesion Facebook')
              setMenu(3)
            }}> FACEBOOK</Button>
            <Button title='MAKO' onClick={() => {
              if (accion == 0) {
                EvBiClickButton('Menu pincipal', 'Iniciar Sesion Mako')
                setMenu(4)
              } else {
                if (accion == 1) {
                  EvBiClickButton('Menu pincipal', 'Registrarse Mako')
                  setMenu(5)
                }

              }
            }}> MAKO</Button>

          </div>
        )

        break;

      case 2:
        return (
          <div className="buttons">
            <ArrowBackIcon className='backModal' onClick={() => {
              EvBiClickButton('Menu pincipal', 'atras menu login')
              setMenu(1)
            }} />
            <span>GOOGLE</span>
          </div>
        )
        break;


      case 3:
        return (

          <div className="buttons">
            <ArrowBackIcon className='backModal' onClick={() => {
              EvBiClickButton('Menu pincipal', 'atras menu login')
              setMenu(1)
            }} />
            <span>FACEBOOK</span>
          </div>
        )
        break;

      case 4:
        return (
          <div className="buttons">
            <ArrowBackIcon className='backModal' onClick={() => {
              EvBiClickButton('Menu pincipal', 'atras menu login')
              setMenu(1)
            }} />
            <LoginMako />
          </div>
        )
        break;

      case 5:
        return (
          <div className="buttons">
            <ArrowBackIcon className='backModal' onClick={() => {
              EvBiClickButton('Menu pincipal', 'atras menu login')
              setMenu(1)
            }} />
            <RegistroMako />
          </div>
        )
        break;
      case 10:
        return (
          <p>"menu principal"</p>
        )
        break;

      default:
        break;
    }


  }


  return (

    <div className={styles.contentLogin}>

      {RenderContenido()}
    </div>


  );
}



export default LoginUsuario;



