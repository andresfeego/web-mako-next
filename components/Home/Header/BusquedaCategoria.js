import React from 'react';
import styles from './BusquedaCategoria.module.scss';
import { EvBiBusqueda } from '../../Inicialized/Bitacora';
import Image from 'next/image';
import useDataStore from '@/components/Stores/useDataStore';

const BusquedaCategorias = (props) => {
  const setSearch = useDataStore((state) => state.setSearch);

  function cambiaCat(cat, label) {
    if (cat !== 0) EvBiBusqueda('Busqueda categoria', cat);
    setSearch({ categoria: cat, lblCategoria: label });
  }

  return (
		<ul className={styles.BusquedaCategorias}>

			<li className={styles.touch} id="makoTouch" onClick={() => cambiaCat(299, 'Asesor MAKO')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/mako.png')} />
				</div>
				<h3 className={styles.textoCat}> Asesor MAKO</h3>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(19, 'Domicilios     p-a-p')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/pap.png')} />
				</div>
				<h3 className={styles.textoCat}>Domicilios     p-a-p</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(1, 'Taxis')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/taxis.png')} />
				</div>
				<h3 className={styles.textoCat}>Taxis</h3>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(301, 'Alquiler de lavadoras')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/lavadoras.png')} />
				</div>
				<h3 className={styles.textoCat}>Alquiler de lavadoras</h3>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(127, 'Cerrajeros')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/cerrajeros.png')} />
				</div>
				<h3 className={styles.textoCat}> Cerrajeros</h3>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(3, 'Acarreos')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/acarreos.png')} />
				</div>
				<h3 className={styles.textoCat}> Acarreos</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(30, 'Asaderos')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/asaderos.png')} />
				</div>
				<h3 className={styles.textoCat}> Asaderos</h3>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(102, 'Bares')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/bares.png')} />
				</div>
				<h3 className={styles.textoCat}> Bares</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(31, 'Cafeterías')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/cafeterias.png')} />
				</div>
				<h3 className={styles.textoCat}> Cafeterías</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(28, 'Comida china')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/china.png')} />
				</div>
				<h3 className={styles.textoCat}> Comida china</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(26, 'Comidas rápidas')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/rapida.png')} />
				</div>
				<h3 className={styles.textoCat}> Comidas rápidas</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(53, 'Detalles y regalos')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/detalles.png')} />
				</div>
				<h3 className={styles.textoCat}> Detalles y regalos</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(24, 'Restaurante ejectivo')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/ejecutivo.png')} />
				</div>
				<h3 className={styles.textoCat}> Restaurante ejectivo</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(167, 'Funerarias')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/funerarias.png')} />
				</div>
				<h3 className={styles.textoCat}> Funerarias</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(36, 'Heladerías')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/heladerias.png')} />
				</div>
				<h3 className={styles.textoCat}> Heladerías</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(43, 'Licoreras')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/licoreras.png')} />
				</div>
				<h3 className={styles.textoCat}> Licoreras</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(151, 'Mariachis')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/mariachis.png')} />
				</div>
				<h3 className={styles.textoCat}> Mariachis</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(22, 'Parqueaderos')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/parqueaderos.png')} />
				</div>
				<h3 className={styles.textoCat}> Parqueaderos</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(41, 'Pastelerías')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/pastelerias.png')} />
				</div>
				<h3 className={styles.textoCat}>Pastelerías</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(109, 'Piscinas')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/piscinas.png')} />
				</div>
				<h3 className={styles.textoCat}>Piscinas</h3>
			</li>




			<li className={styles.touch} onClick={() => cambiaCat(256, 'Droguerías')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/drogas.png')} />
				</div>
				<h3 className={styles.textoCat}>Droguerías</h3>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(205, 'Veterinarias')} >
				<div className={styles.circulo}>
					<Image width={0} height={0} sizes="100vw" loading="lazy" quality='50' alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/veterinarias.png')} />
				</div>
				<h3 className={styles.textoCat}>Veterinarias</h3>
			</li>

		</ul>
	)

}

export default BusquedaCategorias;