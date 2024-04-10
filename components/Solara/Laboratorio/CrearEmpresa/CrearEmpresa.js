import React, { useState } from 'react';
import stylesGeneral from '../../Listas.module.scss';
import styles from './CrearEmpresa.module.scss';
import { Button, TextField } from '@mui/material';
import BusquedaCiudad, { busIdCiudad } from './Components/BusquedaCiudad'
import BusquedaCat, { idCat } from './Components/BusquedaCat';
import { nuevoMensaje, tiposAlertas } from '../../../Inicialized/Toast'
import { crearEmpresaBasica, uploadLogo } from '../../../Inicialized/GetDB/SetDb';
import Cropper from 'react-easy-crop'
import getCroppedImgURL, { imageResult } from './Components/CropImage'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Tags from './Components/Tags';
import { ImageOutlined, Label } from '@material-ui/icons';
import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';


const CrearEmpresa = ({ municipios }) => {
  const [src, setSrc] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const [nombre, setNombre] = useState('');
  const [slogan, setSlogan] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [categoria, setCategoria] = useState(0);
  const [telefono, setTelefono] = useState('');
  const [wp, setWp] = useState(1);
  const [tipoTelefono, setTipoTelefono] = useState(0);

  const [correo, setCorreo] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [municipio, setMunicipio] = useState(0);

  const [imageRef, setImageRef] = useState(null);



  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => { setSrc(reader.result) });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImgURL(
        src,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  const onClose = () => {
    setCroppedImage(null)
  }

  const onImageLoaded = e => {
    setImageRef(e.target)
  };


  const dataURLtoFile = (dataurl, filename) => {

    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    setCroppedImage(croppedImage)
  }

  function validador() {
    return new Promise((resolve, reject) => {
      if (!imageResult) reject('Falta logo')
      if (nombre == '') reject('Falta nombre')
      if (slogan == '') reject('Falta slogan')
      if (descripcion == '') reject('Falta descripcion')
      if (direccion == '') reject('Falta direccion')
      if (telefono == '') reject('Falta telefono')
      if (correo == '') reject('Falta correo')
      if (municipio == 0) reject('Falta municipio')
      if (categoria == 0) reject('Falta categoría')
      if (tagsText.length == 0) reject('Falta palabras clave')
      resolve()
    })
  }

  function guardar(codigo, ext) {

    const data = {
      codigo,
      ext,
      nombre,
      slogan,
      descripcion,
      direccion,
      categoria,
      telefono,
      correo,
      municipio,
      tagsText,
      wp,
      tipoTelefono
    }
    crearEmpresaBasica(data).then(() => {
      nuevoMensaje(tiposAlertas.success, 'Empresa guardada')
      setNombre('')
      setSlogan('')
      setDescripcion('')
      setDireccion('')
      setTelefono('')
      setWp(1)
      setTipoTelefono(0)
      setCorreo('')
      setTagsText('')

      setSrc(null)
      setCroppedImage(null)

      setCategoria(0)
      setMunicipio(0)

    }).catch((err) => {
      nuevoMensaje(tiposAlertas.error, err)
    })
  }



  const handleRegistrar = () => {

    validador().then(() => {
      uploadLogo(imageResult).then((response) => {
        guardar(response.codigo, response.image.originalname.split('.').pop())
      }).catch((err) => {
        nuevoMensaje(tiposAlertas.error, err)
      })

    }).catch((err) => {
      nuevoMensaje(tiposAlertas.error, err)
    })
  };

  return (
    <div className={`${stylesGeneral.lista}`}>
      <span className={`${stylesGeneral.title}`}>Crear empresa</span>
      <div className={stylesGeneral.contentLista}>
        <form className={styles.formContainer}>
          <div className={styles.containerCrop}>

            <br />
            {src && !croppedImage &&
              <div>
                <div className={styles.cropContainer}>
                  <Cropper
                    image={src}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />

                </div>
                <div className={styles.controls}>
                  <div className={styles.sliderContainer}>
                    <Typography
                      variant="overline"
                    >
                      Zoom
                    </Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={10}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </div>
                  <div className={styles.sliderContainer}>
                    <Typography
                      variant="overline"
                    >
                      Rotation
                    </Typography>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      onChange={(e, rotation) => setRotation(rotation)}
                    />
                  </div>
                  <div onClick={showCroppedImage} className={styles.labelButtonSelectImage} variant="contained" color="primary" >
                    Terminar
                  </div>
                </div>
              </div>

            }

            {!src &&
              <div className={styles.sinLogoContainer}>
                <div className={styles.sinLogo}>
                  <ImageOutlined className={styles.ImageOutlined} />
                </div>
                <label htmlFor="filePicker" className={styles.labelButtonSelectImage} style={{ background: "grey", padding: "5px 10px" }}>
                  Cargar imagen
                </label>
                <input type="file" id='filePicker' accept="image/*" className={styles.buttonSelectImage} onChange={onSelectFile} />
              </div>
            }

            {croppedImage && (
              <div className={styles.containerCropped}>
                <img loading="lazy" alt="Crop" className={styles.cropImage} style={{ maxWidth: '100%' }} src={croppedImage} />
                <div className={styles.buttons}>
                  <div onClick={onClose} variant="contained" color="primary" className={styles.labelButtonSelectImage}>
                    Recortar
                  </div>
                  <div onClick={() => { setSrc(null); setCroppedImage(null) }} variant="contained" color="primary" className={styles.labelButtonSelectImage}>
                    Eliminar
                  </div>
                </div>
              </div>
            )}
          </div>


          <br />
          <TextField id="standard-basic" autoFocus label="Nombre" variant="standard" color="success" value={nombre} onChange={e => setNombre(e.target.value)} />
          <br />
          <TextField id="standard-basic" label="Slogan" variant="standard" color="success" value={slogan} onChange={e => setSlogan(e.target.value)} />
          <br />
          <TextField id="standard-basic" label="Descripción" variant="standard" color="success" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          <br />
          <TextField id="standard-basic" label="Correo" variant="standard" type="email" color="success" value={correo} onChange={e => setCorreo(e.target.value)} />
          <br />
          <TextField id="standard-basic" label="Dirección" variant="standard" color="success" value={direccion} onChange={e => setDireccion(e.target.value)} />
          <br />
          <BusquedaCiudad setMunicipio={setMunicipio} ciudadInicial={municipio} />
          <br />
          <div className={styles.containerTelefono}>

            <TextField id="standard-basic" className={styles.inputTelefono} label="Teléfono" variant="standard" color="success" value={telefono} onChange={e => setTelefono(e.target.value)} />
            <FormGroup row>

              {!tipoTelefono &&
                <FormControlLabel
                  control={
                    <Checkbox checked={wp} onChange={(e) => setWp(e.target.checked)} name="checkedB" />
                  }
                  label="Whatsapp"
                />
              }
              <FormControlLabel
                control={
                  <Checkbox checked={tipoTelefono} onChange={(e) => setTipoTelefono(e.target.checked)} name="checkedB" />
                }
                label="Fijo"
              />

            </FormGroup>
          </div>

          
          <br />
          <Tags setTagsText={setTagsText} tagsIniciales={tagsText}/>
          <br />
          <BusquedaCat setCategoria={setCategoria} categoria={categoria} />
          <br />

          <div className={`${styles.labelButtonSelectImage} ${styles.buttonRegistrar}`} onClick={handleRegistrar}>Registrar empresa</div>
        </form>
      </div>

    </div>
  );
};

export default CrearEmpresa;
