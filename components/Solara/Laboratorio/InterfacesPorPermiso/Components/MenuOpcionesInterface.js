import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

/**
 * Menú contextual para cada interfaz (ícono de 3 puntos)
 * 
 * @param {object} interfaz - Objeto de la interfaz (con slug, id, etc.)
 * @param {HTMLElement} anchorEl - Elemento que ancla el menú
 * @param {boolean} open - Si el menú está abierto
 * @param {function} onOpen - Abre el menú
 * @param {function} onClose - Cierra el menú
 * @param {function} onEditar - Ejecuta la acción de editar
 * @param {function} onEliminar - Ejecuta la acción de eliminar
 */
const MenuOpcionesInterface = ({
  interfaz,
  anchorEl,
  open,
  onOpen,
  onClose,
  onEditar,
  onEliminar
}) => {
  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => onOpen(e, interfaz)}
        aria-controls="menu-opciones"
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="menu-opciones"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={(e) => { e.stopPropagation(); onEditar(interfaz);}}>Editar</MenuItem>
        <MenuItem onClick={(e) => { e.stopPropagation(); onEliminar(interfaz);}}>Eliminar</MenuItem>
      </Menu>
    </>
  );
};

export default MenuOpcionesInterface;
