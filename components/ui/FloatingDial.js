import React, { useState } from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import { MdAdd, MdFavoriteBorder, MdShare, MdClose } from 'react-icons/md';
import styles from './FloatingDial.module.scss';

import DialMenuItem from './DialMenuItem';
import ModalEmpresaRapida from '@/components/ui/modals/ModalEmpresaRapida/ModalEmpresaRapida';
import ConfirmEmpresaModal from '@/components/ui/modals/ModalEmpresaRapida/ConfirmEmpresaModal';

import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { crearEmpresaRapida } from '@/components/Inicialized/data/helpersSetDB';
import { actualizarPermisos } from '@/components/Inicialized/data/helpersGetDB';
import { nuevoMensaje, tiposAlertas } from '../Inicialized/Toast';

export default function FloatingDial() {
  /* ---------- local state ---------- */
  const [abierto, setAbierto] = useState(false);   // despliega acciones
  const [showModal, setShowModal] = useState(false);   // formulario empresa rápida
  const [confirmData, setConfirmData] = useState(null);    // { empresas, basePayload } | null
  const [draft, setDraft] = useState(null);    // último payload
  const idUsuario = useUsuarioStore((s) => s.usuario);

  const showResultado = (nombreEmpresa, yaExistia) => {
    if (yaExistia) {
      nuevoMensaje(
        tiposAlertas.info,
        `${nombreEmpresa} ya estaba en tu directorio. Datos actualizados.`
      );
    } else {
      nuevoMensaje(
        tiposAlertas.success,
        `${nombreEmpresa} se ha agregado a tu directorio.`
      );
    }
  };

  /* ---------- abrir / cerrar dial ---------- */
  const handleToggle = async () => {
    if (!abierto && idUsuario) await actualizarPermisos(idUsuario); // refresca permisos
    setAbierto((p) => !p);
  };

  /* ---------- recibir payload del formulario ---------- */
  const handleValidated = async (payload) => {
    try {
      setDraft(payload);                        // ⬅️ guarda borrador
      const data = await crearEmpresaRapida({ ...payload, idUsuario });

      if (data.existe) {
        // hay coincidencias: mostrar modal de confirmación
        setConfirmData({ empresas: data.empresas, basePayload: payload });
        return;
      }

      // empresa + favorito creados directamente (data.ok === true)
      showResultado(payload.nombre, data.yaExistia);
      setDraft(null);
      // TODO: Snackbar / refrescar favoritos

    } catch (err) {
      console.error('[FloatingDial] Error:', err);
    }
  };

  /* ---------- usuario confirmó empresa existente ---------- */
  const handleConfirmYes = async (codigo) => {
    const payload = {
      ...confirmData.basePayload,
      confirm: true,
      codigoEmpresaConfirmada: codigo,
    };
    const res = await crearEmpresaRapida({ ...payload, idUsuario });
    setConfirmData(null);
    showResultado(draft.nombre, res.yaExistia);
    setDraft(null);
  };

  /* ---------- usuario quiere crear nueva ---------- */
  const handleConfirmNo = async () => {
    const payload = { ...confirmData.basePayload, confirm: true };
    const res = await crearEmpresaRapida({ ...payload, idUsuario });
    setConfirmData(null);
    showResultado(draft.nombre, res.yaExistia);
    setDraft(null);
  };

  /* ---------- flecha: volver al formulario ---------- */
  const handleBack = () => {
    setConfirmData(null);   // cierra diálogo de confirmación
    setShowModal(true);     // reabre formulario pre-relleno
  };
  /* ---------- acciones del FAB ---------- */
  const acciones = [
    {
      icono: <MdShare size={20} />,
      label: 'Compartir esta página',
      onClick: () => console.log('Compartir'),
      permiso: null, // visible para todos
    },
    {
      icono: <MdFavoriteBorder size={20} />,
      label: 'Añadir empresa a mi directorio',
      onClick: () => setShowModal(true),
      permiso: 'anadir_favoritos', // slug de permiso
    },
  ];

  /* ---------- render ---------- */
  return (
    <>
      {/* DIAL */}
      <div className={styles.wrapper}>
        {acciones.map((a, idx) => (
          <DialMenuItem
            key={a.label}
            icon={a.icono}
            label={a.label}
            permiso={a.permiso}
            onClick={a.onClick}
            delayMs={idx * 60}
            visible={abierto}
          />
        ))}

        <Tooltip title={abierto ? 'Cerrar' : 'Acciones'}>
          <Fab color="primary" onClick={handleToggle} className={styles.mainFab}>
            {abierto ? <MdClose size={24} /> : <MdAdd size={24} />}
          </Fab>
        </Tooltip>
      </div>

      {/* FORMULARIO EMPRESA RÁPIDA */}
      <ModalEmpresaRapida
        open={showModal}
        onClose={() => setShowModal(false)}
        onValidated={handleValidated}
        initialData={draft}          /* ← llena campos si existe borrador */
      />

      {/* MODAL DE CONFIRMACIÓN */}
      {confirmData && (
        <ConfirmEmpresaModal
          open
          empresas={confirmData.empresas}
          draft={{
            nombre: confirmData.basePayload.nombre,
            telefonos: confirmData.basePayload.telefonos,
            ciudad: confirmData.basePayload.ciudadNombre || '', // si la guardas
          }}
          onYes={handleConfirmYes}
          onNo={handleConfirmNo}
          onBack={handleBack}
        />
      )}
    </>
  );
}
