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
      name: 'mako-usuario', 
      partialize: (state) => ({
        usuario: state.usuario, 
      }),
    }
  )
);

export default useUsuarioStore;
