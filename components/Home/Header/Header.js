import BarraBusqueda from "./BarraBusqueda"
import BusquedaCategoria from "./BusquedaCategoria"
import BusquedaCiudad from "./BusquedaCiudad"
import styles from "./Header.module.scss"
import stylesSlides from "./SlideHome.module.scss"
import Link from 'next/link'
import MenuUsuario from "./Menu/MenuUsuario"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Cargando from "../../Inicialized/Cargando"

const SlideHome = dynamic(() => import('./SlideHome'), {
    ssr: false,
  });

const Header = () => {
    const pathname = usePathname()

    return (
        <div className={styles.Header}>

            <div className={styles.tituloMako}>
                <Link href="/directorio-empresarial" title={`📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆`} >
                    <div>
                        <Image width={0} height={0} sizes="100vw" loading="lazy" quality='40' className={styles.imgMakoLogo} src={require("../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_150x133.webp")} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                        <Image width={0} height={0} sizes="100vw" loading="lazy" quality='40' className={styles.imgMakoLogoResponsive} src={require("../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-r.webp")} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                    </div>
                </Link>
                {pathname == '/directorio-empresarial' ?
                    <h1 className={styles.makoNombre}>.: Mako :. <br /> Directorio comercial</h1>
                    :
                    null
                }
            </div>

            <div className={styles.contenido}>
                <div className={styles.containerBusquedaUsuario}>
                    <BarraBusqueda  />
                    <MenuUsuario  />
                </div>
                <BusquedaCiudad/>
                <h2 style={{ display: 'none' }}>Categorías</h2>
                <BusquedaCategoria />
                <div className={styles.slide}>
                     <SlideHome  styles={stylesSlides} parent={'headerHome'} /> 
                </div>
            </div>


        </div>
    )
}

export default Header;