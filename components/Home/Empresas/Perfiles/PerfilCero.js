import styles from "./PerfilCero.module.scss";
import { useState, useEffect } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Info from '@material-ui/icons/Info';
import SendToMobileIcon from '@material-ui/icons/MobileFriendly';
import PhoneForwardedIcon from '@material-ui/icons/Phone';
import { useDataContext, useSetDataContext } from '../../../Inicialized/DataProvider'
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
import { MaysPrimera } from "../../../Inicialized/GlobalFunctions";
import { AddToHomeScreen, Facebook, LocalConvenienceStoreRounded, PaymentSharp, YouTube } from "@material-ui/icons";
import { Diversity1Rounded, FacebookOutlined, Instagram, Moped } from "@mui/icons-material";
import DatosContacto from "../Contenido/DatosContacto";
import Image from "next/image";

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
    const router = useRouter()

    const [empresa, setEmpresa] = useState(Perfilempresa)


    if (empresa) {

        var inactivo = '';
        if (inactivoEmp) {
            inactivo = styles.inactivo;
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
                                    <Image width={0} height={0} sizes="100vw" loading="lazy" quality='50'  src={'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo} alt="" />
                                </div>
                                <div className={styles.textHeader}>
                                    <h2>{empresa.nombre}</h2>
                                    <h3>{empresa.slogan}</h3>

                                    <div className={styles.iconos}>
                                        <span className={styles.vistos} title="Visualizaciones">
                                            <span>{empresa.visto}</span>
                                            <Visibility className="colorVistos" />
                                        </span>

                                        {empresa.promos ?
                                            <span className={styles.infos} title="Promociones">
                                                <span>{empresa.promos}</span>
                                                <Loyalty className="colorPromos" />
                                            </span>
                                            :
                                            null

                                        }

                                        {empresa.infos ?
                                            <span className={styles.promos} title="Informativos">
                                                <span>{empresa.infos}</span>
                                                <Info className="colorInfos" />
                                            </span>
                                            :
                                            null
                                        }
                                    </div>
                                </div>

                            </div>

                            <DatosContacto Perfilempresa={empresa} styles={styles} />

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
