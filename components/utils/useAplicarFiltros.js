import { useRouter } from 'next/router';
import useDataStore from '@/components/Stores/useDataStore';

export function useAplicarFiltros() {
  const router = useRouter();

  const aplicar = () => {
    const { busqueda, ciudad, categoria, lblCategoria } = useDataStore.getState().search;

    const query = {
      ...router.query,
    };

    if (busqueda?.trim()) query.busqueda = busqueda;
    else delete query.busqueda;

    if (ciudad?.trim()) query.ciu = ciudad;
    else delete query.ciu;

    if (categoria && categoria !== '0') query.categoria = categoria;
    else delete query.categoria;

    if (lblCategoria?.trim()) query.lblCategoria = lblCategoria;
    else delete query.lblCategoria;

    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  return aplicar;
}
