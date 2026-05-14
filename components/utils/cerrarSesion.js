// utils/cerrarSesion.js
import { logoutUsuario } from '@/components/Inicialized/data/helpersSetDB';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { EvBiLogoutSucceeded } from '@/components/Inicialized/Bitacora';

export async function cerrarSesion(setOpen = ()=>{}) {
  const userId = useUsuarioStore.getState().usuario;
  try {
    await logoutUsuario(); // 🔥 borra la cookie desde backend
  } catch (err) {
    console.warn('Error cerrando sesión en backend:', err);
  }
  EvBiLogoutSucceeded('web', userId);

  const clearUsuario = useUsuarioStore.getState().clearUsuario;
  const clearUiPermisos = useUsuarioStore.getState().clearUiPermisos;
  clearUsuario(); // limpia el Zustand
  clearUiPermisos();
  if (setOpen) setOpen(false);
}
