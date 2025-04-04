import { useState, useEffect } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Info from '@material-ui/icons/Info';
import SendToMobileIcon from '@material-ui/icons/MobileFriendly';
import PhoneForwardedIcon from '@mui/icons-material/Phone';
import { useRouter } from 'next/router';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LanguageIcon from '@mui/icons-material/Language';
import XIcon from '@mui/icons-material/X';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MaysPrimera } from "../../../Inicialized/GlobalFunctions";
import { AddToHomeScreen, Facebook, LocalConvenienceStoreRounded, PaymentSharp, YouTube } from "@material-ui/icons";
import { ArrowCircleUp, Diversity1Rounded, FacebookOutlined, Instagram, Moped } from "@mui/icons-material";
import MapaContacto from '../Mapas/MapaContacto';
import Image from 'next/image';

async function getEmpresa(idComercio) {
  const response = await fetch(process.env.HOST_NAME + '/empresas/' + idComercio, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson[0];
  } else {
    return null;
  }
}

async function getTelefonos(idComercio) {
  const response = await fetch(process.env.HOST_NAME + '/empresas/telefonos/' + idComercio, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  } else {
    return null;
  }
}

async function getMails(idComercio) {
  const response = await fetch(process.env.HOST_NAME + '/empresas/emails/' + idComercio, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  } else {
    return null;
  }
}

async function getRedes(idComercio) {
  const response = await fetch(process.env.HOST_NAME + '/empresas/redes/' + idComercio, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  } else {
    return null;
  }
}

async function getHorarios(idComercio) {
  const response = await fetch(process.env.HOST_NAME + '/empresas/horarios/' + idComercio, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  } else {
    return null;
  }
}

