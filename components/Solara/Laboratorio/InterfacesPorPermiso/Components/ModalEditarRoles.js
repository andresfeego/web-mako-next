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
import styles from './ModalEditarPermisos.module.scss';
import {
  getRolesDisponibles,
  getRolesPorUiPermission,
} from '@/components/Inicialized/data/helpersGetDB';
import { actualizarRolesDeUiPermission } from '@/components/Inicialized/data/helpersSetDB';
import { nuevoMensaje, tiposAlertas } from '@/components/Inicialized/Toast';

const ModalEditarRoles = ({ interfaz, onClose }) => {
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [rolesAsignados, setRolesAsignados] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const allRoles = await getRolesDisponibles(); // [{ id, rol }]
        const asignados = await getRolesPorUiPermission(interfaz.id); // [{ id, rol }]
        const ids = asignados.map((r) => r.id);
        setRolesDisponibles(allRoles);
        setRolesAsignados(ids);
      } catch (err) {
        console.error('Error cargando roles para interfaz:', err);
      }
    }

    cargarDatos();
  }, [interfaz]);

  const handleToggle = (idRol) => {
    if (rolesAsignados.includes(idRol)) {
      setRolesAsignados(rolesAsignados.filter((id) => id !== idRol));
    } else {
      setRolesAsignados([...rolesAsignados, idRol]);
    }
  };

  const handleGuardar = async () => {
    try {
      await actualizarRolesDeUiPermission(interfaz.id, rolesAsignados);
      nuevoMensaje(tiposAlertas.success, 'Permisos actualizados');
      onClose();
    } catch (err) {
      console.error(err);
      nuevoMensaje(tiposAlertas.error, 'Error al guardar los permisos');
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ ...transparent }}>
        <CloseIcon className="cerrarModal" onClick={onClose} />
        <div className={styles.contenidoModal}>
          <Typography variant="h6" gutterBottom>
            Roles con acceso a: <strong>{interfaz.slug}</strong>
          </Typography>

          <FormGroup>
            {rolesDisponibles.map((rol) => (
              <FormControlLabel
                key={rol.id}
                control={
                  <Checkbox
                    checked={rolesAsignados.includes(rol.id)}
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

export default ModalEditarRoles;
