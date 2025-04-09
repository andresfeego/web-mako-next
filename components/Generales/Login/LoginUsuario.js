import { Button } from '@material-ui/core';
import styles from './MenuUsuario.module.scss';
import React, { useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LoginMako from './LoginMako';
import { EvBiClickButton } from '../../Inicialized/Bitacora';
import { authProvider } from '../../../services/firebase';
import { FaGoogle } from 'react-icons/fa';
import { nuevoUsuario } from '@/components/Inicialized/data/helpersSetDB';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { usuarioExiste } from '@/components/Inicialized/data/helpersGetDB';



const LoginUsuario = ({setOpen}) => {
 

  const user = useUsuarioStore((state) => state.usuario);
  const setUsuario = useUsuarioStore((state) => state.setUsuario);

  const [menu, setMenu] = React.useState(0);
  const [accion, setAccion] = React.useState(0);

  async function handleAuth(provider) {

    try {

      authProvider(provider).then((user) => {
        if(user){
          usuarioExiste(user.user.email).then((result) => {

            if (result) {
              switch (provider) {
                case 'google':
                  
                  const dataUserGoogle = user._tokenResponse
                  const usuarioGoogle = {
                    id: result.id,
                    nombre: dataUserGoogle.firstName,
                    apellido: dataUserGoogle.lastName,
                    correo: dataUserGoogle.email,
                    genero: 0
                  }
                  setUsuario(usuarioGoogle.id)
                  setOpen(false)
                  
                  break;

                  case 'facebook':
                  
                  const dataUserFacebook = user._tokenResponse
                  const usuarioFacebook = {
                    id: result.id,
                    nombre: dataUserFacebook.firstName,
                    apellido: dataUserFacebook.lastName,
                    correo: dataUserFacebook.email,
                    genero: 0
                  }
                  setUsuario(usuarioFacebook.id)
                  setOpen(false)
                  
                  break;
              
                default:
                  break;
              }
            } else {
              switch (provider) {
                case 'google':
                  
                  const dataUserGoogle = user._tokenResponse
                  nuevoUsuario(dataUserGoogle.firstName, dataUserGoogle.lastName, dataUserGoogle.email, '', 0, user.user.uid, '').then((result) => {
                    const usuarioGoogle = {
                      id: result,
                      nombre: dataUserGoogle.firstName,
                      apellido: dataUserGoogle.lastName,
                      correo: dataUserGoogle.email,
                      genero: 0
                    }
                    setUsuario(usuarioGoogle.id)
                    setOpen(false)
                  })
                  
                  break;

                  case 'facebook':
                  
                  const dataUserFacebook = user._tokenResponse
                  nuevoUsuario(dataUserFacebook.firstName, dataUserFacebook.lastName, dataUserFacebook.email, '', 0, '', user.user.uid).then((result) => {
                    const usuarioFacebook = {
                      id: result,
                      nombre: dataUserFacebook.firstName,
                      apellido: dataUserFacebook.lastName,
                      correo: dataUserFacebook.email,
                      genero: 0
                    }
                    setUsuario(usuarioFacebook.id)
                    setOpen(false)
                  })
                  
                  break;
              
                default:
                  break;
              }

            }
          })
       }
      }).catch((err) => {
        console.log(err)
      })



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
            }} ><FaGoogle /> <span>Google</span></Button>

            {/* <Button className={styles.button} title='Continuar con Facebook' onClick={() => {
              EvBiClickButton('Menu pincipal', 'Iniciar Sesion Facebook')
              handleAuth('facebook') 
            }}> <FacebookOutlinedIcon /> <span>Facebook</span></Button> */}

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
            <LoginMako setOpen={setOpen}/>
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



