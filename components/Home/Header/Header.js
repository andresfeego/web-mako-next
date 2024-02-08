import BarraBusqueda from "./BarraBusqueda"
import BusquedaCategoria from "./BusquedaCategoria"
import BusquedaCiudad from "./BusquedaCiudad"
import styles from "./Header.module.scss"
import SlideHome from "./SlideHome"
import Link from 'next/link'
import MenuUsuario from "./MenuUsuario"


const Header = ({ slides, municipios}) => {


    return (
        <div className={styles.Header}>

            <div className={styles.tituloMako}>
                <Link href="/directorio-empresarial">
                    <div>
                        <img className={styles.imgMakoLogo} loading="lazy" src={require("../../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.png")} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                    </div>
                </Link>
                <h1 className={styles.makoNombre}>.: Mako :. <br /> Directorio comercial</h1>
            </div>

            <div className={styles.contenido}>
                <BarraBusqueda />
                <MenuUsuario/>
                <BusquedaCiudad municipios={municipios} />
                <BusquedaCategoria />
            </div>

            <div className={styles.slide}>
                <SlideHome slides={slides} />
            </div>

        </div>
    )
}

export default Header;