import styles from "./PerfilCero.module.scss";
import { connect } from 'react-redux'
import { clearIdComercio } from '../Inicialized/Actions';
import { useState, useEffect } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Info from '@material-ui/icons/Info';
import SendToMobileIcon from '@material-ui/icons/MobileFriendly';
import PhoneForwardedIcon from '@material-ui/icons/Phone';
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





const PerfilCero = (props) => {

    function cerrar() {
        props.clearIdComercio();
    }

    function abrirMapaF(){
        setAbrirMapa(!abrirMapa)
    }
    
    const idComercio = props.idComercio

    const [empresa, setEmpresa] = useState()
    const [telefonos, setTelefonos] = useState(null)
    const [mails, setMails] = useState()
    const [abrirMapa, setAbrirMapa] = useState(false)

    useEffect(() => {
        getEmpresa(idComercio).then((response) => {
            setEmpresa(response); // sets ariaInfo state
        })

        getTelefonos(idComercio).then((response) => {
            setTelefonos(response); // sets ariaInfo state
        })

        getMails(idComercio).then((response) => {
            setMails(response); // sets ariaInfo state
        })

    }
        , [ idComercio ]
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
        if (props.inactivo) {
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
            <div className={styles.perfilCero + " " +  inactivo}>
                <div className={styles.fondoEmpresa} />

                <div className={styles.empresa}>
                    <div className={styles.close} onClick={() => cerrar()}/>
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
        )
    
    }else{
        return null
    }
    
    
}

const mapStateToProps = (state) => {
    return {
        idComercio: state.idComercio,
    }
}

const mapDispatchToProps = {
    clearIdComercio: clearIdComercio
}


export default connect(mapStateToProps, mapDispatchToProps)(PerfilCero);
