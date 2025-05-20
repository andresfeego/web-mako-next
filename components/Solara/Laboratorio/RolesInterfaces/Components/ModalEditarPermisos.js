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
import { basico, transparent } from '@/components/Inicialized/ModalStyles';
import styles from './ModalEditarPermisos.module.scss';
import {
  getUiPermissions,
  getUiPermissionsPorRol,
} from '@/components/Inicialized/data/helpersGetDB';
import { actualizarUiPermissionsRol } from '@/components/Inicialized/data/helpersSetDB';
import { nuevoMensaje, tiposAlertas } from '@/components/Inicialized/Toast';

const ModalEditarPermisos = ({ rol, onClose }) => {
  const [permisosSistema, setPermisosSistema] = useState([]);
  const [permisosRol, setPermisosRol] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const todos = await getUiPermissions(); // todos los slugs con descripcion y tipo
        const asignados = await getUiPermissionsPorRol(rol.id); // permisos actuales del rol
        const idsAsignados = asignados.map((p) => p.id);
        setPermisosSistema(todos);
        setPermisosRol(idsAsignados);
      } catch (err) {
        console.error('Error cargando permisos', err);
      }
    }

    cargarDatos();
  }, [rol]);

  const handleToggle = (idPermiso) => {
    if (permisosRol.includes(idPermiso)) {
      setPermisosRol(permisosRol.filter((id) => id !== idPermiso));
    } else {
      setPermisosRol([...permisosRol, idPermiso]);
    }
  };

  const handleGuardar = async () => {
    try {
      await actualizarUiPermissionsRol(rol.id, permisosRol);
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
            Permisos para el rol: {rol.rol}
          </Typography>

          <FormGroup>
            {permisosSistema.map((permiso) => (
              <FormControlLabel
                key={permiso.id}
                control={
                  <Checkbox
                    checked={permisosRol.includes(permiso.id)}
                    onChange={() => handleToggle(permiso.id)}
                  />
                }
                label={`${permiso.slug} (${permiso.tipo})`}
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

export default ModalEditarPermisos;
