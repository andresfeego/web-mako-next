import styles from './Laboratorio.module.scss'
import stylesTableros from '../Tableros.module.scss'

const Laboratorio = () => {
    return ( 
        <div className={`${styles.laboratorio} ${stylesTableros.tablero}`}>
            <span>Laboratorio</span>
        </div>
     );
}
 
export default Laboratorio;