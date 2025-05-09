import styles from './MenuUsuario.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import React from 'react';
import { transparent } from '../../../Inicialized/ModalStyles';
import CloseIcon from '@material-ui/icons/Close';
import LoginUsuario from '../../../Generales/Login/LoginUsuario';
import { EvBiClickButton } from '../../../Inicialized/Bitacora';
import { GiHamburgerMenu } from "react-icons/gi";
import MenuPrincipal from './MenuPrincipal';
import useSesionValida from '@/hooks/useSesionValida';


const MenuUsuario = (props) => {
  const { autenticado, cargando } = useSesionValida();
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    EvBiClickButton('Menu pincipal', 'Abrir menu login');
    setOpen(true);
  }

  function handleClose() {
    EvBiClickButton('Menu pincipal', 'Cerrar menu login');
    setOpen(false);
  }

  if (cargando) return null;

  return (
    <React.Fragment>
      {autenticado
        ? <GiHamburgerMenu onClick={handleOpen} className={styles.iconMenuPrincipal} />
        : <PersonIcon onClick={handleOpen} className={styles.iconMenuPrincipal} />
      }

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...transparent }}>
          <CloseIcon className='cerrarModal'  onClick={handleClose} />
          <div className={styles.contenidoModal}>
            {autenticado
              ? <MenuPrincipal setOpen={setOpen} />
              : <LoginUsuario setOpen={setOpen} />
            }
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default MenuUsuario;
