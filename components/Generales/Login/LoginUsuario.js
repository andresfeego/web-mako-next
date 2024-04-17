import { Button } from '@mui/material';
import styles from './MenuUsuario.module.scss';
import React, { useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LoginMako from './LoginMako';
import RegistroMako from './RegistroMako';
import { EvBiClickButton } from '../../Inicialized/Bitacora';
import { authProvider } from '../../../services/firebase';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';




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

  async function handleAuth(provider) {

    try {

      const user = await authProvider(provider)
      console.log(user)

    } catch (error) {
      console.warn(error)
    }

  }

  function RenderContenido() {

    switch (menu) {
      case 0:
        return (
          <div className={styles.buttons} >

            <span className={styles.continuar}>Continuar con</span>
            <Button className={styles.button} title='Continuar con Google' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Iniciar Sesion Google')
              handleAuth('google')
            }} ><GoogleIcon /> <span>Google</span></Button>

            <Button className={styles.button} title='Continuar con Facebook' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Iniciar Sesion Facebook')
              authProvider('facebook')
            }}> <FacebookOutlinedIcon /> <span>Facebook</span></Button>

            <Button className={styles.button}  title='Continuar con Mako' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Iniciar Sesion Mako')
              setMenu(1)

            }
            }> <img src={require('../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_150x150.webp')} alt="" /> <span>Mako</span> </Button>

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
            <LoginMako />
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



