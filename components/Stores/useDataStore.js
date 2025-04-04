
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDataStore = create(
  persist(
    (set) => ({
      search: {
        busqueda: "",
        ciudad: '',
        categoria: '',
        lblCategoria: ''
      },
      ux: {
        idComercio: 0,
        scroll: 5,
        limLisEmpresas: 18
      },

      setSearch: (search) => set((state) => ({ search: { ...state.search, ...search } })),
      setUx: (ux) => set((state) => ({ ux: { ...state.ux, ...ux } })),
    }),
    {
      name: 'mako-data', 
    }
  )
);

export default useDataStore;
