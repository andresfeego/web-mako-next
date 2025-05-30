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

/* =========================================================================
   EMPRESAS · Favoritos
   ======================================================================= */

/**
 * Paso 1 – envío inicial para validar teléfonos o crear empresa rápido.
 * confirm      → false  (si es la primera llamada)
 * confirm      → true   (segunda llamada: crear nueva o marcar favorito)
 */
export async function crearEmpresaRapida(payload) {
  /*
    payload esperado:
    {
      idUsuario:   Number,           // obligatorio
      nombre:      String,           // obligatorio
      telefonos:   [String],         // >=1
      nota:        String,
      notificar:   0 | 1,
      id_municipio: Number,
      confirm:     false | true,
      codigoEmpresaConfirmada: String  // solo si confirm === true
    }
  */
  return await setDB('/empresas/crearEmpresaRapida', {
    method: 'POST',
    body: payload,
  });
}

/**
 * Paso 2 – marcar directamente como favorito una empresa existente
 * (si finalmente decides separar endpoint /favoritos/crear)
 */
export async function crearFavorito(idUsuario, codigo_empresa, label, nota = '', notificar = 0, origen = 'web') {
  const body = { idUsuario, codigo_empresa, label, nota, notificar, origen };
  return await setDB('/favoritos/crear', { method: 'POST', body });
}


/**
 * Envía las imágenes al backend para que GPT extraiga los datos.
 * @param {File[]} files  – Array con 1 o 2 File (frente, respaldo)
 * @returns {Promise<Object>}  JSON con nombre, slogan, etc.
 */

export async function extraerDatosTarjeta(files) {
  if (!files?.length) throw new Error('No se proporcionaron imágenes.');

  const formData = new FormData();
  files.forEach((f) => formData.append('images', f));

  //  ⬇️  SIN objeto envoltorio
  return await setDB('/gpt/extraerDatosTarjeta', formData);
}