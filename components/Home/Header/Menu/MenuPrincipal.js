import { useEffect, useState } from "react";
import styles from "./MenuPrincipal.module.scss";
import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { cerrarSesion } from '@/components/utils/cerrarSesion';
import { Avatar } from "@material-ui/core";
import {
  MdAccountCircle,
  MdAddBusiness,
  MdFavoriteBorder,
  MdAttachMoney,
  MdStorefront,
  MdLogout
} from "react-icons/md";
import { FaRegRegistered } from "react-icons/fa";

import { cargarDataUsuario } from '@/components/Inicialized/data/helpersGetDB';

const MenuPrincipal = ({ setOpen }) => {
  const idUsuario = useUsuarioStore((state) => state.usuario);
  const dataUsuario = useUsuarioStore((state) => state.dataUsuario);
  const setDataUsuario = useUsuarioStore((state) => state.setDataUsuario);
  const clearDataUsuario = useUsuarioStore((state) => state.clearDataUsuario);

  const [estadoCarga, setEstadoCarga] = useState("cargando"); // "cargando", "ok", "error"

  useEffect(() => {
    let cancelado = false;

    setEstadoCarga("cargando");

    cargarDataUsuario(idUsuario)
      .then(() => {
        if (!cancelado) setEstadoCarga("ok");
      })
      .catch(() => {
        if (!cancelado) setEstadoCarga("error");
      });

    return () => {
      cancelado = true;
      clearDataUsuario();
    };
  }, []);

  const nombre = dataUsuario?.nombres;
  const apellidos = dataUsuario?.apellidos;
  const avatarUrl = dataUsuario?.avatarUrl;
  const rolesArray = dataUsuario?.roles || [];
  const rol = rolesArray.includes(2)
    ? "asesor"
    : rolesArray.includes(3)
    ? "empresario"
    : "";

  return (
    <div className={styles.menuPrincipal}>
      {/* Encabezado del usuario */}
      <div className={styles.encabezado}>
        {estadoCarga === "cargando" ? (
          <div className={styles.loadingUsuario}>Cargando usuario...</div>
        ) : estadoCarga === "error" ? (
          <div className={styles.errorUsuario}>Imposible adquirir la información del usuario</div>
        ) : (
          <>
            <Avatar src={avatarUrl} alt={nombre} />
            <div className={styles.usuarioInfo}>
              <span className={styles.nombre}>{nombre} {apellidos}</span>
            </div>
          </>
        )}
      </div>

      {/* Ítems del menú */}
      <div className={styles.menuItems}>
        <MenuItem icon={<MdAccountCircle size={20} />} label="Mi cuenta" />
        <MenuItem icon={<MdAddBusiness size={20} />} label="Registrar comercio" />
        <MenuItem icon={<MdFavoriteBorder size={20} />} label="Mis favoritos" badge={rol === "asesor" ? "Asesor" : null} />
        <MenuItem icon={<FaRegRegistered size={20} />} label="Mis registros" />
        <MenuItem icon={<MdAttachMoney size={20} />} label="Mis comisiones" badge={rol === "empresario" ? "Empresario" : null} />
        <MenuItem icon={<MdStorefront size={20} />} label="Mi comercio" />
        <MenuItem icon={<MdLogout size={20} onClick={() => cerrarSesion(setOpen)} />}  className={`${styles.cerrarSesion}`} label="Cerrar sesión" />

      </div>
    </div>
  );
};

function MenuItem({ icon, label, badge, className }) {
  return (
    <div className={`${styles.menuItem} ${className || ""}`}>
      <div className={styles.menuIconLabel}>
        {icon}
        <span>{label}</span>
      </div>
      {badge && <span className={styles.badge}>{badge}</span>}
    </div>
  );
}

export default MenuPrincipal;
