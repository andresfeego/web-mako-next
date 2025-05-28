// components/ui/FloatingDial/DialMenuItem.js
import React from 'react';
import { Fab, Zoom } from '@material-ui/core';
import styles from './DialMenuItem.module.scss';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';

/**
 * Props:
 * icon       – <ReactElement>  (el ícono que quieras)
 * label      – string          (texto tooltip)
 * onClick    – function
 * permiso?   – string          (slug; si no lo tiene el usuario => null)
 * delayMs    – number          (para stagger animation)
 */
export default function DialMenuItem({ icon, label, onClick, permiso, delayMs = 0 , visible = false}) {
  const permisos = useUsuarioStore((s) => s.uiPermisos || []);

  if (permiso && !permisos.includes(permiso)) return null;

  return (
    <Zoom in={visible} style={{ transitionDelay: `${delayMs}ms` }}>
      <div className={styles.itemWrapper}>
        <Fab
          color="secondary"
          size="small"
          aria-label={label}
          onClick={onClick}
          className={styles.fab}
        >
          {icon}
        </Fab>
        <span className={styles.label}>{label}</span>
      </div>
    </Zoom>
  );
}
