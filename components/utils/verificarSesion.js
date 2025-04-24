import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { verificarSesionEnBackend } from '@/components/Inicialized/data/helpersGetDB';

export async function verificarSesionActiva() {
  const clearUsuario = useUsuarioStore.getState().clearUsuario;

  try {
    const userId = await verificarSesionEnBackend();

    if (!userId) {
      clearUsuario();
    }

    return userId || null;
  } catch (err) {
    clearUsuario();
    return null;
  }
}