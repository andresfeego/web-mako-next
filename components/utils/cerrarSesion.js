// utils/cerrarSesion.js
import { logoutUsuario } from '@/components/Inicialized/data/helpersSetDB';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';

export async function cerrarSesion(setOpen = ()=>{}) {
  try {
    await logoutUsuario(); // 🔥 borra la cookie desde backend
  } catch (err) {
    console.warn('Error cerrando sesión en backend:', err);
  }

  const clearUsuario = useUsuarioStore.getState().clearUsuario;
  const clearUiPermisos = useUsuarioStore.getState().clearUiPermisos;
  clearUsuario(); // limpia el Zustand
  clearUiPermisos();
  if (setOpen) setOpen(false);
}