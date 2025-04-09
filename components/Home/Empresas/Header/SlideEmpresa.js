import React, { useState, useEffect } from 'react'
import styles from './SlideEmpresa.module.scss'
import QueueAnim from 'rc-queue-anim';

import BannerAnim from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import { getImagenesSlideEmpresa } from '@/components/Inicialized/data/helpersGetDB';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;

const SlideEmpresa = ({ empresa, slides }) => {

    const [imageSlider, setImageSlider] = useState(slides)
    const [categoria, setCategoria] = useState(empresa.categoria)
    const [lblCategoria, setLblCategoria] = useState(empresa.lblCategoria)



    useEffect(() => {
        return async() =>{
          const slidesEmpresaJson = await getImagenesSlideEmpresa(empresa.codigo);
            setImageSlider(slidesEmpresaJson)
            setCategoria(empresa.categoria)
            setLblCategoria(empresa.lblCategoria)
        }
    }, [empresa.codigo])

    function Item(item) {
        var urlFondo = "url(https://www.feegosystem.com/scrAppServer/images/empresas/" + empresa.codigo + "/" + item.url + ".jpg)"

        return (
            <Element key={"Elem" + item.id} prefixCls="banner-user-elem">
                <TweenOne animation={{ y: 0, opacity: 0, type: 'from', delay: 200 }} className={styles.degradado} name="TweenOne" id="TweenOne">
                    <div className={styles.degradado} />
                </TweenOne>
                                <QueueAnim name="QueueAnim" key={"h1" + props.idSlide}>{props.titulo}</QueueAnim>
                
                <BgElement key={"bg" + item.id} className="bg" style={{ backgroundImage: urlFondo, backgroundSize: 'cover', backgroundPosition: 'center', }} />
                <div className={styles.textoSlide}>
                    <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne" id="TweenOne">
                        {item.nombre}
                    </TweenOne>
                </div>
            </Element>

        )


    }



    function renderSlide() {
        if (imageSlider.length > 0) {
          console.log('imageslider');
            return imageSlider.map((item) => Item(item));
        } else {
          console.log('categoria');

            if (categoria != '') {
                var urlFondo = "url(https://www.feegosystem.com/scrAppServer/images/categorias/" + categoria + ".jpg)";

                return (
                    <Element key={"fondo1" + categoria} prefixCls="banner-user-elem">
                        <TweenOne animation={{ y: 0, opacity: 0, type: 'from', delay: 200 }} className={styles.degradado} name="TweenOne" id="TweenOne">
                            <div className={styles.degradado} />
                        </TweenOne>
                        <BgElement key={"bg" + categoria} className="bg" style={{ backgroundImage: urlFondo, backgroundSize: 'cover', backgroundPosition: 'center', }} />
                        <div className={styles.textoSlide}>
                            <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne" id="TweenOne">
                                {lblCategoria}
                            </TweenOne>
                        </div>
                    </Element>
                )
            } else {
              <Element key={"fondo1" + categoria} prefixCls="banner-user-elem">
              </Element>
            }

        }
    }


    function createSlides() {
        return (


            <BannerAnim autoPlay type="across" className={styles.contenido}>
                {renderSlide()}
            </BannerAnim>

        )
    }



    return (
        <div className={styles.SlideDetalleEmpresa}>
            {createSlides()}
        </div>
    )
}

export default SlideEmpresa

