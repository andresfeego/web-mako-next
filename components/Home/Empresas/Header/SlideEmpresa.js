import React, { useState, useEffect } from 'react';
import styles from './SlideEmpresa.module.scss';

import BannerAnim from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';

import { getImagenesSlideEmpresa } from '@/components/Inicialized/data/helpersGetDB';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;

const SlideEmpresa = ({ empresa, slides }) => {
  const [imageSlider, setImageSlider] = useState(slides);
  const [categoria, setCategoria] = useState(empresa.categoria);
  const [lblCategoria, setLblCategoria] = useState(empresa.lblCategoria);

  useEffect(() => {
    const getSlidesEmpresa = async () => {
      const slidesEmpresaJson = await getImagenesSlideEmpresa(empresa.codigo);
      if (slidesEmpresaJson) {
        setImageSlider(slidesEmpresaJson);
      }
      setCategoria(empresa.categoria);
      setLblCategoria(empresa.lblCategoria);
    };

    getSlidesEmpresa();
  }, [empresa.codigo]);

  function Item(item) {
    const urlFondo = "url(https://www.feegosystem.com/scrApp/" + item.fondo + ")";
    return (
      <Element key={item.id} prefixCls="banner-user-elem">
        <BgElement key="bg" className="bg" style={{ backgroundImage: urlFondo }} />
        {/* Resto del contenido aquí */}
      </Element>
    );
  }

  return (
    <BannerAnim className={styles.bannerWrapper}>
      {imageSlider.map((item) => Item(item))}
    </BannerAnim>
  );
};

export default SlideEmpresa;
