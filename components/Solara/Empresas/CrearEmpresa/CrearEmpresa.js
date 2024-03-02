import React, { useState, useRef } from 'react';
import stylesGeneral from '../../Listas.module.scss';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import styles from './CrearEmpresa.module.scss';
import { Button, TextField } from '@mui/material';
import generaCodigo from "../../../Inicialized/GlobalFunctions";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import request from 'superagent';

const CrearEmpresa = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [nombre, setNombre] = useState('');
  const [slogan, setSlogan] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [codigo, setCodigo] = useState('');
  const imgRef = useRef(null);

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = image => {
    imgRef.current = image;
  };

  const onCropChange = crop => {
    setCrop(crop);
  };

  const makeClientCrop = async crop => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop, 'newFile.jpeg');
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(croppedImageUrl);
        const url = window.URL.createObjectURL(blob);
        resolve(url);
      }, 'image/jpeg');
    });
  };

  const handleRegistrar = () => {
    alert(`
      Nombre: ${nombre}
      Slogan: ${slogan}
      Descripción: ${descripcion}
      Dirección: ${direccion}
      Teléfono: ${telefono}
      Correo: ${correo}
      Municipio: ${municipio}
      Código: ${codigo}
    `);
  };

  return (
    <div className={`${stylesGeneral.lista}`}>
      <span className={`${stylesGeneral.title}`}>Crear empresa</span>
      <div className="containerCrop">
        <div className={styles.general}>
          <form>
            <p className={styles.texto}>LOGO</p>
            <input type="file" accept="image/*" className="buttonSelectImage" onChange={onSelectFile} />
          </form>
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
          <TextField id="standard-basic" label="Correo" variant="standard" color="success" onChange={e => setCorreo(e.target.value)} />
          <br />
          <TextField id="standard-basic" label="Municipio" variant="standard" color="success" onChange={e => setMunicipio(e.target.value)} />
          <br />
          <Button title='REGISTRAR' className={styles.texto} onClick={handleRegistrar}>REGISTRAR</Button>
        </div>
        <br />
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={makeClientCrop}
            onChange={onCropChange}
          />
        )}
        {croppedImageUrl && (
          <div>
            <span className="descripcionDos">Así se verá tu logo en el perfil</span>
            <img loading="lazy" alt="Crop" className="cropImage" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearEmpresa;
