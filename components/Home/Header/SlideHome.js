import styles from "./SlideHome.module.scss"
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Link from 'next/link';



const { Element } = BannerAnim;
const BgElement = Element.BgElement;

function Item(props) {
    var urlFondo = `url(https://www.feegosystem.com/scrAppServer/images/slides/${props.img})`
    var urlLogo = "url(https://www.feegosystem.com/scrAppServer/images/logos/" + props.descUno + ".png)"
    var urlDestino = `/categorias/${props.descDos}/${props.descUno}`
    if (props.tipoLink == 2) {

    }
    return (
        <Element prefixCls="banner-user-elem" key={props.idSlide}>

            {props.tipoLink == 1 ?
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} className={styles.iconoEmpresa} style={{ backgroundImage: 'url(https://www.feegosystem.com/scrAppServer/images/logo_Mako_Directorio_Comercial_Colombia_512x512.png)', backgroundSize: 'cover', backgroundPosition: 'center', }} />
                :
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} className={styles.iconoEmpresa} style={{ backgroundImage: urlLogo, backgroundSize: 'cover', backgroundPosition: 'center', width: 'auto' }} />
            }
            <Link href={urlDestino} >
                <div className={styles.degradado} />
            </Link>
            <BgElement key={"bg1" + props.idSlide} className="bg" style={{ backgroundImage: urlFondo, backgroundSize: 'cover', backgroundPosition: 'center', }} />
            <div className={styles.textoSlide}>
                <QueueAnim name="QueueAnim" key={"h1" + props.idSlide}>{props.titulo}</QueueAnim>
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne" id="TweenOne">
                    {props.lblCat}
                </TweenOne>
            </div>
        </Element>
    )
}

function createSlides(slides) {
    var aleatorio = Math.round(Math.random() * 1000);
    return (
        <BannerAnim autoPlay autoPlaySpeed={4000} type="across" id={"rand" + aleatorio} className={styles.contenido}>

            {slides.length > 0 ?
                slides.map((item) => Item(item))
                :
                null
            }

        </BannerAnim>
    )
}


const SlideHome = ({ slides }) => {


    return (
        <div className={styles.slide}>
            {createSlides(slides)}
        </div>
    )
}


export default SlideHome