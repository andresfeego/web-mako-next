import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, TextField, Grid
} from '@material-ui/core';
import CardSelector from '@/components/ui/CardSelector';
import styles from './GuardarTarjetaModal.module.scss';
import { toast } from 'react-toastify';                // asumes que ya lo usas
import { extraerDatosTarjeta, crearEmpresa } from '@/components/Inicialized/data/helpersSetDB'; // ← helpers backend

import dynamic from 'next/dynamic';
const Success = dynamic(() => import('@/components/lottieAnimations/success'), { ssr: false });

export default function GuardarTarjetaModal({ open, onClose }) {

  /* -------------------- estado local -------------------- */
  const [frente,   setFrente]   = useState(null);   // File
  const [respaldo, setRespaldo] = useState(null);   // File
  const [status,   setStatus]   = useState('select'); // select | loading | summary | success
  const [form, setForm] = useState({
    nombre: '', slogan: '', direccion: '', ciudad: '',
    departamento: '', palabras_clave: '', telefonos: ''
  });

  /* -------------------- helpers -------------------- */
  const resetAll = () => {
    setFrente(null); setRespaldo(null);
    setStatus('select');
    setForm({ nombre:'', slogan:'', direccion:'', ciudad:'',
              departamento:'', palabras_clave:'', telefonos:'' });
  };

  const empezarExtraccion = async () => {
    try {
      setStatus('loading');

      const res = await extraerDatosTarjeta([frente, respaldo].filter(Boolean));
      // res debe traer el JSON estructurado
      console.log(res);
      setForm({
        nombre:           res.nombre          || '',
        slogan:           res.slogan          || '',
        direccion:        res.direccion       || '',
        ciudad:           res.ciudad          || '',
        departamento:     res.departamento    || '',
        palabras_clave:   res.palabras_clave?.join(', ') || '',
        telefonos:        res.telefonos?.map(t => t.numero).join(', ') || ''
      });
      setStatus('summary');

    } catch (err) {
        console.log(err);
      toast.error('Error extrayendo datos. Intenta de nuevo.');
      setStatus('select');
    }
  };

  const handleCrear = async () => {
    try {
      await crearEmpresa(form);        // helper que llama a tu endpoint de creación
      setStatus('success');

      // Redirige a favoritos tras 2 s
      setTimeout(() => {
        window.open('/favoritos', '_blank');
        onClose(); resetAll();
      }, 2000);

    } catch (err) {
      toast.error('Error al guardar. Revisa los datos e intenta nuevamente.');
    }
  };

  /* -------------------- render por estado -------------------- */
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className={styles.loading}>
            <CircularProgress />
            <p>Extrayendo datos…</p>
          </div>
        );

      case 'summary':
        return (
          <form className={styles.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth label="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/></Grid>
              <Grid item xs={12}><TextField fullWidth label="Slogan" value={form.slogan} onChange={e=>setForm({...form,slogan:e.target.value})}/></Grid>
              <Grid item xs={12}><TextField fullWidth label="Dirección" value={form.direccion} onChange={e=>setForm({...form,direccion:e.target.value})}/></Grid>
              <Grid item xs={6}><TextField fullWidth label="Ciudad" value={form.ciudad} onChange={e=>setForm({...form,ciudad:e.target.value})}/></Grid>
              <Grid item xs={6}><TextField fullWidth label="Departamento" value={form.departamento} onChange={e=>setForm({...form,departamento:e.target.value})}/></Grid>
              <Grid item xs={12}><TextField fullWidth label="Palabras clave" value={form.palabras_clave} onChange={e=>setForm({...form,palabras_clave:e.target.value})}/></Grid>
              <Grid item xs={12}><TextField fullWidth label="Teléfonos" value={form.telefonos} onChange={e=>setForm({...form,telefonos:e.target.value})}/></Grid>
            </Grid>
          </form>
        );

      case 'success':
        return (
            <Success text={'😃'} />
        );

      default: // 'select'
        return (
          <div className={styles.selectGrid}>
            <CardSelector
              label="Frente"
              placeholderSrc="/assets/icons/front_card.png"
              file={frente}
              onFileChange={setFrente}
            />
            <CardSelector
              label="Respaldo"
              placeholderSrc="/assets/icons/back_card.png"
              file={respaldo}
              onFileChange={setRespaldo}
            />
          </div>
        );
    }
  };

  /* -------------------- acciones footer -------------------- */
  const renderActions = () => {
    if (status === 'loading' || status === 'success') return null;

    if (status === 'summary') {
      return (
        <>
          <Button onClick={resetAll}>Intentar de nuevo</Button>
          <Button variant="contained" onClick={handleCrear}>
            Crear
          </Button>
        </>
      );
    }

    // estado 'select'
    const disabled = !frente && !respaldo;
    return (
      <Button variant="contained" disabled={disabled} onClick={empezarExtraccion}>
        Guardar
      </Button>
    );
  };

  return (
    <Dialog open={open} onClose={() => { onClose(); resetAll(); }} maxWidth="sm" fullWidth>
      <DialogTitle className={styles.title}>
        Envíanos una foto de una tarjeta o volante de negocio y nosotros la guardamos por ti
      </DialogTitle>

      <DialogContent dividers>{renderContent()}</DialogContent>

      <DialogActions>{renderActions()}</DialogActions>
    </Dialog>
  );
}
