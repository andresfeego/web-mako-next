import stylesGeneral from './styles/listadoDosCol.module.scss'
import { FiRefreshCcw } from "react-icons/fi";


const ListadoDosCol = ({data, refresh}) => {

    
    function renderLista(){
        return(
            data.map((item) => 
                <div className={`${stylesGeneral.item}`}>
                    <span>{Object.values(item)[0]}</span>
                    <span>{Object.values(item)[1]}</span>
                </div>
            )
            )
        }
        
        return ( 
        <div className={`${stylesGeneral.listadoResultados}`}>
                {refresh && <FiRefreshCcw onClick={()=> refresh()} className={`${stylesGeneral.recargar}`}/>}

            {Array.isArray(data) && data.length !== 0 ? 
                renderLista()
            :
            <span>Sin resultados</span>
        }
        </div>
     );
}
 
export default ListadoDosCol;