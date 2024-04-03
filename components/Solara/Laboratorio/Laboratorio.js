import styles from './Laboratorio.module.scss'
import stylesTableros from '../Tableros.module.scss'
import CrearEmpresa from './CrearEmpresa/CrearEmpresa'

const Laboratorio = () => {
    return ( 
        <div className={`${styles.laboratorio} ${stylesTableros.tablero}`}>
            <CrearEmpresa/>
        </div>
     );
}
 
export default Laboratorio;