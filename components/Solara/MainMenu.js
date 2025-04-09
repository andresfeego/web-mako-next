import stylesMain from "./MainMenu.module.scss";
import stylesLateral from "./MainMenuLateral.module.scss";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { MdOutlineScience } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { useState } from "react";

const MainMenu = ({wide, handleMenu}) => {
    const[open, setOpen] = useState(false)
    let styles = stylesLateral;
    let stylesOpen = ''
    if (wide) {
        styles = stylesMain;
    }

    if (open) {
        stylesOpen = styles.openState;
    }

    return (
        <div className={`${styles.mainMenu} ${stylesOpen}`}>
            <div className={`${styles.openMenu} ${styles.iconMenu}`} onClick={()=> setOpen(!open)}>
                {open? <FaChevronLeft/> : <FaChevronRight/>}
            </div>

            <div className={`${styles.goHome} ${styles.iconMenu}`} onClick={()=> {handleMenu(0); setOpen(false)}}>
                <MdOutlineHome/>
            </div>

            <div onClick={()=> {handleMenu(1), setOpen(false)}}>
                <a className={styles.button}>
                    <DonutLargeIcon className={styles.icon} />
                    <span className={styles.text}>Estadisticas</span>
                </a>
            </div>

            <div onClick={()=> {handleMenu(2), setOpen(false)}}>
                <a className={styles.button}>
                    <MdOutlineScience className={styles.icon} />
                    <span className={styles.text}>Laboratorio</span>
                </a>
            </div>

            
            

        </div>
    );
}
 
export default MainMenu;