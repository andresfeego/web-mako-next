import styles from "./Empresa.module.scss"
import Link from 'next/link';
import { MaysPrimera } from '../../Inicialized/GlobalFunctions'
import Image from "next/image";



const Empresa = (props) => {
 

    const empresa = props.empresa
    

    const urllogo = 'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo;


    return (
        <div className={styles.Empresa} >
            { empresa.tipo ==  0 ?
                <Link href={'/' + empresa.codigo} className={styles.Empresa} title={empresa.nombre + " Mako directorio empresarial"}>
                    <div className={styles.logoEmpresa} style={{ border: '2px solid ', borderColor: empresa.color }}>
                        <Image className={styles.logo} width={0} height={0} sizes="100vw" loading="lazy" quality='50' src={urllogo} alt={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} title={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} />
                    </div>
                </Link>
            :
            <Link className={styles.Empresa} href={`/directorio-empresas/${empresa.nombreMun}-${empresa.nombreDep}/${empresa.nombre.replace(/\s/g, '-')}/${empresa.codigo}`} title={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion + " - Mako directorio empresarial"}>
                <div className={styles.logoEmpresa} style={{ border: '2px solid ', borderColor: empresa.color }}>
                    <Image className={styles.logo} width={0} height={0} sizes="100vw" loading="lazy" quality='50' src={urllogo} alt={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} title={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} />
                </div>
            </Link>
            }
            <div className={styles.textoEmpresa}>
                <h3 className={styles.razonSocial}>{empresa.nombre.toProperCase()}</h3>
                <h4 className={styles.ciudad}>{MaysPrimera(empresa.nombreDep) + " - " + MaysPrimera(empresa.nombreMun)}</h4>
                <h4 className={styles.descripcion}>{MaysPrimera(empresa.slogan)}</h4>
            </div>
        </div>
    )

}


String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

export default Empresa;