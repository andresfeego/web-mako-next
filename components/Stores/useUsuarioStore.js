import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUsuarioStore = create(
  persist(
    (set) => ({
      usuario: null,

      setUsuario: (usuario) => set({ usuario }),

      clearUsuario: () => set({ usuario: null }),
    }),
    {
      name: 'mako-usuario', // Clave usada en localStorage
      partialize: (state) => ({
        usuario: state.usuario, // Solo persistimos lo necesario
      }),
    }
  )
);

export default useUsuarioStore;
