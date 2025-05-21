import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { transparent } from '@/components/Inicialized/ModalStyles';
import styles from './ModalEditarPermisos.module.scss';
import { getTiposInterfaces } from '@/components/Inicialized/data/helpersGetDB';
import { actualizarUiPermission } from '@/components/Inicialized/data/helpersSetDB';
import { nuevoMensaje, tiposAlertas } from '@/components/Inicialized/Toast';

const EditarInterface = ({ interfaz, onClose }) => {
  const [descripcion, setDescripcion] = useState(interfaz.descripcion || '');
  const [idTipo, setIdTipo] = useState('');
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    async function cargarTipos() {
      try {
        const data = await getTiposInterfaces();
        setTipos(data);
        const tipoEncontrado = data.find((t) => t.nombre === interfaz.tipo);
        if (tipoEncontrado) setIdTipo(tipoEncontrado.id);
      } catch (err) {
        console.error('Error cargando tipos', err);
      }
    }

    cargarTipos();
  }, [interfaz]);

  const handleGuardar = async () => {
    try {
      await actualizarUiPermission(interfaz.id, descripcion, idTipo);
      nuevoMensaje(tiposAlertas.success, 'Interfaz actualizada');
      onClose();
    } catch (err) {
      console.error(err);
      nuevoMensaje(tiposAlertas.error, 'Error al guardar cambios');
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ ...transparent }}>
        <CloseIcon className="cerrarModal" onClick={onClose} />
        <div className={styles.contenidoModal}>
          <Typography variant="h6" gutterBottom>
            Editar interfaz: <strong>{interfaz.slug}</strong>
          </Typography>

          <TextField
            label="Descripción"
            variant="standard"
            fullWidth
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <TextField
            label="Tipo de interfaz"
            variant="standard"
            fullWidth
            select
            value={idTipo}
            onChange={(e) => setIdTipo(e.target.value)}
          >
            {tipos.map((tipo) => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </MenuItem>
            ))}
          </TextField>

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

export default EditarInterface;
