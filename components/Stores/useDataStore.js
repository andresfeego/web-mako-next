// stores/useDataStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDataStore = create(
  persist(
    (set, get) => ({
      search: {
        busqueda: '',
        ciudad: '',
        categoria: '',
        lblCategoria: '',
      },
      ux: {
        idComercio: 0,
        scroll: 5,
        limLisEmpresas: 18,
      },

      setSearch: (search) => {
        const cleanSearch = Object.fromEntries(
          Object.entries(search).filter(([_, v]) => v !== undefined && v !== null)
        );
        set((state) => ({ search: { ...state.search, ...cleanSearch } }));
      },

      setUx: (ux) => set((state) => ({ ux: { ...state.ux, ...ux } })),

      /**
       * Inicializa filtros desde la URL (router.query) o sessionStorage
       */
      initFiltrosDesdeQuery: (query) => {
        const filtros = {
          busqueda: typeof query.busqueda === 'string' ? query.busqueda : '',
          ciudad: typeof query.ciu === 'string' ? query.ciu : '',
          categoria: typeof query.categoria === 'string' && query.categoria !== '0' ? query.categoria : '',
          lblCategoria: typeof query.lblCategoria === 'string' ? query.lblCategoria : '', 
        };

        // [Opcional] Recuperar ruta anterior (para breadcrumb futuro)
        if (typeof window !== 'undefined') {
          const lastRuta = window.sessionStorage.getItem('ruta-anterior-con-filtros');
          if (lastRuta && filtros.busqueda + filtros.ciudad + filtros.categoria === '') {
            // Puedes usar esto en otra función para restaurar
            console.log('Ruta previa guardada (no redirige aún):', lastRuta);
          }
        }

        get().setSearch(filtros);
      },

      guardarRutaActualConFiltros: () => {
        if (typeof window !== 'undefined') {
          const ruta = window.location.href;
          window.sessionStorage.setItem('ruta-anterior-con-filtros', ruta);
        }
      }
    }),
    {
      name: 'mako-data',
    }
  )
);

export default useDataStore;
