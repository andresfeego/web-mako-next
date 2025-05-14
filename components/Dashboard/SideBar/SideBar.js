import { useState } from "react";
import styles from "./Sidebar.module.scss";
import { MdChevronLeft, MdChevronRight, MdPerson, MdAttachMoney, MdStorefront } from "react-icons/md";
import MenuItem from "@/components/Home/Header/Menu/MenuItem";
import Link from 'next/link'
import Image from "next/image"

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

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

      <MenuItem icon={<MdPerson size={20} />} label="Perfil" ruta="/dashboard/perfil" tooltip="Ver y editar tus datos" collapsed={collapsed} />
      <MenuItem icon={<MdAttachMoney size={20} />} label="Planes" ruta="/dashboard/planes" tooltip="Gestionar tu plan actual" collapsed={collapsed} />
      <MenuItem icon={<MdStorefront size={20} />} label="Mis Comercios" ruta="/dashboard/mis-comercios" permiso="ver_comercios" tooltip="Accede a tus comercios" collapsed={collapsed} />
    </div>
  );
};

export default Sidebar;
