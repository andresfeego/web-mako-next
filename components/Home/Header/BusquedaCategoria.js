import React from 'react'
import { connect } from 'react-redux'
import styles from './BusquedaCategoria.module.scss'
import { saveCategoria, savelblCategoria } from '../../Inicialized/Actions';


const BusquedaCategorias = (props) => {

	function cambiaCat(cat, label) {
		props.saveCategoria(cat);
		props.savelblCategoria(label);
	}

	return (
		<ul className={styles.BusquedaCategorias}>


			<li className={styles.touch} id="makoTouch" onClick={() => cambiaCat(299, 'Asesor MAKO')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/mako.png')} />
				</div>
				<h2 className={styles.textoCat}> Asesor MAKO</h2>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(19, 'Domicilios     p-a-p')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/pap.png')} />
				</div>
				<h2 className={styles.textoCat}>Domicilios     p-a-p</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(1, 'Taxis')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/taxis.png')} />
				</div>
				<h2 className={styles.textoCat}>Taxis</h2>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(301, 'Alquiler de lavadoras')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/lavadoras.png')} />
				</div>
				<h2 className={styles.textoCat}>Alquiler de lavadoras</h2>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(127, 'Cerrajeros')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/cerrajeros.png')} />
				</div>
				<h2 className={styles.textoCat}> Cerrajeros</h2>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(3, 'Acarreos')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/acarreos.png')} />
				</div>
				<h2 className={styles.textoCat}> Acarreos</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(30, 'Asaderos')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/asaderos.png')} />
				</div>
				<h2 className={styles.textoCat}> Asaderos</h2>
			</li>

			<li className={styles.touch} onClick={() => cambiaCat(102, 'Bares')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/bares.png')} />
				</div>
				<h2 className={styles.textoCat}> Bares</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(31, 'Cafeterías')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/cafeterias.png')} />
				</div>
				<h2 className={styles.textoCat}> Cafeterías</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(28, 'Comida china')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/china.png')} />
				</div>
				<h2 className={styles.textoCat}> Comida china</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(26, 'Comidas rápidas')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/rapida.png')} />
				</div>
				<h2 className={styles.textoCat}> Comidas rápidas</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(53, 'Detalles y regalos')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/detalles.png')} />
				</div>
				<h2 className={styles.textoCat}> Detalles y regalos</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(24, 'Restaurante ejectivo')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/ejecutivo.png')} />
				</div>
				<h2 className={styles.textoCat}> Restaurante ejectivo</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(167, 'Funerarias')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/funerarias.png')} />
				</div>
				<h2 className={styles.textoCat}> Funerarias</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(36, 'Heladerías')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/heladerias.png')} />
				</div>
				<h2 className={styles.textoCat}> Heladerías</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(43, 'Licoreras')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/licoreras.png')} />
				</div>
				<h2 className={styles.textoCat}> Licoreras</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(151, 'Mariachis')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/mariachis.png')} />
				</div>
				<h2 className={styles.textoCat}> Mariachis</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(22, 'Parqueaderos')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/parqueaderos.png')} />
				</div>
				<h2 className={styles.textoCat}> Parqueaderos</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(41, 'Pastelerías')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/pastelerias.png')} />
				</div>
				<h2 className={styles.textoCat}>Pastelerías</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(109, 'Piscinas')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/piscinas.png')} />
				</div>
				<h2 className={styles.textoCat}>Piscinas</h2>
			</li>




			<li className={styles.touch} onClick={() => cambiaCat(256, 'Droguerías')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/drogas.png')} />
				</div>
				<h2 className={styles.textoCat}>Droguerías</h2>
			</li>


			<li className={styles.touch} onClick={() => cambiaCat(205, 'Veterinarias')} >
				<div className={styles.circulo}>
					<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className={styles.icono} src={require('../../../scrAppServer/icons/veterinarias.png')} />
				</div>
				<h2 className={styles.textoCat}>Veterinarias</h2>
			</li>

		</ul>
	)

}

const mapStateToProps = (state) => {
	return {
		categoria: state.categoria,
		lblCategoria: state.lblCategoria
	}
}

const mapDispatchToProps = {
	saveCategoria,
	savelblCategoria,

}


export default connect(mapStateToProps, mapDispatchToProps)(BusquedaCategorias);