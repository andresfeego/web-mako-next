import { useState } from "react";
import styles from "./Sidebar.module.scss";

import {
  MdAccountCircle,
  MdAddBusiness,
  MdFavoriteBorder,
  MdAttachMoney,
  MdStorefront,
  MdLogout,
  MdChevronLeft, 
  MdChevronRight, 
  
} from "react-icons/md";
import { FaRegRegistered } from "react-icons/fa";
import MenuItem from "@/components/Home/Header/Menu/MenuItem";
import Link from 'next/link'
import Image from "next/image"
import Separador from "@/components/ui/Separador";
import { cerrarSesion } from "@/components/utils/cerrarSesion";
import useUsuarioStore from "@/components/Stores/useUsuarioStore";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const idUsuario = useUsuarioStore((state) => state.usuario);

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <button className={styles.toggleButton} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
      </button>

        <div className={styles.tituloMako}>
                <Link href="/directorio-empresarial" title={`📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆`} >
                    <div>
                        <Image width={0} height={0} sizes="100vw" loading="lazy" quality='40' className={`${styles.imgMakoLogo} ${collapsed ? styles.collapsed : ""}`} src={require("../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_150x133.webp")} />
                        <Image width={0} height={0} sizes="100vw" loading="lazy" quality='40' className={`${styles.imgMakoLogoResponsive} ${collapsed ? styles.collapsed : ""}`} src={require("../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-r.webp")} />
                    </div>
                </Link>
        </div>

         <MenuItem icon={<MdAccountCircle size={20} />} label="Mi cuenta" ruta="/dashboard/perfil" collapsed={collapsed}/>
         <MenuItem icon={<MdAddBusiness size={20} />} label="Registrar comercio" ruta="/dashboard/registar_comercio" collapsed={collapsed}/>
         <MenuItem icon={<MdFavoriteBorder size={20} />} label="Mis favoritos" ruta="/dashboard/mis_favoritos" collapsed={collapsed}/>
         
         <Separador texto="Asesor" tamano="sm" rolRequerido={'Asesor'} collapsed={collapsed}/>
         <MenuItem icon={<FaRegRegistered size={20} />} label="Mis registros" ruta="/dashboard/mis_registros" badge={"Nuevo"} permiso={'mis_registros_asesor_menu_item'} collapsed={collapsed}/>
         <MenuItem icon={<MdAttachMoney size={20} />} label="Mis comisiones"  ruta="/dashboard/mis_comisiones" permiso={'mis_comisiones_asesor_menu_item'} collapsed={collapsed}/>
         
         <Separador texto="Empresario" tamano="sm" rolRequerido={'Empresario'} collapsed={collapsed}/>
         <MenuItem icon={<MdStorefront size={20} />} label="Mi comercio" ruta="/dashboard/mis_comercio" permiso={'mis_comercio_menu_item'} collapsed={collapsed}/>
         {idUsuario && <MenuItem icon={<MdLogout size={20}/>} onClick={() => cerrarSesion()}  className={`${styles.cerrarSesion}`} label="Cerrar sesión"   tooltip="Salir de tu cuenta" collapsed={collapsed}/>}
    </div>
  );
};

export default Sidebar;
