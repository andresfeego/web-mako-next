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
import MenuItem from './MenuItem';
import { actualizarPermisos, cargarDataUsuario } from '@/components/Inicialized/data/helpersGetDB';
import Separador from "@/components/ui/Separador";

const MenuPrincipal = ({ setOpen }) => {
  const idUsuario = useUsuarioStore((state) => state.usuario);
  const dataUsuario = useUsuarioStore((state) => state.dataUsuario);
  const clearDataUsuario = useUsuarioStore((state) => state.clearDataUsuario);

  const [estadoCarga, setEstadoCarga] = useState("cargando"); // "cargando", "ok", "error"

  useEffect(() => {
    let cancelado = false;

    setEstadoCarga("cargando");

    cargarDataUsuario(idUsuario)
      .then(() => {
        if (!cancelado) {
        setEstadoCarga("ok");
        actualizarPermisos(idUsuario); // 🔥 aquí actualizas los permisos siempre que se abra
      }
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
        <MenuItem icon={<MdAccountCircle size={20} />} label="Mi cuenta" ruta="/dashboard/perfil"/>
        <MenuItem icon={<MdAddBusiness size={20} />} label="Registrar comercio" />
        <MenuItem icon={<MdFavoriteBorder size={20} />} label="Mis favoritos" />
        
        <Separador texto="Asesor" tamano="sm" rolRequerido={'Asesor'} conMargenes={true}/>
        <MenuItem icon={<FaRegRegistered size={20} />} label="Mis registros" badge={"Nuevo"} permiso={'mis_registros_asesor_menu_item'}/>
        <MenuItem icon={<MdAttachMoney size={20} />} label="Mis comisiones"  ruta="/dashboard/perfil" permiso={'mis_comisiones_asesor_menu_item'}/>
        
        <Separador texto="Empresario" tamano="sm" rolRequerido={'Empresario'} conMargenes={true}/>
        <MenuItem icon={<MdStorefront size={20} />} label="Mi comercio" permiso={'mis_comercio_menu_item'}/>
        <MenuItem icon={<MdLogout size={20}/>} onClick={() => cerrarSesion(setOpen)}  className={`${styles.cerrarSesion}`} label="Cerrar sesión"   tooltip="Salir de tu cuenta"/>

      </div>
    </div>
  );
};


export default MenuPrincipal;
