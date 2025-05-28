// components/ui/modals/ModalEmpresaRapida/ModalEmpresaRapida.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import { MdAdd, MdClose } from 'react-icons/md';
import styles from './ModalEmpresaRapida.module.scss';

import BusquedaCiudad from '@/components/Home/Header/BusquedaCiudad';   // ⬅️ nuevo

export default function ModalEmpresaRapida({ open, onClose, onValidated, initialData = null }) {
  const [nombre, setNombre] = useState('');
  const [telefonos, setTelefonos] = useState(['']);
  const [nota, setNota] = useState('');
  const [munSel, setMunSel] = useState({ id: null, nombre: '' });   // {id,nombre}

  useEffect(() => {
    if (open && !initialData) {
      limpiaForm();
    }
  }, [open]);

  const limpiaForm = () => {
    setNombre('');
    setTelefonos(['']);
    setNota('');
    setMunSel({ id: null, nombre: '' });
  }
  /* ---------- teléfonos dinámicos ---------- */
  const handleTelefonoChange = (idx, value) => {
    const copia = [...telefonos];
    copia[idx] = value;
    setTelefonos(copia);
  };

  const agregarTelefono = () => setTelefonos([...telefonos, '']);
  const borrarTelefono = (idx) => {
    if (telefonos.length === 1) return;
    setTelefonos(telefonos.filter((_, i) => i !== idx));
  };

  /* ---------- validación mínima ---------- */
  const formularioValido =
    nombre.trim() !== '' &&
    telefonos.filter((t) => t.trim() !== '').length > 0;

  /* ---------- continuar ---------- */
  const handleContinuar = () => {
    onValidated({
      idUsuario: null,                // el padre lo rellena
      nombre: nombre.trim(),
      telefonos: telefonos.map((t) => t.trim()).filter(Boolean),
      nota,
      notificar: 0,
      id_municipio: munSel.id || 0,   // 0 si no seleccionó ciudad
      confirm: false,
    });
    onClose();
  };

  /* ---------- UI ---------- */
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Agregar empresa a mi directorio</DialogTitle>

      <DialogContent className={styles.content}>
        {/* Nombre */}
        <TextField
          label="Nombre"
          variant="standard"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          margin="dense"
        />

        {/* Teléfonos */}
        <div className={styles.listaTelefonos}>
          {telefonos.map((tel, idx) => (
            <div key={idx} className={styles.telefonoFila}>
              <TextField
                label={`Teléfono ${idx + 1}`}
                variant="standard"
                value={tel}
                onChange={(e) => handleTelefonoChange(idx, e.target.value)}
                fullWidth
                margin="dense"
              />
              {idx === telefonos.length - 1 && (
                <IconButton onClick={agregarTelefono} aria-label="Agregar">
                  <MdAdd />
                </IconButton>
              )}
              {telefonos.length > 1 && (
                <IconButton onClick={() => borrarTelefono(idx)} aria-label="Eliminar">
                  <MdClose />
                </IconButton>
              )}
            </div>
          ))}
        </div>

        {/* Ciudad (opcional) */}
        <BusquedaCiudad
          dropdownMode="overlay"
          onSelect={(mun) =>
            mun ? setMunSel(mun) : setMunSel({ id: null, nombre: '' })
          }
          initialValue={munSel.nombre}
        />

        {/* Nota */}
        <TextField
          label="Nota"
          variant="standard"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          fullWidth
          multiline
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={()=> {limpiaForm(), onClose()}}>Cancelar</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinuar}
          disabled={!formularioValido}
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
