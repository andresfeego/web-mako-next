import { useEffect, useState } from 'react';
import { verificarSesionEnBackend } from '@/components/Inicialized/data/helpersGetDB';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';

export default function useSesionValida() {
  const [cargando, setCargando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const usuario = useUsuarioStore((state) => state.usuario);
  const setUsuario = useUsuarioStore((state) => state.setUsuario);
  const clearUsuario = useUsuarioStore((state) => state.clearUsuario);

  useEffect(() => {
    async function validar() {
      setCargando(true);
      const userId = await verificarSesionEnBackend();

      if (userId) {
        setAutenticado(true);
        setUsuario(userId); // asegura que el store esté sincronizado
      } else {
        clearUsuario();
        setAutenticado(false);
      }

      setCargando(false);
    }

    validar();
  }, [usuario]); // 🔁 Se vuelve a ejecutar si el store cambia

  return { autenticado, cargando };
}
