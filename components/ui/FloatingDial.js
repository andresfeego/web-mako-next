import React, { useState } from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import {
  MdAdd,
  MdFavoriteBorder,
  MdShare,
  MdClose,
  MdAddPhotoAlternate,      // 🆕 icono para tarjeta
} from 'react-icons/md';

import styles from './FloatingDial.module.scss';

import DialMenuItem from './DialMenuItem';
import ModalEmpresaRapida from '@/components/ui/modals/ModalEmpresaRapida/ModalEmpresaRapida';
import ConfirmEmpresaModal from '@/components/ui/modals/ModalEmpresaRapida/ConfirmEmpresaModal';
import GuardarTarjetaModal from '@/components/ui/modals/guardarTarjeta/GuardarTarjetaModal'; // 🆕 ruta

import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { crearEmpresaRapida } from '@/components/Inicialized/data/helpersSetDB';
import { actualizarPermisos } from '@/components/Inicialized/data/helpersGetDB';
import { nuevoMensaje, tiposAlertas } from '../Inicialized/Toast';

export default function FloatingDial() {
  /* ---------- local state ---------- */
  const [abierto, setAbierto] = useState(false);
  const [showModal, setShowModal] = useState(false);             // empresa rápida
  const [showModalTarjeta, setShowModalTarjeta] = useState(false); // 🆕 tarjeta / volante
  const [confirmData, setConfirmData] = useState(null);
  const [draft, setDraft] = useState(null);
  const idUsuario = useUsuarioStore((s) => s.usuario);

  /* ---------- util ---------- */
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
    if (!abierto && idUsuario) await actualizarPermisos(idUsuario);
    setAbierto((p) => !p);
  };

  /* ---------- lógica empresa rápida (sin cambios) ---------- */
  const handleValidated = async (payload) => { /* … */ };
  const handleConfirmYes = async (codigo) => { /* … */ };
  const handleConfirmNo = async () => { /* … */ };
  const handleBack = () => { /* … */ };

  /* ---------- acciones del FAB ---------- */
  const acciones = [
    {
      icono: <MdShare size={20} />,
      label: 'Compartir esta página',
      onClick: () => console.log('Compartir'),
      permiso: null,
    },
    {
      icono: <MdFavoriteBorder size={20} />,
      label: 'Añadir empresa a mi directorio',
      onClick: () => setShowModal(true),
      permiso: 'anadir_favoritos',
    },
    {                                   // 🆕 NUEVO ÍTEM
      icono: <MdAddPhotoAlternate size={20} />,
      label: 'Guardar tarjeta o volante',
      onClick: () => setShowModalTarjeta(true),
      permiso: 'anadir_favoritos',      // usa el mismo slug o null según tu lógica
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
        initialData={draft}
      />

      {/* MODAL DE CONFIRMACIÓN EMPRESA EXISTENTE */}
      {confirmData && (
        <ConfirmEmpresaModal
          open
          empresas={confirmData.empresas}
          draft={{
            nombre: confirmData.basePayload.nombre,
            telefonos: confirmData.basePayload.telefonos,
            ciudad: confirmData.basePayload.ciudadNombre || '',
          }}
          onYes={handleConfirmYes}
          onNo={handleConfirmNo}
          onBack={handleBack}
        />
      )}

      {/* 🆕 MODAL GUARDAR TARJETA / VOLANTE */}
      <GuardarTarjetaModal
        open={showModalTarjeta}
        onClose={() => setShowModalTarjeta(false)}
      />
    </>
  );
}
