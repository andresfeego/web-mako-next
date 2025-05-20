import React, { useEffect, useState } from 'react';
import stylesGeneral from '../../Listas.module.scss';
import styles from './InterfacesPorPermiso.module.scss';
import TextField from '@material-ui/core/TextField';
import ModalEditarRoles from './Components/ModalEditarRoles';
import CrearEditarInterface from './Components/CrearEditarInterface';
import { getUiPermissions } from '@/components/Inicialized/data/helpersGetDB';

const InterfacesPorPermiso = () => {
  const [interfaces, setInterfaces] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [interfaceSeleccionada, setInterfaceSeleccionada] = useState(null);
  const [modalRolesAbierto, setModalRolesAbierto] = useState(false);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);

  useEffect(() => {
    cargarInterfaces();
  }, []);

  const cargarInterfaces = async () => {
    try {
      const data = await getUiPermissions();
      setInterfaces(data);
    } catch (err) {
      console.error('Error al cargar interfaces:', err);
    }
  };

  const interfacesFiltradas = interfaces.filter((intf) =>
    intf.slug.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={stylesGeneral.lista}>
      <span className={stylesGeneral.title}>Interfaces del sistema</span>
      <div className={stylesGeneral.contentLista}>
        <div className={styles.controles}>
          <TextField
            label="Buscar por slug"
            variant="standard"
            fullWidth
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <div className={styles.btnCrear} onClick={() => setModalCrearAbierto(true)}>
            Crear nueva interfaz
          </div>
        </div>

        <div className={styles.listaInterfaces}>
          {interfacesFiltradas.map((intf) => (
            <div
              key={intf.id}
              className={styles.interfaceItem}
              onClick={() => {
                setInterfaceSeleccionada(intf);
                setModalRolesAbierto(true);
              }}
            >
              <strong>{intf.slug}</strong>
              <span className={styles.tipo}>[{intf.tipo}]</span>
              {intf.descripcion && (
                <div className={styles.descripcion}>{intf.descripcion}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {modalRolesAbierto && interfaceSeleccionada && (
        <ModalEditarRoles
          interfaz={interfaceSeleccionada}
          onClose={() => setModalRolesAbierto(false)}
        />
      )}

      {modalCrearAbierto && (
        <CrearEditarInterface onClose={() => setModalCrearAbierto(false)} />
      )}
    </div>
  );
};

export default InterfacesPorPermiso;
