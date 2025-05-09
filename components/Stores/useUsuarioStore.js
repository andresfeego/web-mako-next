import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUsuarioStore = create(
  persist(
    (set, get) => ({
      usuario: null,
      setUsuario: (usuario) => set({ usuario }),
      clearUsuario: () => set({ usuario: null }),

      dataUsuario: null,
      setDataUsuario: (data) => set({ dataUsuario: data }),
      clearDataUsuario: () => set({ dataUsuario: null }),
    }),
    {
      name: 'mako-usuario',
      partialize: (state) => ({
        usuario: state.usuario, // sólo esto se guarda en localStorage
      }),
    }
  )
);

export default useUsuarioStore;
