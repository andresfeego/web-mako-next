import styles from './Header.module.scss';
import { MaysPrimera } from '../../../Inicialized/GlobalFunctions';
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import Info from '@material-ui/icons/Info';
import SlideEmpresa from './SlideEmpresa';
import SlideHome from '../../Header/SlideHome'
import stylesSlide from '../Header/SlideEmpresa.module.scss'
import Image from 'next/image';
const Header = ({ empresa, slides }) => {



    const urllogo = `https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`;

    let colorFondo = {}
    if (empresa.colorPrimario) {
        colorFondo = { backgroundColor: empresa.colorPrimario }
    }

    return (
        <div className={styles.header} style={colorFondo}>
            <div className={styles.logo}>
                <Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' src={urllogo} alt={`${empresa.nombre}-${empresa.nombreMun}-${empresa.nombreDep}`} />
            </div>

            <div className={styles.info}>
                <div className={styles.titulo}>
                    <h1>{MaysPrimera(empresa.nombre)}</h1>
                    <h3>{empresa.slogan}</h3>
                    {/* <p>{empresa.descripcion}</p> */}
                </div>

                <div className={styles.iconos}>
                    <span className={styles.vistos}>
                        <Visibility className="colorVistos" />
                        <span>{empresa.visto}</span>
                    </span>

                    {empresa.promos ?
                        <span className={styles.infos}>
                            <Loyalty className="colorPromos" />
                            <span>{empresa.promos}</span>
                        </span>
                        :
                        null

                    }

                    {empresa.infos ?
                        <span className={styles.promos}>
                            <Info className="colorInfos" />
                            <span>{empresa.infos}</span>
                        </span>
                        :
                        null
                    }
                </div>

            </div>

            {/* <SlideEmpresa empresa={empresa} slides={slides} /> */}
            <SlideHome slides={slides} styles={stylesSlide} parent={'headerEmpresa'} />

        </div>
    )
}

export default Header