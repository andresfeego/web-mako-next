import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { transparent } from '@/components/Inicialized/ModalStyles';
import styles from './ModalPermisosUsuario.module.scss';

import {
  getRolesDisponibles,
  getRolesPorUsuario,
} from '@/components/Inicialized/data/helpersGetDB';
import { guardarRolesUsuario } from '@/components/Inicialized/data/helpersSetDB';
import { nuevoMensaje, tiposAlertas } from '@/components/Inicialized/Toast';

const ModalPermisosUsuario = ({ usuario, onClose }) => {
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [rolesUsuario, setRolesUsuario] = useState([]);

  useEffect(() => {
    async function cargarRoles() {
      try {
        const todos = await getRolesDisponibles(); // [{ id, rol }]
        const asignados = await getRolesPorUsuario(usuario.id); // [{ id_rol, rol }]
        setRolesDisponibles(todos);
        setRolesUsuario(asignados.map((r) => r.id_rol));
      } catch (err) {
        console.error('Error cargando roles', err);
      }
    }
    cargarRoles();
  }, [usuario]);

  const handleToggle = (idRol) => {
    if (rolesUsuario.includes(idRol)) {
      setRolesUsuario(rolesUsuario.filter((r) => r !== idRol));
    } else {
      setRolesUsuario([...rolesUsuario, idRol]);
    }
  };

  const handleGuardar = async () => {
    console.log('Inicio handleGuardar');
  try {
    const respuesta = await guardarRolesUsuario(usuario.id, rolesUsuario);
    console.log('Respuesta backend:', respuesta);

    if (!respuesta || respuesta.ok !== true) {
      throw new Error('El backend no confirmó guardado');
    }

    nuevoMensaje(tiposAlertas.success, 'Roles actualizados correctamente');
    onClose();
  } catch (err) {
    console.error('Error capturado:', err);
    nuevoMensaje(tiposAlertas.error, 'Error al guardar los roles');
  }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ ...transparent }}>
        <CloseIcon className="cerrarModal" onClick={onClose} />
        <div className={styles.contenidoModal}>
          <Typography variant="h6" gutterBottom>
            Editar roles: {usuario.nombres} {usuario.apellidos}
          </Typography>
          <Typography variant="body2">Correo: {usuario.correo}</Typography>

          <FormGroup>
            {rolesDisponibles.map((rol) => (
              <FormControlLabel
                key={rol.id}
                control={
                  <Checkbox
                    checked={rolesUsuario.includes(rol.id)}
                    onChange={() => handleToggle(rol.id)}
                  />
                }
                label={rol.rol}
              />
            ))}
          </FormGroup>

          <div className={styles.botones}>
            <Button variant="contained" color="primary" onClick={handleGuardar}>
              Guardar cambios
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalPermisosUsuario;
