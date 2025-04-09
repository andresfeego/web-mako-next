
import styles from './MenuUsuario.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import React from 'react';
import { basico } from '../../../Inicialized/ModalStyles';
import CloseIcon from '@material-ui/icons/Close';
import LoginUsuario from '../../../Generales/Login/LoginUsuario';
import { EvBiClickButton } from '../../../Inicialized/Bitacora';
import { GiHamburgerMenu } from "react-icons/gi";
import MenuPrincipal from './MenuPrincipal';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';




const MenuUsuario = (props) => {

    const user = useUsuarioStore((state) => state.usuario);

    const [open, setOpen] = React.useState(false);
    function handleOpen() {
        setOpen(true);
    };
    function handleClose() {
        setOpen(false);
    };

    return (
        <React.Fragment>

            {user ?
                <GiHamburgerMenu onClick={() => { EvBiClickButton('Menu pincipal', 'Abrir menu login'); handleOpen() }} className={styles.iconMenuPrincipal} sx={{ fontSize: 6 }} />
                :
                <PersonIcon onClick={() => { EvBiClickButton('Menu pincipal', 'Abrir menu login'); handleOpen() }} className={styles.iconMenuPrincipal} sx={{ fontSize: 6 }} />
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"

            >
                <Box sx={{ ...basico }}>
                    <div>
                        <CloseIcon className='cerrarModal' onClick={() => { EvBiClickButton('Menu pincipal', 'Cerrar menu login'); handleClose() }} />
                        <div className='contenidoModal'>
                            {user ?
                                <MenuPrincipal setOpen={setOpen} />
                                :
                                <LoginUsuario setOpen={setOpen} />
                            }
                        </div>
                    </div>
                </Box>
            </Modal>

        </React.Fragment>
    );
}



export default MenuUsuario;



