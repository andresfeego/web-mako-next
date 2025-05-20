import styles from './Laboratorio.module.scss'
import stylesTableros from '../Tableros.module.scss'
import CrearEmpresa from './CrearEmpresa/CrearEmpresa'
import RolesUsuarios from "./RolesUsuarios/RolesUsuarios";
import RolesInterfaces from "./RolesInterfaces/RolesInterfaces";
import InterfacesPorPermiso from "./InterfacesPorPermiso/InterfacesPorPermiso";

const Laboratorio = () => {
    return ( 
        <div className={`${styles.laboratorio} ${stylesTableros.tablero}`}>
            <CrearEmpresa/>
            <RolesUsuarios />
            <RolesInterfaces />
            <InterfacesPorPermiso />
        </div>
     );
}
 
export default Laboratorio;