import React from 'react';
import { Fab } from '@material-ui/core';
import { MdAdd } from 'react-icons/md';

export default function FloatingButton({ onClick }) {
  return (
    <Fab
      color="primary"
      aria-label="Agregar"
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1500,
      }}
    >
      <MdAdd size={24} />
    </Fab>
  );
}
