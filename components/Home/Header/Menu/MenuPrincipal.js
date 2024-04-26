import { useSetUserContext } from "../../../Inicialized/DataProvider";
import styles  from "./MenuPrincipal.module.scss";

const MenuPrincipal = ({ setOpen }) => {

    const setUser = useSetUserContext()

    return ( 
        <div className={styles.menuPrincipal}>
            <div onClick={()=> { setUser({action: 'clean'}) ; setOpen(false) }} className={`${styles.buttonMenu} ${styles.cerrarSesion}`}> Cerrar sesión</div>
        </div>
     );
}
 //fdgsfdg
export default MenuPrincipal;