import styles from './Estadisticas.module.scss'
import stylesTableros from '../Tableros.module.scss'
import BusquedasPorPalabra from './ListasEstadisticas/BuquedasPorPalabra/BusquedasPorPalabra';
import FlujosNavegacion from './ListasEstadisticas/FlujosNavegacion/FlujosNavegacion';

const Estadisticas = () => {
    return ( 
        <div className={`${styles.estadisticas} ${stylesTableros.tablero}`}>
            <BusquedasPorPalabra/>
            <FlujosNavegacion/>
           
        </div>
     );
}
 
export default Estadisticas;