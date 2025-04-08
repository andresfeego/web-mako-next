import { setDB } from './SetDb';


export async function crearEmpresaBasica(data) {
  await setDB('/crearEmpresaBasica', data);
}

export async function uploadLogo(image) {
  const formData = new FormData();
  formData.append('image', image);

  const response = await setDB('/uploadLogo', formData);
  return response;
}

export async function nuevoUsuario(nombre, apellido, correo, pass, genero, tkgoogle, tkfacebook) {
  const data = { nombre, apellido, correo, pass, genero, tkgoogle, tkfacebook };
  const response = await setDB('/usuario/nuevoUsuario', data);
  return response?.insertId;
}

export async function saveBit(data) {
  console.log(data);
  const response = await setDB('/bitacora/nuevoEvento', data);
  return response;
}