import React, { useEffect, useState } from 'react';
import stylesGeneral from '../../Listas.module.scss';
import styles from './InterfacesPorPermiso.module.scss';
import TextField from '@material-ui/core/TextField';
import ModalEditarRoles from './Components/ModalEditarRoles';
import CrearEditarInterface from '@/components/Solara/Laboratorio/RolesInterfaces/Components/CrearEditarInterface';
import EditarInterface from './Components/EditarInterface';
import MenuOpcionesInterface from './Components/MenuOpcionesInterface';
import { getUiPermissions } from '@/components/Inicialized/data/helpersGetDB';
import { eliminarUiPermission } from '@/components/Inicialized/data/helpersSetDB';
import { nuevoMensaje, tiposAlertas } from '@/components/Inicialized/Toast';

const InterfacesPorPermiso = () => {
  const [interfaces, setInterfaces] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [interfaceSeleccionada, setInterfaceSeleccionada] = useState(null);
  const [modalRolesAbierto, setModalRolesAbierto] = useState(false);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [menuActivo, setMenuActivo] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const [interfaceMenu, setInterfaceMenu] = useState(null);

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

  const handleMenuOpen = (e, intf) => {
  e.stopPropagation();
  setAnchorEl(e.currentTarget);
  setInterfaceMenu(intf);
  setMenuActivo(true); // 🔥 importante
};

  const handleMenuClose = () => {
    setAnchorEl(null);
    setInterfaceMenu(null);
    setTimeout(() => setMenuActivo(false), 0); // ⬅️ defer para evitar conflicto inmediato
    };

  const handleEditar = () => {
    setModalEditarAbierto(true);
    // No cerrar aquí
  };

const handleEliminar = async () => {
  const confirmar = confirm(`¿Eliminar la interfaz "${interfaceMenu.slug}"?`);
  if (confirmar) {
    try {
      await eliminarUiPermission(interfaceMenu.id);
      cargarInterfaces();
      nuevoMensaje(tiposAlertas.success, 'Interfaz eliminada');
    } catch (err) {
        console.log(err);
      if (err?.errno === 1451) {
        nuevoMensaje(tiposAlertas.warn, err.error);
      } else {
        nuevoMensaje(tiposAlertas.error, '❌ Error al eliminar interfaz');
      }
    }
  }
  handleMenuClose();
};

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
                if (menuActivo) return;
                setInterfaceSeleccionada(intf);
                setModalRolesAbierto(true);
              }}
            >
              <div className={styles.menuWrapper}>
                <MenuOpcionesInterface
                  interfaz={intf}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && interfaceMenu?.id === intf.id)}
                  onOpen={handleMenuOpen}
                  onClose={handleMenuClose}
                  onEditar={handleEditar}
                  onEliminar={handleEliminar}
                />
              </div>

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
        <CrearEditarInterface
          onClose={() => {
            setModalCrearAbierto(false);
            cargarInterfaces();
          }}
        />
      )}

      {modalEditarAbierto && interfaceMenu && (
        <EditarInterface
          interfaz={interfaceMenu}
          onClose={() => {
            setModalEditarAbierto(false);
            handleMenuClose(); // ⬅️ aquí se limpia después del cierre
            cargarInterfaces();
          }}
        />
      )}
    </div>
  );
};

export default InterfacesPorPermiso;