const DatosContacto = ({ Perfilempresa, styles }) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const idComercio = Perfilempresa.codigo;
  const [empresa, setEmpresa] = useState(Perfilempresa);
  const [telefonos, setTelefonos] = useState(null);
  const [mails, setMails] = useState(null);
  const [redes, setRedes] = useState(null);
  const [horarios, setHorarios] = useState(null);
  const [abrirMapa, setAbrirMapa] = useState(false);

  useEffect(() => {
    getTelefonos(idComercio).then(setTelefonos);
    getMails(idComercio).then(setMails);
    getRedes(idComercio).then(setRedes);
    getHorarios(idComercio).then(setHorarios);
    setEmpresa(Perfilempresa);
  }, [Perfilempresa]);

  function abrirMapaF() {
    setAbrirMapa(!abrirMapa);
  }

  function renderTelefonos(telefonos) {
    return telefonos.map((telefono, index) =>
      <div key={'keycompTel-' + index} className={styles.telefono}>
        {telefono.tipo == 0 ?
          <div className={styles.rowInfo}>
            <a href={'tel:' + telefono.telefono} title={`Realizar llamada al: ${telefono.telefono}`}><SendToMobileIcon className={styles.infoIcon} /></a>
            {telefono.wp == 1 ? <a target="_blank" title={`Enviar mensaje de Whatsapp al ${telefono.telefono}`} href={'https://wa.me/+57' + telefono.telefono + '/?text=Hola te contacto desde tu perfil en  https://www.mako.guru/' + empresa.codigo}><WhatsAppIcon className={styles.whatsapp} /></a> : null}
            <a href={'tel:' + telefono.telefono} title={`Realizar llamada al: ${telefono.telefono}`} className={styles.tel}><span>llamar </span>{telefono.telefono}</a>
          </div>
          :
          <a href={'tel:' + telefono.indicativo + telefono.telefono} title={`Realizar llamada al: ${telefono.telefono}`} className={styles.rowInfo}><PhoneForwardedIcon className={styles.infoIcon} /> <p className={styles.tel}><span>llamar </span>{telefono.telefono}</p></a>
        }
      </div>
    );
  }

  function renderMails(mails) {
    return mails.map((mail, index) =>
      <a key={'keycompMail-' + index} target="_blank" href={'mailto:' + mail.correo} title={`Enviar correo a: ${mail.correo}`} className={styles.rowInfo}><MailOutlineIcon className={styles.infoIcon} /> {mail.correo}</a>
    );
  }

  function renderIconoRedes(descSocial) {
    switch (descSocial) {
      case 'Facebook': return <FacebookOutlined className={styles.infoIcon} />;
      case 'Instagram': return <Instagram className={styles.infoIcon} />;
      case 'Youtube': return <YouTube className={styles.infoIcon} />;
      case 'Twitter': return <XIcon className={styles.infoIcon} />;
      default: return null;
    }
  }

  function renderRedes(redes) {
    return redes.map((redSocial, index) =>
      <a key={'keycompSocial-' + index} target="_blank" title={`Visitar el ${redSocial.descSocial} de ${empresa.nombre}`} href={redSocial.link.toLowerCase().startsWith('w') || redSocial.link.toLowerCase().startsWith('h') ? redSocial.link.toLowerCase() : redSocial.paginaSocial.toLowerCase() + redSocial.link.toLowerCase()} className={styles.rowInfo}> {renderIconoRedes(redSocial.descSocial)} <span style={{ textOverflow: "ellipsis" }}>{redSocial.link.toLowerCase().startsWith('w') || redSocial.link.toLowerCase().startsWith('h') ? redSocial.link.toLowerCase() : redSocial.paginaSocial.toLowerCase() + redSocial.link.toLowerCase()}</span></a>
    );
  }

  function renderHorarios(horarios) {
    return horarios.map((horario, index) =>
      <div key={'keycompHor-' + index} className={`${styles.columnInfo} ${styles.horario}`}>
        <span>{horario.descHorario}</span>
        <span>{horario.de}</span>
        <span>{horario.a}</span>
      </div>
    );
  }

  const lblAbrirMapa = abrirMapa ? <HighlightOffIcon /> : <ArrowCircleUp />;
  const estiloMapa = abrirMapa ? styles.mapaAbierto : '';
  const urlLogo = `https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`;

  return (
    <div className={styles.info}>
      {empresa.tipo > 0
        ? <h2 className={styles.descripcion}>{empresa.descripcion}</h2>
        : <h3 className={styles.descripcion}>{empresa.descripcion}</h3>}
      <div className={styles.textInfo}>
        <div className={styles.textInfoIzq}>
          <span className={styles.rowInfo}><StorefrontIcon className={styles.infoIcon} /> <span>{empresa.direccion}</span></span>
          <span className={styles.rowInfo}><LocationOnIcon className={styles.infoIcon} /> {empresa.tipo > 0 ? <h2>{MaysPrimera(empresa.nombreMun) + " - " + empresa.nombreDep}</h2> : <h3>{MaysPrimera(empresa.nombreMun) + " - " + empresa.nombreDep}</h3>}</span>
          <div className={styles.telefonos}>{telefonos && renderTelefonos(telefonos)}</div>
          {mails && renderMails(mails)}
          {empresa.pagina_web && <a href={empresa.pagina_web} title={`Pagina Web de ${empresa.nombre}`} target='_blank' className={styles.rowInfo}><LanguageIcon className={styles.infoIcon} /> {empresa.pagina_web}</a>}
        </div>

        <div className={styles.textInfoDer}>
          {redes && renderRedes(redes)}
          {horarios && <div className={styles.rowInfo}><AccessTimeSharpIcon className={styles.infoIcon} /><div className={styles.columnInfo}>{renderHorarios(horarios)}</div></div>}
          {empresa.datafono && <div className={styles.rowInfo}><PaymentSharp className={styles.infoIcon} /><span>Aceptamos tarjetas de crédito</span></div>}
          {(empresa.transBanCol || empresa.transDavi || empresa.transNequi) &&
            <div className={styles.rowInfo}>
              <AddToHomeScreen className={styles.infoIcon} />
              <div className={styles.transferencias}>
                <span>Aceptamos tranferencias desde: </span>
                <div className={styles.contImgTrans}>
                  {empresa.transBanCol && <Image className={styles.imgTrans} width={0} height={0} sizes="100vw" src={require('../../../../scrAppServer/icons/otros/logo_bancolombia.png')} alt="Bancolombia" title="Aceptamos transferencias desde Bancolombia" />}
                  {empresa.transDavi && <Image className={styles.imgTrans} width={0} height={0} sizes="100vw" src={require('../../../../scrAppServer/icons/otros/logo_daviplata.png')} alt="Daviplata" title="Aceptamos transferencias desde Daviplata" />}
                  {empresa.transNequi && <Image className={styles.imgTrans} width={0} height={0} sizes="100vw" src={require('../../../../scrAppServer/icons/otros/logo_nequi.png')} alt="Nequi" title="Aceptamos transferencias desde Nequi" />}
                </div>
              </div>
            </div>}
          {empresa.vc_horas === 1 && <div className={styles.rowInfo}><LocalConvenienceStoreRounded className={styles.infoIcon} /><span>Prestamos servicio las 24 horas</span></div>}
          {empresa.domicilio === 1 && <div className={styles.rowInfo}><Moped className={styles.infoIcon} /><span>Prestamos servicio a domicilio</span></div>}
        </div>
      </div>

      {empresa.lat !== 0 && empresa.lng !== 0 &&
        <div className={`${styles.mapa} ${estiloMapa}`}>
          <div className={styles.mapaContainer}>
            <div className={styles.abrirmapa} onClick={abrirMapaF}>{lblAbrirMapa}</div>
            <MapaContacto nombreEmpresa={empresa.nombre} lat={empresa.lat} lng={empresa.lng} urlLogo={urlLogo} />
          </div>
        </div>}
    </div>
  );
};

export default DatosContacto;
