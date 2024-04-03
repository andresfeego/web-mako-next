import styles from './Estadisticas.module.scss'
import stylesTableros from '../Tableros.module.scss'
import BusquedasPorPalabra from './ListasEstadisticas/BuquedasPorPalabra/BusquedasPorPalabra';

const Estadisticas = () => {
    return ( 
        <div className={`${styles.estadisticas} ${stylesTableros.tablero}`}>
            <BusquedasPorPalabra/>
           
        </div>
     );
}
 
export default Estadisticas;