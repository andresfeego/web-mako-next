import React, { useEffect, useState } from 'react';
import stylesGeneral from '../../Listas.module.scss';
import styles from './RolesInterfaces.module.scss';
import TextField from '@material-ui/core/TextField';
import { getRolesDisponibles } from '@/components/Inicialized/data/helpersGetDB';
import ModalEditarPermisos from './Components/ModalEditarPermisos';
import CrearEditarInterface from './Components/CrearEditarInterface';

const RolesInterfaces = () => {
  const [roles, setRoles] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [modalPermisosAbierto, setModalPermisosAbierto] = useState(false);
  const [modalCrearInterfaceAbierto, setModalCrearInterfaceAbierto] = useState(false);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      const data = await getRolesDisponibles(); // ⚠️ Asegúrate de tener este helper
      setRoles(data);
    } catch (err) {
      console.error('Error cargando roles:', err);
    }
  };

  const filtrarRoles = roles.filter((rol) =>
    rol.rol.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={stylesGeneral.lista}>
      <span className={stylesGeneral.title}>Interfaces por Rol</span>
      <div className={stylesGeneral.contentLista}>
        <div className={styles.controles}>
          <TextField
            label="Buscar rol"
            variant="standard"
            fullWidth
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <div className={styles.btnCrear} onClick={() => setModalCrearInterfaceAbierto(true)}>
            Crear nueva interfaz
          </div>
        </div>

        <div className={styles.listaRoles}>
          {filtrarRoles.map((rol) => (
            <div
              key={rol.id}
              className={styles.rolItem}
              onClick={() => {
                setRolSeleccionado(rol);
                setModalPermisosAbierto(true);
              }}
            >
              <strong>{rol.rol}</strong>
            </div>
          ))}
        </div>
      </div>

      {modalPermisosAbierto && rolSeleccionado && (
        <ModalEditarPermisos
          rol={rolSeleccionado}
          onClose={() => setModalPermisosAbierto(false)}
        />
      )}

      {modalCrearInterfaceAbierto && (
        <CrearEditarInterface onClose={() => setModalCrearInterfaceAbierto(false)} />
      )}
    </div>
  );
};

export default RolesInterfaces;
