
import { Box, Button, MenuItem, Select, InputLabel, TextField, FormControl, FormHelperText } from '@mui/material';
import styles from './LoginMako.module.scss';
import React from 'react';
import { EvBiClickButton } from '../../Inicialized/Bitacora';
import { apellido, confirContrasena, contrasena, correo, genero, nombre } from "../../Inicialized/CamposForm";
import { onChangeHandler, validaErrosForm } from '../../Inicialized/HandleForms';
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';
import { nuevoUsuario } from '@/components/Inicialized/data/helpersSetDB';
import { loginUsuario } from '@/components/Inicialized/data/helpersGetDB';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';





const LoginMako = ({ setOpen}) => {
  const [menu, setMenu] = React.useState(0);
  const [inputCorreo, setCorreo] = React.useState({...correo, creando: true});
  const [inputContrasena, setContrasena] = React.useState(contrasena);
  const [inputConfirContrasena, setConfirContrasena] = React.useState(confirContrasena);
  const [inputNombre, setNombre] = React.useState(nombre);
  const [inputApellido, setApellido] = React.useState(apellido);
  const [inputGenero, setGenero] = React.useState(genero);
  const setUsuario = useUsuarioStore((state) => state.setUsuario);


  function validaErros() {
    return new Promise((resolve, reject) => {

      const inputsForm = [
        {input: inputCorreo, setInpu: setCorreo},
        {input: inputContrasena, setInpu: setContrasena},
        {input: {...inputConfirContrasena, valuePassOrigin: inputContrasena.value}, setInpu: setConfirContrasena},
        {input: inputNombre, setInpu: setNombre},
        {input: inputApellido, setInpu: setApellido},
        {input: inputGenero, setInpu: setGenero},
      ]

      validaErrosForm(inputsForm).then((result) => {

        resolve()
      }).catch((err) => {
        reject()
      })
    })
  }

  function crearCuenta() {
    return new Promise((resolve, reject) => {
      nuevoUsuario(inputNombre.value, inputApellido.value, inputCorreo.value, inputContrasena.value, inputGenero.value, '', '' ).then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  function validaErrorLogin(){
    return new Promise((resolve, reject) => {

      const inputsForm = [
        {input: inputCorreo, setInpu: setCorreo},
        {input: inputContrasena, setInpu: setContrasena}

      ]

      validaErrosForm(inputsForm).then((result) => {

        resolve()
      }).catch((err) => {

        reject()
      })
    })
  }

  function login(){
    return new Promise((resolve, reject) => {
      loginUsuario(inputCorreo.value, inputContrasena.value).then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  function handleLogin(){
    nuevoMensaje(tiposAlertas.cargando, 'Validando credenciales')
    validaErrorLogin().then((result) => {
      login().then((result) => {
       if(result.error){
        nuevoMensaje(tiposAlertas.cargadoError, result.message)
       }else{
        const usuario = {
          id: result.id,
          nombre: result.nombres,
          apellido: result.apellidos,
          correo: result.correo,
          genero: result.genero
        }
        setUsuario(usuario.id) 
        setOpen(false)
        nuevoMensaje(tiposAlertas.cargadoSuccess, 'Credenciales correctas')
       }
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) =>{
      nuevoMensaje(tiposAlertas.cargadoError, 'Verificar credenciales ingresadas')
    })
  }

  function submit() {
    nuevoMensaje(tiposAlertas.cargando, 'Creando cuenta de usuario')
    validaErros().then(() => {
      crearCuenta().then((result) => {
        const usuario = {
          id: result,
          nombre: inputNombre.value,
          apellido: inputApellido.value,
          correo: inputCorreo.value,
          genero: inputGenero.value
        }
        setUsuario(usuario.id) 
        setOpen(false)
        nuevoMensaje(tiposAlertas.cargadoSuccess, 'Cuenta creada de forma exitosa')
      }).catch((err) => {
        nuevoMensaje(tiposAlertas.cargadoError, err)
      }
      )
    }).catch((err) => {
      nuevoMensaje(tiposAlertas.cargadoError, 'Faltan datos obligatorios')
    })
  }

  function renderContenido(menu) {
  
    switch (menu) {
      case 0:
        if(inputCorreo.creando){
          setCorreo({...inputCorreo, creando: false})
        }
        return (
          <div className={styles.container}>

            <img className={styles.logoMako} src={require('../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.webp')} alt="" />
            <Box
              component="form"
              className={styles.fomrulario}
              noValidate
              autoComplete="off"
            >
              <TextField
                id={inputCorreo.name}
                label={inputCorreo.label}
                onChange={(e) => { onChangeHandler(inputCorreo, setCorreo, e.target.value, false) }}
                onBlur={(e) => { onChangeHandler(inputCorreo, setCorreo, e.target.value, false, true) }}
                variant="standard"
                value={inputCorreo.value}
                error={inputCorreo.error}
                helperText={inputCorreo.errorText}
              />

              <TextField
                id={inputContrasena.name}
                label={inputContrasena.label}
                onChange={(e) => { onChangeHandler(inputContrasena, setContrasena, e.target.value, false) }}
                onBlur={(e) => { onChangeHandler(inputContrasena, setContrasena, e.target.value, false, true) }}
                variant="standard"
                value={inputContrasena.value}
                error={inputContrasena.error}
                type='password'
                helperText={inputContrasena.errorText}
              />

              <Button title='Iniciar sesión' className={styles.guardar} onClick={() => { EvBiClickButton('Menu pincipal', 'Boton login Mako'); handleLogin() }} > Iniciar Sesión</Button>
            </Box>

            <div className={styles.separador} />
            <div className={styles.creaCuenta} onClick={() => setMenu(1)}>Crear cuenta</div>

          </div>
        )

        break;

      case 1:
        return (
          <div className={styles.container}>

            <img className={styles.logoMako} src={require('../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.webp')} alt="" />
            <Box
              component="form"
              id='form_registro'
              className={styles.fomrulario}
              noValidate
              sx={{ minWidth: 250 }}
              autoComplete="nope"
            >
              <TextField
                id={inputCorreo.name}
                label={inputCorreo.label}
                onChange={(e) => { onChangeHandler(inputCorreo, setCorreo, e.target.value, false) }}
                onBlur={(e) => { onChangeHandler(inputCorreo, setCorreo, e.target.value, false, true) }}
                variant="standard"
                value={inputCorreo.value}
                error={inputCorreo.error}
                helperText={inputCorreo.errorText}
              />

              <TextField
                id={inputContrasena.name}
                label={inputContrasena.label}
                onChange={(e) => { onChangeHandler(inputContrasena, setContrasena, e.target.value, false) }}
                onBlur={(e) => { onChangeHandler(inputContrasena, setContrasena, e.target.value, false, true) }}
                variant="standard"
                value={inputContrasena.value}
                error={inputContrasena.error}
                type='password'
                helperText={inputContrasena.errorText}
              />

              <TextField
                id={inputConfirContrasena.name}
                label={inputConfirContrasena.label}
                onChange={(e) => { onChangeHandler({...inputConfirContrasena, valuePassOrigin: inputContrasena.value}, setConfirContrasena, e.target.value, false, false) }}
                onBlur={(e) => { onChangeHandler({...inputConfirContrasena, valuePassOrigin: inputContrasena.value}, setConfirContrasena, e.target.value, false, true) }}
                variant="standard"
                value={inputConfirContrasena.value}
                error={inputConfirContrasena.error}
                type='password'
                helperText={inputConfirContrasena.errorText}
              />

              <TextField
                id={inputNombre.name}
                label={inputNombre.label}
                onChange={(e) => { onChangeHandler(inputNombre, setNombre, e.target.value, false) }}
                onBlur={(e) => { onChangeHandler(inputNombre, setNombre, e.target.value, false, true) }}
                variant="standard"
                value={inputNombre.value}
                error={inputNombre.error}
                helperText={inputNombre.errorText}
              />

              <TextField
                id={inputApellido.name}
                label={inputApellido.label}
                onChange={(e) => { onChangeHandler(inputApellido, setApellido, e.target.value, false) }}
                onBlur={(e) => { onChangeHandler(inputApellido, setApellido, e.target.value, false, true) }}
                variant="standard"
                value={inputApellido.value}
                error={inputApellido.error}
                helperText={inputApellido.errorText}
              />

              <FormControl fullWidth error={inputGenero.error}>
                <InputLabel id={inputGenero.name}>Genero</InputLabel>
                <Select
                  variant="standard"
                  labelId={inputGenero.name}
                  id={inputGenero.name}
                  value={inputGenero.value}
                  label="Generodd"
                  onChange={(e) => { onChangeHandler(inputGenero, setGenero, e.target.value, false) }}
                  onBlur={(e) => { onChangeHandler(inputGenero, setGenero, e.target.value, false, true) }}
                  error={inputGenero.error}

                >
                  {inputGenero.selectValues.length > 0 ? 
                    inputGenero.selectValues.map((item) => <MenuItem value={item['value']}>{item['name']}</MenuItem>)
                :
                <MenuItem value={0}>Sin datos</MenuItem>
                }

                </Select>
                <FormHelperText>{inputGenero.errorText}</FormHelperText>
              </FormControl>
              <Button title='Registrar con mako' className={styles.guardar} onClick={() => { EvBiClickButton('Menu pincipal', 'Boton login Mako'); submit() }} >Crear cuenta</Button>
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



