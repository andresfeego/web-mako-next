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

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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





const PerfilCero = ({inactivo, Perfilempresa}) => {

    const data = useDataContext();
    const setData = useSetDataContext();

    const [open, setOpen] = useState(true);
    const router = useRouter()


    const handleClose = () => {
        router.push('/some-path')
    };
    
    function abrirMapaF(){
        setAbrirMapa(!abrirMapa)
    }
    
    const idComercio = Perfilempresa.codigo

    const [empresa, setEmpresa] = useState(Perfilempresa)
    const [telefonos, setTelefonos] = useState(null)
    const [mails, setMails] = useState()
    const [abrirMapa, setAbrirMapa] = useState(false)

    useEffect(() => {
        getTelefonos(idComercio).then((response) => {
            setTelefonos(response); // sets ariaInfo state
        })

        getMails(idComercio).then((response) => {
            setMails(response); // sets ariaInfo state
        })

    }
        , [ empresa ]
    );



    function renderTelefonos(telefonos){
        console.log(telefonos[0].telefono);
        return (telefonos.map((telefono) => 
                <div className="telefono">
                    {telefono.tipo == 0 && telefono.wp == 1 ?
                        <a target="_blank" href={'https://wa.me/+57' + telefono.telefono + '/?text=Hola te contacto desde tu perfil en  localhost:3000/' + empresa.codigo} className="whatsapp"> <WhatsAppIcon/> </a>
                        :
                        null
                    }
                    {telefono.tipo == 0 ? 
                        <a href={'tel:' + telefono.telefono} className="tel"> <SendToMobileIcon/> <span>{telefono.telefono}</span></a>
                        :
                        <a href={'tel:' + telefono.indicativo + telefono.telefono} className="tel"> <PhoneForwardedIcon/> <span>{telefono.telefono}</span></a>
                    }
                </div>
                
        )
        )
    }

    if(empresa){
        
        var inactivo = '';
        if (inactivo) {
            inactivo = styles.inactivo;
        }

        
        var lblAbrirMapa = 'Abrir Mapa';
        if (abrirMapa) {
            lblAbrirMapa = 'Cerrar Mapa'
        }

        var estiloMapa = '';
        if (abrirMapa) {
             estiloMapa = styles.mapaAbierto;
        }

        return (
            <Modal
                open={open}
                onClose={()=> {setOpen(false); router.push('/directorio-empresarial')}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
                <Box sx={style}>
                <div className={styles.perfilCero + " " +  inactivo}>

                <div className={styles.empresa}>
                    <div className={styles.close} onClick={()=> {setOpen(false); router.push('/directorio-empresarial')}}/>
                    <div className={styles.headerEmpresa}>
                        <div className={styles.logo}>
                            <img src={'https://www.feegosystem.com/scrAppServer/images/'+empresa.url_logo} alt="" />
                        </div>
                        <div className={styles.textHeader}>
                            <h2>{empresa.nombre}</h2>
                            <p>{empresa.slogan}</p>

                            <div className={styles.iconos}>
                                <span className={styles.vistos}>
                                    <span>{empresa.visto}</span>
                                    <Visibility className="colorVistos" />
                                </span>
                                <span className={styles.infos}>
                                    <span>{empresa.promos}</span>
                                    <Loyalty className="colorPromos" />
                                </span>
                                <span className={styles.promos}>
                                    <span>{empresa.infos}</span>
                                    <Info className="colorInfos" />
                                </span>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.info}>
                        <div className={styles.textInfo}>
                            
                            <p>{empresa.descripcion}</p>
                            
                            <span>{empresa.direccion + "  " + empresa.nombreMun + " - " + empresa.nombreDep}</span>
                            
                            <div className={styles.telefonos}>
                                {
                                    telefonos ? 
                                    renderTelefonos(telefonos)
                                    :
                                    null
                                }
                                
                            </div>
                            
                            <div className={styles.correos}>
                                
                            </div>

                        </div>

                        <div className={styles.mapa + " " + estiloMapa}>
                            <div className={styles.abrirmapa} onClick={()=> abrirMapaF()}>{lblAbrirMapa}</div>
                        </div>

                    </div>
                </div>
            </div>
                </Box>
            </Modal>

            
        )
    
    }else{
        return null
    }
    
    
}



export default PerfilCero;
