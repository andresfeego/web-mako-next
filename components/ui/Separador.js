import { useEffect, useState } from 'react';
import styles from './Separador.module.scss';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { getRolesUsuario } from '@/components/Inicialized/data/helpersGetDB';

export default function Separador({
  texto = '',
  tamano = 'md',
  rolRequerido = null,
  conMargenes = false,
  collapsed = false
}) {
  const idUsuario = useUsuarioStore((state) => state.usuario);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    let cancelado = false;

    if (rolRequerido && idUsuario) {
      getRolesUsuario(idUsuario).then((rolesDB) => {
        if (cancelado) return;

        const nombresRoles = rolesDB.map((r) => r.rol.toLowerCase());
        const rolBuscado = rolRequerido.toLowerCase();

        setMostrar(nombresRoles.includes(rolBuscado));
      }).catch((err) => {
        console.error('[Separador] Error al validar rol:', err);
        setMostrar(false);
      });
    } else {
      setMostrar(!rolRequerido);
    }

    return () => { cancelado = true };
  }, [rolRequerido, idUsuario]);

  if (!mostrar) return null;

  const claseTamano = {
    sm: styles.textoSm,
    md: styles.textoMd,
    lg: styles.textoLg,
    xl: styles.textoXl,
  }[tamano] || styles.textoMd;

  const claseWrapper = `${styles.wrapper} ${conMargenes ? styles.wrapperConMargenes : ''} ${collapsed ? styles.collapsedWrapper : ''}`;
  const claseTexto = `${styles.textoBase} ${claseTamano} ${collapsed ? styles.textoColapsado : ''}`;

  return (
    <div className={claseWrapper}>
      <div className={styles.linea} />
      {!collapsed && <span className={claseTexto}>{texto}</span>}
    </div>
  );
}
