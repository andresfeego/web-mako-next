import styles  from "./MenuPrincipal.module.scss";
import useUsuarioStore from '@/components/Stores/useUsuarioStore';

const MenuPrincipal = ({ setOpen }) => {

    const clearUsuario = useUsuarioStore((state) => state.clearUsuario);

    return ( 
        <div className={styles.menuPrincipal}>
            <div onClick={()=> { clearUsuario() ; setOpen(false) }} className={`${styles.buttonMenu} ${styles.cerrarSesion}`}> Cerrar sesión</div>
        </div>
     );
}
export default MenuPrincipal;