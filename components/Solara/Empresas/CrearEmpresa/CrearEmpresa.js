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
  const [categoria, setCategoria] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [municipio, setMunicipio] = useState('');

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
      if (nombre == '') reject('Falta nombre')
      if (slogan == '') reject('Falta slogan')
      if (descripcion == '') reject('Falta descripcion')
      if (direccion == '') reject('Falta direccion')
      if (telefono == '') reject('Falta telefono')
      if (correo == '') reject('Falta correo')
      if (busIdCiudad == 0) reject('Falta municipio')
      if (idCat == 0) reject('Falta categoría')
      if (croppedImage == '') reject('Falta logo')
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
      tagsText
    }
    crearEmpresaBasica(data).then(() => {
      nuevoMensaje(tiposAlertas.success, 'Empresa guardada')
    }).catch((err) => {
      nuevoMensaje(tiposAlertas.error, 'Error: ' + err)
    })
  }



  const handleRegistrar = () => {
    validador().then(() => {
      uploadLogo(imageResult).then((response) => {
        guardar(response.codigo, response.image.originalname.split('.').pop())
      }).catch((err) => {
        nuevoMensaje(tiposAlertas.error,'Error: ' + err)
      })

    }).catch((err) => {
      nuevoMensaje(tiposAlertas.error,'Error: ' + err)
    })
  };

  return (
    <div className={`${stylesGeneral.lista}`}>
      <span className={`${stylesGeneral.title}`}>Crear empresa</span>
      <div className={styles.general}>
        <div className={styles.containerCrop}>
          <form>
            <p className={styles.texto}>LOGO</p>
            <input type="file" accept="image/*" className="buttonSelectImage" onChange={onSelectFile} />
          </form>

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
                <Button onClick={showCroppedImage} variant="contained" color="primary" classes={{ root: styles.cropButton }}>
                  Terminar
                </Button>
              </div>
            </div>
          }

          {croppedImage && (
            <div>
              <span className="descripcionDos">Así se verá tu logo en el perfil</span>
              <img loading="lazy" alt="Crop" className={styles.cropImage} style={{ maxWidth: '100%' }} src={croppedImage} />
              <Button onClick={onClose} variant="contained" color="primary" classes={{ root: styles.cropButton }}>
                  Recortar
                </Button>
            </div>
          )}
        </div>


        <br />
        <TextField id="standard-basic" label="Nombre" variant="standard" color="success" onChange={e => setNombre(e.target.value)} />
        <br />
        <TextField id="standard-basic" label="Slogan" variant="standard" color="success" onChange={e => setSlogan(e.target.value)} />
        <br />
        <TextField id="standard-basic" label="Descripción" variant="standard" color="success" onChange={e => setDescripcion(e.target.value)} />
        <br />
        <TextField id="standard-basic" label="Dirección" variant="standard" color="success" onChange={e => setDireccion(e.target.value)} />
        <br />
        <TextField id="standard-basic" label="Teléfono" variant="standard" color="success" onChange={e => setTelefono(e.target.value)} />
        <br />
        <TextField id="standard-basic" label="Correo" variant="standard" type="email" color="success" onChange={e => setCorreo(e.target.value)} />
        <br />
        <Tags setTagsText={setTagsText}/>
        <BusquedaCiudad municipios={municipios} setMunicipio={setMunicipio} />
        <br />
        <BusquedaCat setCategoria={setCategoria} />
        <br />

        <Button title='REGISTRAR' className={styles.texto} onClick={handleRegistrar}>REGISTRAR</Button>
      </div>

    </div>
  );
};

export default CrearEmpresa;
