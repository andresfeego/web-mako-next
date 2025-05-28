// components/ui/modals/ModalEmpresaRapida/ConfirmEmpresaModal.js
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Divider,
  Button, RadioGroup, FormControlLabel, Radio, Box, Chip, IconButton
} from '@material-ui/core';
import { MdPhone, MdLocationOn } from 'react-icons/md';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';  // MUI v4
import styles from './ConfirmEmpresaModal.module.scss';

/**
 * Props:
 *   open
 *   empresas  – array [{ codigo, nombre, slogan? }]
 *   draft     – { nombre, telefonos:[…], ciudad }
 *   onYes(cod)
 *   onNo()                // “Crear nueva”
 *   onBack()              // ← flecha, vuelve al formulario
 */
export default function ConfirmEmpresaModal({
  open, empresas, draft, onYes, onNo, onBack
}) {
  const [seleccion, setSeleccion] = useState('');

  return (
    <Dialog open={open} onClose={onNo} maxWidth="xs" fullWidth>
      <DialogTitle disableTypography>
        <div className={styles.header}>
          {onBack && (
            <IconButton onClick={onBack} className={styles.backBtn}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          )}
          <h3 className={styles.titulo}>
            El teléfono que intentas guardar ya existe.
          </h3>
        </div>

        {/* Resumen de lo que escribió el usuario */}
        <Box px={3} pb={1}>
          <Box className={styles.resumen}>
            <strong>{draft.nombre}</strong>
            <Box className={styles.chips}>
              {draft.telefonos.map((t) => (
                <Chip
                  key={t}
                  icon={<MdPhone />}
                  label={t}
                  size="small"
                  variant="outlined"
                />
              ))}
              {draft.ciudad && (
                <Chip
                  icon={<MdLocationOn />}
                  label={draft.ciudad}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </Box>

        <Divider />
        <h3 className={styles.subTitulo}>¿Es una de estas opciones?</h3>
      </DialogTitle>

      <DialogContent>
        <RadioGroup
          value={seleccion}
          onChange={(e) => setSeleccion(e.target.value)}
        >
          {empresas.map((emp) => (
            <FormControlLabel
              key={emp.codigo}
              value={emp.codigo}
              control={<Radio />}
              label={`${emp.nombre}${emp.slogan ? ' — ' + emp.slogan : ''}`}
            />
          ))}
        </RadioGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={onNo}>Crear nueva</Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!seleccion}
          onClick={() => onYes(seleccion)}
        >
          Agregar a favoritos
        </Button>
      </DialogActions>
    </Dialog>
  );
}
