import { getDB } from './GetDB';
import useUsuarioStore  from '@/components/Stores/useUsuarioStore';

export async function getEmpresas(busqueda, ciudad, categoria, signal, limInf = 0, limSup = 9000000000) {
  const options = {
    method: 'POST',
    body: {
      ciudad,
      busServicios: busqueda,
      busCategoria: categoria,
      limInf,
      limSup
    }
  };

  if (signal) options.signal = signal;

  return await getDB('/empresas', options);
}

export async function usuarioExiste(idUsuario) {
  const data = await getDB('/usuario/usuarioExiste/' + idUsuario, { method: 'GET' });
  return data && data.length > 0 ? data[0] : null;
}

export async function loginUsuario(correo, pass) {
  return await getDB('/usuario/loginUsuario', {
    method: 'POST',
    body: { correo, pass }
  });
}

export async function loginSocial(correo) {
  return await getDB('/usuario/loginSocial', {
    method: 'POST',
    body: { correo }
  });
}

export async function getRolesUsuario(idUser) {
  return await getDB('/usuario/rolesXid/' + idUser, { method: 'GET' });
}

export async function getUsuario(idUser) {
  const data = await getDB('/usuario/usuarioXid/' + idUser, { method: 'GET' });

  const userReturn = data && typeof data === 'object' ? data : null;

  console.log('data', data);
  console.log('userReturn', userReturn);

  return userReturn;
}


export async function getEmpresa(id) {
  const data = await getDB(`/empresas/${id}`, { method: 'GET' });
  return data;
}

export async function getTelefonosEmpresa(id) {
  const data = await getDB(`/empresas/telefonos/${id}`, { method: 'GET' });
  return data;
}

export async function getEmailsEmpresa(id) {
  const data = await getDB(`/empresas/emails/${id}`, { method: 'GET' });
  return data;
}

export async function getRedesEmpresa(id) {
  const data = await getDB(`/empresas/redes/${id}`, { method: 'GET' });
  return data;
}

export async function getHorariosEmpresa(id) {
  const data = await getDB(`/empresas/horarios/${id}`, { method: 'GET' });
  return data;
}

export async function getImagenesSlideEmpresa(id) {
  const data = await getDB(`/empresas/imagenesSlide/${id}`, { method: 'GET' });
  return data;
}

export async function getListaMunicipios() {
  const data = await getDB('/listaMunicipios', { method: 'GET' });
  return data;
}

export async function getSlides() {
  const data = await getDB('/slides', { method: 'GET' });
  return data;
}

export async function getBusquedasPalabra() {
  const data = await getDB('/bitacora/busquedasPalabra', { method: 'GET' });
  return data;
}

export async function getFlujosNavegacion() {
  const data = await getDB('/bitacora/flujosNavegacion', { method: 'GET' });
  return data;
}

export async function getCategoriasCompletas(cat) {
  const data = await getDB('/categoriasCompletas/' + cat, { method: 'GET' });
  return data;
}

export async function getCategoriasConEmpresas() {
  const data = await getDB('/categoriasConEmpresas', { method: 'GET' });
  return data;
}

export async function getCiudadesConEmpresas() {
  const data = await getDB('/ciudadesConEmpresas', { method: 'GET' });
  return data;
}

export async function getCiudadYCategoriaConEmpresas() {
  const data = await getDB('/ciuycatConEmpresas', { method: 'GET' });
  return data;
}

export async function getTodasLasEmpresas() {
  const data = await getDB('/empresas', {
    body: {
      ciudad: '',
      busServicios: '',
      busCategoria: '',
      limInf: 0,
      limSup: 999999
    }
  });
  return data;
}

export async function getSubcategoria2Xid(idCat) {
  const data = await getDB('/subcategoria2Xid/' + idCat, { method: 'GET' });
  return data;
}

export async function verificarSesionEnBackend() {
  const userId = useUsuarioStore.getState().usuario;
  return userId || null;
  /* 
  const clearUsuario = useUsuarioStore.getState().clearUsuario;
  try {
    const res = await getDB('/usuario/sessionActiva', { method: 'GET' });
    if (!res?.active) {
      clearUsuario(); // 🔥 limpia la sesión
      return null;
    } 
    return res.userId;
  } catch {
    clearUsuario(); // 🔐 por si falla por completo el fetch
    return null;
  }
  */
}

export async function cargarDataUsuario(idUser) {
  const { setDataUsuario } = useUsuarioStore.getState();
  const data = await getUsuario(idUser);

  if (!data || typeof data !== "object") {
    throw new Error("No se pudo obtener la información del usuario");
  }

  setDataUsuario(data);
}

export async function getUsuarios() {
  return await getDB('/usuario/listarUsuarios', { method: 'GET' });
}

export async function getRolesDisponibles() {
  return await getDB('/usuario/listarRolesDisponibles', { method: 'GET' });
}

export async function getRolesPorUsuario(idUsuario) {
  return await getDB('/usuario/rolesXid/' + idUsuario, { method: 'GET' });
}

// Listar todos los tipos de interfaces (botón, componente, etc.)
export async function getTiposInterfaces() {
  return await getDB('/interface/listarTiposInterfaces', { method: 'GET' });
}

// Listar todos los ui_permissions registrados
export async function getUiPermissions() {
  return await getDB('/interface/listarUiPermissions', { method: 'GET' });
}

// Obtener los ui_permissions asignados a un rol específico
export async function getUiPermissionsPorRol(idRol) {
  return await getDB(`/interface/uiPermissionsPorRol/${idRol}`, { method: 'GET' });
}

export async function getRolesPorUiPermission(idUiPermission) {
  return await getDB(`/interface/rolesPorUiPermission/${idUiPermission}`, { method: 'GET' });
}
