import styles from "./Home.module.scss";
import MainMenu from '../../components/Solara/MainMenu'
import { useState } from "react";
import Estadisticas from "../../components/Solara/Estadisticas/Estadisticas";
import Laboratorio from "../../components/Solara/Laboratorio/Laboratorio";
import Image from "next/image";


const Home = ({municipios}) => {
    const [menu, setMenu] = useState(0);

    const handleMenu = (menu) => {
        setMenu(menu)
    }

    function renderContenido() {
        switch (menu) {
            case 0:
                return (
                    <MainMenu wide={true} handleMenu={handleMenu} />
                )
                break;

            case 1:
                return (
                    [
                        <MainMenu handleMenu={handleMenu} />,
                        <Estadisticas />
                    ]
                )
                break;

            case 2:
                return (
                    [
                        <MainMenu handleMenu={handleMenu} />,
                        <Laboratorio />
                    ]
                )
                break;

        }
    }

    return (
        <div className={styles.solaraHome}>

            <div className={styles.header}>
                <Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' className={styles.imgMakoLogo} src={require("../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.webp")} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                <span>Solara Guru Labs</span>
            </div>

            <div className={styles.content}>
                {renderContenido()}
            </div>
        </div>
    )


}


export async function getServerSideProps(ctx) {
    var props = { props: {} }

    const response = await fetch(process.env.HOST_NAME + '/listaMunicipios')
    const municipios = await response.json()

    props.props = { municipios: municipios }
    return props
}



export default Home;
