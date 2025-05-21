import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUsuarioStore from "@/components/Stores/useUsuarioStore";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Dashboard/SideBar/SideBar";
import  styles  from "./DashboardLayout.module.scss";

// Componentes cargados dinámicamente
const DashboardPerfil = dynamic(() => import("@/components/Dashboard/Secciones/Perfil"));
const ComponenteLogin = dynamic(() => import("@/components/Generales/Login/LoginUsuario")); // <-- tu componente real de login

export default function DashboardPage() {
  const router = useRouter();
  const { item: rawItem } = router.query;
  const usuario = useUsuarioStore((state) => state.usuario);

  const [overrideItem, setOverrideItem] = useState(null);

  useEffect(() => {
    const sinSesion = !usuario;
    if (sinSesion) {
      setOverrideItem("login"); // 🔐 forzar que se muestre login
    } else {
      setOverrideItem(null); // si hay sesión, seguimos con el router
    }
  }, [usuario]);

  const item = overrideItem || rawItem;

  const renderContenido = () => {
    switch (item) {
      case "login":
        return <ComponenteLogin />;

      case "perfil":
        return <DashboardPerfil />;

      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className={styles.dashboardContainer} id="dashboardContainer">
      <Sidebar />
      <div className={styles.dashboardContent}>
        {renderContenido()}
      </div>
    </div>
  );
}
