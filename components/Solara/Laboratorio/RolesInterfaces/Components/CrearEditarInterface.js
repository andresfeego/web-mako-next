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
import { crearUiPermission } from '@/components/Inicialized/data/helpersSetDB';
import { getTiposInterfaces } from '@/components/Inicialized/data/helpersGetDB';
import { nuevoMensaje, tiposAlertas } from '@/components/Inicialized/Toast';

const CrearEditarInterface = ({ onClose }) => {
  const [slug, setSlug] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idTipo, setIdTipo] = useState('');
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    async function cargarTipos() {
      try {
        const data = await getTiposInterfaces();
        setTipos(data);
      } catch (err) {
        console.error('Error al cargar tipos:', err);
      }
    }

    cargarTipos();
  }, []);

  const handleCrear = async () => {
    if (!slug || !idTipo) {
      nuevoMensaje(tiposAlertas.warn, 'Slug y tipo son obligatorios');
      return;
    }

    try {
      await crearUiPermission(slug, descripcion, idTipo);
      nuevoMensaje(tiposAlertas.success, 'Interfaz creada correctamente');
      onClose();
    } catch (err) {
      console.error(err);
      nuevoMensaje(tiposAlertas.error, 'Error al crear interfaz');
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ ...transparent }}>
        <CloseIcon className="cerrarModal" onClick={onClose} />
        <div className={styles.contenidoModal}>
          <Typography variant="h6" gutterBottom>
            Crear nueva interfaz
          </Typography>

          <TextField
            label="Slug"
            variant="standard"
            fullWidth
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

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
            <Button variant="contained" color="primary" onClick={handleCrear}>
              Crear interfaz
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

export default CrearEditarInterface;
