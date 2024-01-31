import { Button } from "@mui/material";
import stylesMain from "./MainMenu.module.scss";
import stylesLateral from "./MainMenuLateral.module.scss";
import Link from 'next/link';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
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
                {open? <KeyboardArrowLeftIcon/> : <KeyboardArrowRightIcon/>}
            </div>

            <div className={`${styles.goHome} ${styles.iconMenu}`} onClick={()=> {handleMenu(0); setOpen(false)}}>
                <HomeOutlinedIcon/>
            </div>

            <div onClick={()=> {handleMenu(1), setOpen(false)}}>
                <a className={styles.button}>
                    <DonutLargeIcon className={styles.icon} />
                    <span className={styles.text}>Estadisticas</span>
                </a>
            </div>

            <div onClick={()=> {handleMenu(2), setOpen(false)}}>
                <a className={styles.button}>
                    <ScienceOutlinedIcon className={styles.icon} />
                    <span className={styles.text}>Laboratorio</span>
                </a>
            </div>

        </div>
    );
}
 
export default MainMenu;