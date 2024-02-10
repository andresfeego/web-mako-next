import styles from "./Empresa.module.scss"
import Link from 'next/link';
import { MaysPrimera } from '../../Inicialized/GlobalFunctions'
import { useDataContext, useSetDataContext } from "../../Inicialized/DataProvider";
import Image from "next/image";



const Empresa = (props) => {
    const data = useDataContext();
    const setData = useSetDataContext();

    const empresa = props.empresa
    function ver(codigo) {
        setData({search: {...data.search, idComercio: codigo}})
    }

    const urllogo = 'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo;


    return (
        <div className={styles.Empresa} >
            { empresa.tipo ==  0 ?
                <Link href={'/' + empresa.codigo} >
                    <div className={styles.logoEmpresa} style={{ border: '2px solid ', borderColor: empresa.color }}>
                        <Image priority={true} className={styles.logo} width={0} height={0} sizes="100vw" loading="lazy" quality='50' src={urllogo} alt={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} title={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} />
                    </div>
                </Link>
            :
            <Link className={styles.Empresa} href={`/directorio-empresas/${empresa.nombreMun}-${empresa.nombreDep}/${empresa.nombre.replace(/\s/g, '-')}/${empresa.codigo}`} title={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion + " - Mako directorio empresarial"}>
                <div className={styles.logoEmpresa} style={{ border: '2px solid ', borderColor: empresa.color }}>
                    <Image priority={true} className={styles.logo} width={0} height={0} sizes="100vw" loading="lazy" quality='50' src={urllogo} alt={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} title={empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion} />
                </div>
            </Link>
            }
            <div className={styles.textoEmpresa}>
                <h2 className={styles.razonSocial}>{empresa.nombre.toProperCase()}</h2>
                <h3 className={styles.ciudad}>{MaysPrimera(empresa.nombreDep) + " - " + MaysPrimera(empresa.nombreMun)}</h3>
                <h3 className={styles.descripcion}>{MaysPrimera(empresa.slogan)}</h3>
            </div>
        </div>
    )

}


String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

export default Empresa;