import React, { useEffect, useState } from 'react';
import stylesGeneral from '@/components/Solara/Listas.module.scss';
import styles from './RolesUsuarios.module.scss';
import TextField from '@material-ui/core/TextField';
import { getUsuarios } from '@/components/Inicialized/data/helpersGetDB';
import ModalPermisosUsuario from './Components/ModalPermisosUsuario';

const RolesUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
      setUsuariosFiltrados(data);
    } catch (err) {
      console.error('Error al cargar usuarios', err);
    }
  };

  const handleFiltro = (e) => {
    const val = e.target.value.toLowerCase();
    setFiltro(val);
    const filtrados = usuarios.filter(
      (u) =>
        u.nombres.toLowerCase().includes(val) ||
        u.apellidos.toLowerCase().includes(val) ||
        u.correo.toLowerCase().includes(val) ||
        u.id.toString().includes(val)
    );
    setUsuariosFiltrados(filtrados);
  };

  const abrirModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  return (
    <div className={stylesGeneral.lista}>
      <span className={stylesGeneral.title}>Administrar Roles de Usuarios</span>
      <div className={stylesGeneral.contentLista}>
        <div className={styles.buscador}>
          <TextField
            label="Buscar por nombre, correo o ID"
            variant="standard"
            fullWidth
            value={filtro}
            onChange={handleFiltro}
          />
        </div>
        <div className={styles.listaUsuarios}>
          {usuariosFiltrados.map((usuario) => (
            <div
              key={usuario.id}
              className={styles.usuarioItem}
              onClick={() => abrirModal(usuario)}
            >
              <div>
                <strong>{usuario.nombres} {usuario.apellidos}</strong>
              </div>
              <div className={styles.correo}>{usuario.correo}</div>
              <div className={styles.id}>ID: {usuario.id}</div>
            </div>
          ))}
        </div>
      </div>

      {modalAbierto && usuarioSeleccionado && (
        <ModalPermisosUsuario
          usuario={usuarioSeleccionado}
          onClose={() => setModalAbierto(false)}
        />
      )}
    </div>
  );
};

export default RolesUsuarios;
