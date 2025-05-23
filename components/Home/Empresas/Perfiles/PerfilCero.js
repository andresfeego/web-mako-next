import styles from "./PerfilCero.module.scss";
import { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import Info from '@material-ui/icons/Info';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import DatosContacto from "../Contenido/DatosContacto.js";
import Image from "next/image";
import useDataStore from '@/components/Stores/useDataStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  height: 'fit-content',
  backgroundColor: 'transparent'
};

const PerfilCero = ({ inactivoEmp, Perfilempresa }) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [empresa, setEmpresa] = useState(Perfilempresa);

  const { busqueda, ciudad, categoria, lblCategoria } = useDataStore.getState().search;

  const handleClose = () => {
    setOpen(false);

    const query = {};
    if (busqueda?.trim()) query.busqueda = busqueda;
    if (ciudad?.trim()) query.ciu = ciudad;
    if (categoria && categoria !== '0') query.categoria = categoria;
    if (lblCategoria?.trim()) query.lblCategoria = lblCategoria;

    router.push({
      pathname: '/directorio-empresarial',
      query
    });
  };

  if (!empresa) return null;

  const inactivo = inactivoEmp ? styles.inactivo : '';

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={`${styles.perfilCero} ${inactivo}`}>
          <div className={styles.empresa}>
            <div className={styles.close} onClick={handleClose} />
            <div className={styles.headerEmpresa}>
              <div className={styles.logo}>
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                  quality="50"
                  src={`https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`}
                  alt={`Logo de la empresa ${empresa.nombre}`}
                />
              </div>
              <div className={styles.textHeader}>
                <h2>{empresa.nombre}</h2>
                <h3>{empresa.slogan}</h3>

                <div className={styles.iconos}>
                  <span className={styles.vistos} title="Visualizaciones">
                    <span>{empresa.visto}</span>
                    <Visibility className="colorVistos" />
                  </span>
                  {empresa.promos &&
                    <span className={styles.infos} title="Promociones">
                      <span>{empresa.promos}</span>
                      <Loyalty className="colorPromos" />
                    </span>
                  }
                  {empresa.infos &&
                    <span className={styles.promos} title="Informativos">
                      <span>{empresa.infos}</span>
                      <Info className="colorInfos" />
                    </span>
                  }
                </div>
              </div>
            </div>

            <DatosContacto Perfilempresa={empresa} styles={styles} />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PerfilCero;
