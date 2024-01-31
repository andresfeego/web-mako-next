import styles from './Estadisticas.module.scss'
import stylesTableros from '../Tableros.module.scss'
import ListaVacia from '../ListaVacia';

const Estadisticas = () => {
    return ( 
        <div className={`${styles.estadisticas} ${stylesTableros.tablero}`}>
            <ListaVacia/>
           
        </div>
     );
}
 
export default Estadisticas;