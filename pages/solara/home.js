import styles from "./Home.module.scss";
import MainMenu from '../../components/Solara/MainMenu'
import { useState } from "react";
import Estadisticas from "../../components/Solara/Estadisticas/Estadisticas";
import Laboratorio from "../../components/Solara/Laboratorio/Laboratorio";


const Home = () => {
    const [menu, setMenu] = useState(0);

    const handleMenu = (menu) =>{
        setMenu(menu)
    }

    function renderContenido(){
        switch (menu) {
            case 0:
                return(
                    <MainMenu wide={true} handleMenu={handleMenu} />
                )
                break;
        
            case 1:
                return(
                    [
                        <MainMenu handleMenu={handleMenu} />,
                        <Estadisticas/>
                    ]
                )
                break;

            case 2:
                return(
                    [
                        <MainMenu handleMenu={handleMenu} />,
                        <Laboratorio/>
                    ]
                )
                break;
        }
    }

        return (
            <div className={styles.solaraHome}>

                <div className={styles.header}>
                    <img className={styles.imgMakoLogo} loading="lazy" src={require("../../scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1.png")} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                    <span>Solara Guru Labs</span>
                </div>
               
                <div className={styles.content}>
                    {renderContenido()}
                </div>
            </div>
        )
    
    
}



export default Home;