import { useState, useEffect } from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { MdMobileFriendly } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import { CiLocationOn } from "react-icons/ci";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineHighlightOff } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { FiTwitter } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";


import AddToHomeScreen from '@material-ui/icons/AddToHomeScreen';
import LocalConvenienceStoreRounded from '@material-ui/icons/LocalConvenienceStoreRounded';
import PaymentSharp from '@material-ui/icons/PaymentSharp';
import YouTube from '@material-ui/icons/YouTube';

import { MdArrowCircleUp } from "react-icons/md";
import { TbBrandFacebook } from "react-icons/tb";
import Instagram from '@material-ui/icons/Instagram';
import { MdOutlineDeliveryDining } from "react-icons/md";


import { MaysPrimera } from "../../../Inicialized/GlobalFunctions";
import MapaContacto from '../Mapas/MapaContacto';
import Image from 'next/image';

import { getTelefonosEmpresa, getEmailsEmpresa, getRedesEmpresa, getHorariosEmpresa } from "@/components/Inicialized/data/helpersGetDB";


async function getTelefonos(idComercio) {
  const res = await getTelefonosEmpresa(idComercio);
  return res || null;
}

async function getMails(idComercio) {
  const res = await getEmailsEmpresa(idComercio);
  return res || null;
}

async function getRedes(idComercio) {
  const res = await getRedesEmpresa(idComercio);
  return res || null;
}

async function getHorarios(idComercio) {
  const res = await getHorariosEmpresa(idComercio);
  return res || null;
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
            <a href={'tel:' + telefono.telefono} title={`Realizar llamada al: ${telefono.telefono}`}><MdMobileFriendly className={styles.infoIcon} /></a>
            {telefono.wp == 1 ? <a target="_blank" title={`Enviar mensaje de Whatsapp al ${telefono.telefono}`} href={'https://wa.me/+57' + telefono.telefono + '/?text=Hola te contacto desde tu perfil en  https://www.mako.guru/' + empresa.codigo}><WhatsAppIcon className={styles.whatsapp} /></a> : null}
            <a href={'tel:' + telefono.telefono} title={`Realizar llamada al: ${telefono.telefono}`} className={styles.tel}><span>llamar </span>{telefono.telefono}</a>
          </div>
          :
          <a href={'tel:' + telefono.indicativo + telefono.telefono} title={`Realizar llamada al: ${telefono.telefono}`} className={styles.rowInfo}><FaPhoneAlt className={styles.infoIcon} /> <p className={styles.tel}><span>llamar </span>{telefono.telefono}</p></a>
        }
      </div>
    );
  }

  function renderMails(mails) {
    return mails.map((mail, index) =>
      <a key={'keycompMail-' + index} target="_blank" href={'mailto:' + mail.correo} title={`Enviar correo a: ${mail.correo}`} className={styles.rowInfo}><MdMailOutline className={styles.infoIcon} /> {mail.correo}</a>
    );
  }

  function renderIconoRedes(descSocial) {
    switch (descSocial) {
      case 'Facebook': return <TbBrandFacebook className={styles.infoIcon} />;
      case 'Instagram': return <Instagram className={styles.infoIcon} />;
      case 'Youtube': return <YouTube className={styles.infoIcon} />;
      case 'Twitter': return <FiTwitter className={styles.infoIcon} />;
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

  const lblAbrirMapa = abrirMapa ? <MdOutlineHighlightOff /> : <MdArrowCircleUp />;
  const estiloMapa = abrirMapa ? styles.mapaAbierto : '';
  const urlLogo = `https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`;

  return (
    <div className={styles.info}>
      {empresa.tipo > 0
        ? <h2 className={styles.descripcion}>{empresa.descripcion}</h2>
        : <h3 className={styles.descripcion}>{empresa.descripcion}</h3>}
      <div className={styles.textInfo}>
        <div className={styles.textInfoIzq}>
          <span className={styles.rowInfo}><MdMailOutline className={styles.infoIcon} /> <span>{empresa.direccion}</span></span>
          <span className={styles.rowInfo}><CiLocationOn className={styles.infoIcon} /> {empresa.tipo > 0 ? <h2>{MaysPrimera(empresa.nombreMun) + " - " + empresa.nombreDep}</h2> : <h3>{MaysPrimera(empresa.nombreMun) + " - " + empresa.nombreDep}</h3>}</span>
          <div className={styles.telefonos}>{telefonos && renderTelefonos(telefonos)}</div>
          {mails && renderMails(mails)}
          {empresa.pagina_web && <a href={empresa.pagina_web} title={`Pagina Web de ${empresa.nombre}`} target='_blank' className={styles.rowInfo}><GrLanguage className={styles.infoIcon} /> {empresa.pagina_web}</a>}
        </div>

        <div className={styles.textInfoDer}>
          {redes && renderRedes(redes)}
          {Array.isArray(horarios) && horarios.length > 0 &&(<div className={styles.rowInfo}><MdAccessTime className={styles.infoIcon} /><div className={styles.columnInfo}>{renderHorarios(horarios)}</div></div>)}
          {empresa.datafono !== 0 && <div className={styles.rowInfo}><PaymentSharp className={styles.infoIcon} /><span>Aceptamos tarjetas de crédito</span></div>}
          {(empresa.transBanCol !== 0 || empresa.transDavi !== 0 || empresa.transNequi !== 0) &&
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
          {empresa.domicilio === 1 && <div className={styles.rowInfo}><MdOutlineDeliveryDining className={styles.infoIcon} /><span>Prestamos servicio a domicilio</span></div>}
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
