import styles from './Header.module.scss';
import { MaysPrimera } from '../../../Inicialized/GlobalFunctions';
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import Info from '@material-ui/icons/Info';
import SlideEmpresa from './SlideEmpresa';

const Header = ({ empresa, slides }) => {



    const urllogo = `https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`;

    let colorFondo = {}
    if (empresa.colorPrimario) {
        colorFondo = { backgroundColor: empresa.colorPrimario }
    }

    return (
        <div className={styles.header} style={colorFondo}>
            <div className={styles.logo}>
                <img src={urllogo} alt={`${empresa.nombre}-${empresa.nombreMun}-${empresa.nombreDep}`} />
            </div>

            <div className={styles.info}>
                <div className={styles.titulo}>
                    <h1>{MaysPrimera(empresa.nombre)}</h1>
                    <h3>{empresa.slogan}</h3>
                    <p>{empresa.descripcion}</p>
                </div>

                <div className={styles.iconos}>
                    <span className={styles.vistos}>
                        <Visibility className="colorVistos" />
                        <span>{empresa.visto}</span>
                    </span>
                    <span className={styles.infos}>
                        <Loyalty className="colorPromos" />
                        <span>{empresa.promos}</span>
                    </span>
                    <span className={styles.promos}>
                        <Info className="colorInfos" />
                        <span>{empresa.infos}</span>
                    </span>
                </div>

            </div>

            <SlideEmpresa empresa={empresa} slides={slides} />

        </div>
    )
}

export default Header