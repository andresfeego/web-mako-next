import { useState } from 'react';
import stylesGeneral from './styles/TarjetaBasica.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ListadoDosCol from './ListadoDosCol';

const TarjetaBasica = ({titulo, contenido}) => {

    const [openCard, setOpenCard] = useState(false)

    return ( 
        <div className={`${stylesGeneral.card}`}>
            <div className={stylesGeneral.header}>
                <span className={stylesGeneral.title}>
                    {titulo.substr(0, 10)}
                </span>

                {openCard ?
                    <KeyboardArrowUpOutlinedIcon className={`${stylesGeneral.openCard}`} onClick={() => setOpenCard(!openCard)} />
                    :
                    <KeyboardArrowDownOutlinedIcon className={`${stylesGeneral.openCard}`} onClick={() => setOpenCard(!openCard)} />
                }

            </div>

            <div className={`${stylesGeneral.content}`} style={openCard? {height: 'fit-content'} : {height: '0px'}}> 
                <ListadoDosCol data={contenido} refresh={false} />
            </div>
        </div>
     );
}
 
export default TarjetaBasica;