import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { EvBiVisita } from "../../../../components/Inicialized/Bitacora";
import PerfilUno from "../../../../components/Home/Empresas/Perfiles/PerfilUno/PerfilUno";
import { getEmpresa, getListaMunicipios, getSlides } from '@/components/Inicialized/data/helpersGetDB';
import useDataStore from '@/components/Stores/useDataStore';

const Empresa = ({ empresa: empresaSSR, municipios, empresas, slides }) => {
  const router = useRouter();
  const initFiltrosDesdeQuery = useDataStore((state) => state.initFiltrosDesdeQuery);

  const [empresa, setEmpresa] = useState(empresaSSR);

  // 🧠 Aplica filtros si vienen en query (al entrar desde URL compartida)
  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      const tieneFiltros = query.busqueda || query.categoria || query.lblCategoria || query.ciu;

      if (tieneFiltros) {
        initFiltrosDesdeQuery(query);
      }
    }
  }, [router.isReady]);

  // 🔁 Recarga el contenido si cambia el ID
  useEffect(() => {
    const fetchEmpresa = async () => {
      const id = router.query.id;
      if (!id) return;

      const nuevaEmpresa = await getEmpresa(id);
      if (nuevaEmpresa?.[0]) {
        setEmpresa(nuevaEmpresa[0]);
        EvBiVisita(nuevaEmpresa[0].codigo);
      }
    };

    fetchEmpresa();
  }, [router.query.id]);

  if (!empresa) return null;

  return (
    <PerfilUno
      perfilEmpresa={empresa}
      municipios={municipios}
      empresas={empresas}
      slides={slides}
    />
  );
};

export async function getServerSideProps(ctx) {
  const codigo = ctx.query.id;

  const empresaJson = await getEmpresa(codigo);
  const responseJson = await getListaMunicipios();
  const slidesEmpresaJson = await getSlides();

  return {
    props: {
      empresa: empresaJson[0],
      municipios: responseJson,
      empresas: [],
      slides: slidesEmpresaJson
    }
  };
}

export default Empresa;
