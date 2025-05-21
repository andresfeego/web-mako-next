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
  return response;
}

export async function saveBit(data) {
  console.log(data);
  const response = await setDB('/bitacora/nuevoEvento', data);
  return response;
}

export async function logoutUsuario() {
  return await setDB('/usuario/logout', { method: 'POST' });
}

export async function guardarRolesUsuario(idUsuario, roles) {
  return await setDB('/usuario/actualizarRolesUsuario', {
    method: 'POST',
    body: { idUsuario, roles }
  });
}

// Crear una nueva interfaz (slug + descripción + tipo)
export async function crearUiPermission(slug, descripcion, id_tipo) {
  return await setDB('/interface/crearUiPermission', {
    method: 'POST',
    body: { slug, descripcion, id_tipo }
  });
}

// Asignar o actualizar permisos (ui_permissions) a un rol específico
export async function actualizarUiPermissionsRol(idRol, permisos) {
  return await setDB('/interface/actualizarUiPermissionsRol', {
    method: 'POST',
    body: { idRol, permisos }
  });
}

export async function actualizarRolesDeUiPermission(idUiPermission, roles) {
  return await setDB('/interface/actualizarRolesDeUiPermission', {
    method: 'POST',
    body: { idUiPermission, roles }
  });
}

export async function actualizarUiPermission(id, descripcion, id_tipo) {
  return await setDB('/interface/actualizarUiPermission', {
    method: 'POST',
    body: { id, descripcion, id_tipo }
  });
}

export async function eliminarUiPermission(id) {
  return await setDB(`/interface/eliminarUiPermission/${id}`, {
    method: 'DELETE'
  });
}