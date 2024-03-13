import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cargando from '../../Inicialized/Cargando';
import Image from 'next/image';



const { Element } = BannerAnim;
const BgElement = Element.BgElement;

function Item(props, styles ) {

   

    var urlFondo = `https://www.feegosystem.com/scrAppServer/images/slides/${props.img}`
    var urlLogo = "url(https://www.feegosystem.com/scrAppServer/images/logos/" + props.descUno + ".png)"
    var urlDestino = `/categorias/${props.descDos}/${props.descUno}`
    if (props.tipoLink == 2) {

    }
    return (
        <Element prefixCls="banner-user-elem" key={props.idSlide}>

            {props.tipoLink == 1 ?
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} className={styles.iconoEmpresa} style={{ backgroundImage: 'url(https://www.feegosystem.com/scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512-2.webp)', backgroundSize: 'cover', backgroundPosition: 'center', }} />
                :
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} className={styles.iconoEmpresa} style={{ backgroundImage: urlLogo, backgroundSize: 'cover', backgroundPosition: 'center',}} />
            }
            <Link aria-label="Ver más de la categoría" title="Ver más de la categoría" href={urlDestino} >
                <div className={styles.degradado} />
            </Link>
            <BgElement key={"bg1" + props.idSlide} className="bg" style={{  backgroundSize: 'cover', backgroundPosition: 'center', }} >
                        <Image width={0} height={0} sizes="100vw" loading="lazy" quality='40' className={styles.backg} src={urlFondo} alt='Slide Mako Directorio comercial'/>
                </BgElement>
            <div className={styles.textoSlide}>
                <QueueAnim name="QueueAnim" key={"h1" + props.idSlide}>{props.titulo}</QueueAnim>
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne" id="TweenOne">
                    {props.lblCat}
                </TweenOne>
            </div>
        </Element>
    )
}

function createSlides(slides, styles ) {
    var aleatorio = Math.round(Math.random() * 1000);
    return (
        <BannerAnim autoPlay autoPlaySpeed={4000} type="across" id={"rand" + aleatorio} className={styles.contenido}>

            {slides.length > 0 ?
                slides.map((item) => Item(item, styles ))
                :
                null
            }

        </BannerAnim>
    )
}


const SlideHome = ({ styles, parent }) => {

    const [slides, setSlides] = useState(null)

    useEffect(() =>{
        fetch(process.env.HOST_NAME + '/slides')
        .then((res) => res.json())
        .then((data) =>{
            setSlides(data)
        })
    
    }, [])

    return (
        <div className={`${styles.slide} ${parent}`}>
            {slides ? createSlides(slides, styles ): <Cargando/>}
        </div>
    )
}


export default SlideHome