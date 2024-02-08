import styles from "./PerfilCero.module.scss";
import { useState, useEffect } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Info from '@material-ui/icons/Info';
import SendToMobileIcon from '@material-ui/icons/MobileFriendly';
import PhoneForwardedIcon from '@material-ui/icons/Phone';
import { useDataContext, useSetDataContext } from '../Inicialized/DataProvider'
import { useRouter } from 'next/router'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LanguageIcon from '@mui/icons-material/Language';
import XIcon from '@mui/icons-material/X';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MaysPrimera } from "../Inicialized/GlobalFunctions";
import { AddToHomeScreen, Facebook, LocalConvenienceStoreRounded, PaymentSharp, YouTube } from "@material-ui/icons";
import { FacebookOutlined, Instagram, Moped } from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: 'transparent'
};


async function getEmpresa(idComercio) {

    const response = await fetch(process.env.HOST_NAME + '/empresas/' + idComercio,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    if (response.ok) {
        const responseJson = await response.json()
        return await responseJson[0]
    } else {
        return null
    }
}

async function getTelefonos(idComercio) {

    const response = await fetch(process.env.HOST_NAME + '/empresas/telefonos/' + idComercio,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    if (response.ok) {
        const responseJson = await response.json()
        return await responseJson
    } else {
        return null
    }
}

async function getMails(idComercio) {

    const response = await fetch(process.env.HOST_NAME + '/empresas/emails/' + idComercio,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    if (response.ok) {
        const responseJson = await response.json()
        return await responseJson
    } else {
        return null
    }
}

async function getRedes(idComercio) {

    const response = await fetch(process.env.HOST_NAME + '/empresas/redes/' + idComercio,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    if (response.ok) {
        const responseJson = await response.json()
        return await responseJson
    } else {
        return null
    }
}

async function getHorarios(idComercio) {

    const response = await fetch(process.env.HOST_NAME + '/empresas/horarios/' + idComercio,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    if (response.ok) {
        const responseJson = await response.json()
        return await responseJson
    } else {
        return null
    }
}





const PerfilCero = ({ inactivo, Perfilempresa }) => {

    const data = useDataContext();
    const setData = useSetDataContext();

    const [open, setOpen] = useState(true);
    const router = useRouter()


    const handleClose = () => {
        router.push('/some-path')
    };

    function abrirMapaF() {
        setAbrirMapa(!abrirMapa)
    }

    const idComercio = Perfilempresa.codigo

    const [empresa, setEmpresa] = useState(Perfilempresa)
    const [telefonos, setTelefonos] = useState(null)
    const [mails, setMails] = useState()
    const [redes, setRedes] = useState(null)
    const [horarios, setHorarios] = useState(null)
    const [abrirMapa, setAbrirMapa] = useState(false)

    useEffect(() => {
        getTelefonos(idComercio).then((response) => {
            setTelefonos(response); // sets ariaInfo state
        })

        getMails(idComercio).then((response) => {
            setMails(response); // sets ariaInfo state
        })

        getRedes(idComercio).then((response) => {
            setRedes(response); // sets ariaInfo state
        })

        getHorarios(idComercio).then((response) => {
            setHorarios(response); // sets ariaInfo state
        })

    }
        , [empresa]
    );



    function renderTelefonos(telefonos) {
        return (telefonos.map((telefono) =>
            <div className={`${styles.telefono}`}>
                {telefono.tipo == 0 ?
                    <div className={`${styles.rowInfo} tel`}>
                        <a href={'tel:' + telefono.telefono}><SendToMobileIcon className={styles.infoIcon} /></a>
                        {telefono.wp == 1 ?
                            <a target="_blank" href={'https://wa.me/+57' + telefono.telefono + '/?text=Hola te contacto desde tu perfil en  https://www.mako.guru/' + empresa.codigo} > <WhatsAppIcon className={`${styles.whatsapp}`} /> </a>
                            :
                            null
                        }
                        <a href={'tel:' + telefono.telefono}>{telefono.telefono}</a>
                    </div>
                    :
                    <a href={'tel:' + telefono.indicativo + telefono.telefono} className={`${styles.rowInfo} tel`}> <PhoneForwardedIcon className={styles.infoIcon} /> <span>{telefono.telefono}</span></a>
                }

            </div>

        )
        )
    }

    function renderMails(mails) {
        return (mails.map((mail) =>
            <a target="_blank" href={'mailto:' + mail.correo} className={`${styles.rowInfo}`}> <MailOutlineIcon className={styles.infoIcon} /> {mail.correo} </a>
        )
        )
    }

    function renderIconoRedes(descSocial) {
        switch (descSocial) {
            case 'Facebook':
                return <FacebookOutlined className={styles.infoIcon} />
                break;

            case 'Instagram':
                return <Instagram className={styles.infoIcon} />
                break;

            case 'Youtube':
                return <YouTube className={styles.infoIcon} />
                break;

            case 'Twitter':
                return <XIcon className={styles.infoIcon} />
                break;

            default:
                break;
        }
    }

    function renderRedes(redes) {
        return (redes.map((redSocial) =>
            <a target="_blank" href={redSocial.link.toLowerCase().startsWith('w') || redSocial.link.toLowerCase().startsWith('h') ? redSocial.link.toLowerCase() : redSocial.paginaSocial.toLowerCase() + redSocial.link.toLowerCase()} className={`${styles.rowInfo}`}> {renderIconoRedes(redSocial.descSocial)} <span style={{textOverflow: "ellipsis"}}>{redSocial.link.toLowerCase().startsWith('w') || redSocial.link.toLowerCase().startsWith('h') ? redSocial.link.toLowerCase() : redSocial.paginaSocial.toLowerCase() + redSocial.link.toLowerCase()}</span> </a>
        )
        )
    }

    function renderHorarios(horarios) {
        return (horarios.map((horario) =>
            <div className={`${styles.columnInfo} ${styles.horario}`}>
                <span>{horario.descHorario}</span>
                <span>{horario.descJornada}</span>
                <span>{horario.de}</span>
                <span>{horario.a}</span>
            </div>
        )
        )
    }

    if (empresa) {

        var inactivo = '';
        if (inactivo) {
            inactivo = styles.inactivo;
        }


        var lblAbrirMapa = 'Abrir Mapa';
        if (abrirMapa) {
            lblAbrirMapa = <HighlightOffIcon />
        }

        var estiloMapa = '';
        if (abrirMapa) {
            estiloMapa = styles.mapaAbierto;
        }

        return (
            <Modal
                open={open}
                onClose={() => { setOpen(false); router.push('/directorio-empresarial') }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <div className={styles.perfilCero + " " + inactivo}>

                        <div className={styles.empresa}>
                            <div className={styles.close} onClick={() => { setOpen(false); router.push('/directorio-empresarial') }} />
                            <div className={styles.headerEmpresa}>
                                <div className={styles.logo}>
                                    <img src={'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo} alt="" />
                                </div>
                                <div className={styles.textHeader}>
                                    <h2>{empresa.nombre}</h2>
                                    <p>{empresa.slogan}</p>

                                    <div className={styles.iconos}>
                                        <span className={styles.vistos} title="Visualizaciones">
                                            <span>{empresa.visto}</span>
                                            <Visibility className="colorVistos" />
                                        </span>
                                        <span className={styles.infos} title="Promociones">
                                            <span>{empresa.promos}</span>
                                            <Loyalty className="colorPromos" />
                                        </span>
                                        <span className={styles.promos} title="Informativos">
                                            <span>{empresa.infos}</span>
                                            <Info className="colorInfos" />
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.info}>
                                <p className={styles.descripcion}>{empresa.descripcion}</p>
                                <div className={styles.textInfo}>
                                    <div className={styles.textInfoIzq}>

                                        <span className={`${styles.rowInfo}`}><StorefrontIcon className={styles.infoIcon} /> <span>{empresa.direccion}</span></span>
                                        <span className={`${styles.rowInfo}`}><LocationOnIcon className={styles.infoIcon} /> <span>{MaysPrimera(empresa.nombreMun) + " - " + empresa.nombreDep}</span></span>

                                        <div className={styles.telefonos}>
                                            {telefonos ?
                                                renderTelefonos(telefonos)
                                                :
                                                null
                                            }

                                        </div>

                                        {mails ?
                                            renderMails(mails)
                                            :
                                            null
                                        }

                                        {empresa.pagina_web ?
                                            <a href={empresa.pagina_web} target='_blank' className={`${styles.rowInfo}`}> <LanguageIcon className={`${styles.infoIcon}`} />  {empresa.pagina_web}</a>
                                            :
                                            null
                                        }

                                    </div>

                                    <div className={styles.textInfoDer}>

                                        {redes ?
                                            renderRedes(redes)
                                            :
                                            null
                                        }
                                        {horarios ?
                                            <div className={`${styles.rowInfo}`}>
                                                <AccessTimeSharpIcon className={`${styles.infoIcon}`} />
                                                {renderHorarios(horarios)}
                                            </div>
                                            :
                                            null
                                        }

                                        {empresa.datafono ?
                                            <div className={`${styles.rowInfo}`}>
                                                <PaymentSharp className={`${styles.infoIcon}`} />
                                                <span>Aceptamos tarjetas de crédito</span>
                                            </div>
                                            :
                                            null
                                        }

                                        {empresa.transBanCol || empresa.transDavi || empresa.transNequi ?
                                            <div className={`${styles.rowInfo}`}>
                                                <AddToHomeScreen className={`${styles.infoIcon}`} />
                                                <div className={`${styles.transferencias}`}>
                                                    <span>Aceptamos tranferencias desde: </span>
                                                    <section>
                                                        {empresa.transBanCol ? <img src={require('../../scrAppServer/icons/otros/logo_bancolombia.png')} alt="Aceptamos transferencias desde Bancolombia" title="Aceptamos transferencias desde Bancolombia" /> : null}
                                                        {empresa.transDavi ? <img src={require('../../scrAppServer/icons/otros/logo_daviplata.png')} alt="Aceptamos transferencias desde Daviplata" title="Aceptamos transferencias desde Daviplata" /> : null}
                                                        {empresa.transNequi ? <img src={require('../../scrAppServer/icons/otros/logo_nequi.png')} alt="Aceptamos transferencias desde Nequi" title="Aceptamos transferencias desde Nequi" /> : null}
                                                    </section>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }

                                        {empresa.vc_horas == 1 ?
                                            <div className={`${styles.rowInfo}`}>
                                                <LocalConvenienceStoreRounded className={`${styles.infoIcon}`} />
                                                <span>Prestamos servicio las 24 horas</span>
                                            </div>
                                            :
                                            null
                                        }

                                        {empresa.domicilio == 1 ?
                                            <div className={`${styles.rowInfo}`}>
                                                <Moped className={`${styles.infoIcon}`} />
                                                <span>Prestamos servicio a domicilio</span>
                                            </div>
                                            :
                                            null
                                        }

                                    </div>


                                </div>

                                <div className={styles.mapa + " " + estiloMapa}>
                                    <div className={styles.abrirmapa} onClick={() => abrirMapaF()}>{lblAbrirMapa}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>


        )

    } else {
        return null
    }


}



export default PerfilCero;
