(function() {
var exports = {};
exports.id = 535;
exports.ids = [535];
exports.modules = {

/***/ 5488:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _id_; },
  "getServerSideProps": function() { return /* binding */ getServerSideProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: external "next/router"
var router_namespaceObject = require("next/router");;
;// CONCATENATED MODULE: external "next/head"
var head_namespaceObject = require("next/head");;
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: ./components/Inicialized/GlobalFunctions.js
var GlobalFunctions = __webpack_require__(641);
// EXTERNAL MODULE: ./components/Home/Empresas/Header/BarraBusquedaEmpresa.module.scss
var BarraBusquedaEmpresa_module = __webpack_require__(8592);
var BarraBusquedaEmpresa_module_default = /*#__PURE__*/__webpack_require__.n(BarraBusquedaEmpresa_module);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "@material-ui/icons/Search"
var Search_ = __webpack_require__(3016);
var Search_default = /*#__PURE__*/__webpack_require__.n(Search_);
// EXTERNAL MODULE: external "@material-ui/icons/Close"
var Close_ = __webpack_require__(8777);
var Close_default = /*#__PURE__*/__webpack_require__.n(Close_);
// EXTERNAL MODULE: ./components/Inicialized/Actions.js
var Actions = __webpack_require__(2600);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
// EXTERNAL MODULE: ./components/Inicialized/Cargando.js
var Cargando = __webpack_require__(3692);
// EXTERNAL MODULE: ./components/Home/Contenido/Empresa.js
var Empresa = __webpack_require__(7679);
;// CONCATENATED MODULE: ./components/Home/Empresas/Header/BarraBusquedaEmpresa.js













async function getEmpresas(busqueda, ciudad, categoria) {
  const response = await fetch("http://localhost:3020/responseMako" + '/empresas', {
    method: 'POST',
    headers: {
      // Check what headers the API needs. A couple of usuals right below
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // Validation data coming from a form usually
      ciudad: ciudad,
      busServicios: busqueda,
      busCategoria: categoria
    })
  });

  if (response.ok) {
    return await response.json();
  } else {
    return null;
  }
}

const BarraBusquedaEmpresa = props => {
  var buscarBar;
  const {
    0: listaCiudades,
    1: setLC
  } = (0,external_react_.useState)(props.municipios);
  const {
    0: listaCiudadesOriginal,
    1: setLCO
  } = (0,external_react_.useState)(props.municipios);
  const {
    0: busCiudad,
    1: setBusCiudad
  } = (0,external_react_.useState)(props.ciudad);
  const {
    0: mostrarAuto,
    1: setmostrarAuto
  } = (0,external_react_.useState)(true);
  const {
    0: listaEmpresas,
    1: setListaEmpresas
  } = (0,external_react_.useState)(props.empresas);
  const {
    0: busquedaB,
    1: setBusqueda
  } = (0,external_react_.useState)(props.busqueda);

  function onSubmitCiudad(ciudad) {
    props.saveCiudad(ciudad);
    setBusCiudad(ciudad);
    setmostrarAuto(false);
  }

  function onClearCiudad() {
    props.clearCiudad();
    setBusCiudad('');
  }

  function handleKeyDownCiudad(e) {
    if (e.key === 'Enter') {
      onSubmitCiudad(busCiudad);
    }
  }

  function buscar(busqueda) {
    setLC("init");

    if (busqueda == "") {
      setLC(listaCiudadesOriginal);
    } else {
      var prepBus = new RegExp(busqueda, 'i'); // preparando termino de busqueda

      let Auxi = listaCiudadesOriginal.filter(item => {
        if (prepBus.test(item.nombre) || prepBus.test(item.nombreDep)) {
          return true;
        } else {
          return false;
        }
      });

      if (Auxi.length == 0) {
        Auxi = [];
      }

      setLC(Auxi);
    }
  }

  function onChangeCiudad(e) {
    setmostrarAuto(true);
    clearTimeout(buscarBar);
    var value = e.target.value;
    setBusCiudad(value);
    buscarBar = setTimeout(() => buscar(value), 500);
  }

  function renderBusqueda() {
    if (listaCiudades == "init") {
      return /*#__PURE__*/jsx_runtime_.jsx(Cargando/* default */.Z, {});
    } else {
      if (listaCiudades.length == 0) {
        return /*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "sin resultados"
        });
      } else {
        return listaCiudades.map(item => /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: (BarraBusquedaEmpresa_module_default()).ciudad,
          onClick: () => {
            onSubmitCiudad((0,GlobalFunctions/* MaysPrimera */.G)(item.nombre));
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("h1", {
            children: (0,GlobalFunctions/* MaysPrimera */.G)(item.nombre) + " - " + (0,GlobalFunctions/* MaysPrimera */.G)(item.nombreDep)
          })
        }));
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onSubmit();
    }
  }

  function onSubmit() {
    props.saveBusqueda(busquedaB);
  }

  function onClear() {
    props.clearBusqueda();
    setBusqueda('');
  }

  function onChange(e) {
    setBusqueda(e.target.value);
  }

  (0,external_react_.useEffect)(() => {
    setBusqueda(props.busqueda);
  }, [props.busqueda]);
  (0,external_react_.useEffect)(() => {
    setBusCiudad(props.ciudad);
  }, [props.ciudad]);
  (0,external_react_.useEffect)(() => {
    getEmpresas(props.busqueda, props.ciudad, 0).then(response => {
      setListaEmpresas(response); // sets ariaInfo state
    });
  }, [props.busqueda, props.ciudad]);
  let estiloBuscando = {
    height: '0.1vw'
  };

  if (props.busqueda != '' || props.ciudad != '') {
    estiloBuscando = {
      height: '11vw'
    };
  }

  function renderListaEmpresas(listaempresas) {
    return listaempresas.map(empresa => /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (BarraBusquedaEmpresa_module_default()).empresaPeque,
      children: /*#__PURE__*/jsx_runtime_.jsx(Empresa/* default */.Z, {
        empresa: empresa
      }, empresa.codigo)
    }));
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (BarraBusquedaEmpresa_module_default()).barraBusqueda,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (BarraBusquedaEmpresa_module_default()).panelBusqueda,
      children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: "/directorioempresarial",
        children: /*#__PURE__*/jsx_runtime_.jsx("img", {
          className: (BarraBusquedaEmpresa_module_default()).logoMako,
          src: __webpack_require__(6751),
          alt: "Mako directorio comercial"
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (BarraBusquedaEmpresa_module_default()).barra,
        children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
          type: "text",
          placeholder: "Que buscas ?",
          className: (BarraBusquedaEmpresa_module_default()).buscar,
          onKeyDown: handleKeyDown,
          value: busquedaB,
          onChange: onChange
        }), props.busqueda === '' ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: (BarraBusquedaEmpresa_module_default()).botonBuscar,
          onClick: () => onSubmit(),
          children: [" ", /*#__PURE__*/jsx_runtime_.jsx((Search_default()), {
            style: {
              width: '95%',
              height: '95%'
            }
          })]
        }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: (BarraBusquedaEmpresa_module_default()).botonBuscar,
          onClick: () => onClear(),
          children: [" ", /*#__PURE__*/jsx_runtime_.jsx((Close_default()), {
            style: {
              width: '90%',
              height: '90%'
            }
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (BarraBusquedaEmpresa_module_default()).busquedaCiudad,
        children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
          type: "text",
          placeholder: "En que ciudad lo buscas ?",
          className: (BarraBusquedaEmpresa_module_default()).buscarCiudad,
          onKeyDown: handleKeyDownCiudad,
          name: "busCiudad",
          value: busCiudad,
          onChange: onChangeCiudad
        }), props.ciudad === '' ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: (BarraBusquedaEmpresa_module_default()).botonBuscar,
          onClick: () => onSubmitCiudad(busCiudad),
          children: [" ", /*#__PURE__*/jsx_runtime_.jsx((Search_default()), {
            style: {
              width: '90%',
              height: '90%'
            }
          })]
        }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: (BarraBusquedaEmpresa_module_default()).botonBuscar,
          onClick: () => onClearCiudad(),
          children: [" ", /*#__PURE__*/jsx_runtime_.jsx((Close_default()), {
            style: {
              width: '85%',
              height: '85%'
            }
          })]
        }), busCiudad != '' && mostrarAuto ? /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: (BarraBusquedaEmpresa_module_default()).autocompletado,
          children: renderBusqueda()
        }) : null]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (BarraBusquedaEmpresa_module_default()).panelResultados,
      style: estiloBuscando,
      children: props.busqueda != '' || props.ciudad != '' ? renderListaEmpresas(listaEmpresas) : null
    })]
  });
};

const mapStateToProps = state => {
  return {
    busqueda: state.busqueda,
    ciudad: state.ciudad
  };
};

const mapDispatchToProps = {
  clearBusqueda: Actions/* clearBusqueda */.oM,
  clearlblCategoria: Actions/* clearlblCategoria */.Aw,
  clearCategoria: Actions/* clearCategoria */.Zs,
  clearCiudad: Actions/* clearCiudad */.SP,
  saveBusqueda: Actions/* saveBusqueda */.b_,
  saveCiudad: Actions/* saveCiudad */.bT
};
/* harmony default export */ var Header_BarraBusquedaEmpresa = ((0,external_react_redux_.connect)(mapStateToProps, mapDispatchToProps)(BarraBusquedaEmpresa));
// EXTERNAL MODULE: ./components/Home/Empresas/Header/Header.module.scss
var Header_module = __webpack_require__(7509);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
;// CONCATENATED MODULE: external "@material-ui/icons/Visibility"
var Visibility_namespaceObject = require("@material-ui/icons/Visibility");;
var Visibility_default = /*#__PURE__*/__webpack_require__.n(Visibility_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/Loyalty"
var Loyalty_namespaceObject = require("@material-ui/icons/Loyalty");;
var Loyalty_default = /*#__PURE__*/__webpack_require__.n(Loyalty_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/Info"
var Info_namespaceObject = require("@material-ui/icons/Info");;
var Info_default = /*#__PURE__*/__webpack_require__.n(Info_namespaceObject);
// EXTERNAL MODULE: ./components/Home/Empresas/Header/SlideEmpresa.module.scss
var SlideEmpresa_module = __webpack_require__(3619);
var SlideEmpresa_module_default = /*#__PURE__*/__webpack_require__.n(SlideEmpresa_module);
// EXTERNAL MODULE: external "rc-banner-anim"
var external_rc_banner_anim_ = __webpack_require__(4072);
var external_rc_banner_anim_default = /*#__PURE__*/__webpack_require__.n(external_rc_banner_anim_);
// EXTERNAL MODULE: external "rc-tween-one"
var external_rc_tween_one_ = __webpack_require__(2365);
var external_rc_tween_one_default = /*#__PURE__*/__webpack_require__.n(external_rc_tween_one_);
;// CONCATENATED MODULE: ./components/Home/Empresas/Header/SlideEmpresa.js






const {
  Element
} = (external_rc_banner_anim_default());
const BgElement = Element.BgElement;

const SlideEmpresa = ({
  empresa,
  slides
}) => {
  const {
    0: imageSlider,
    1: setImageSlider
  } = (0,external_react_.useState)(slides);
  const {
    0: categoria,
    1: setCategoria
  } = (0,external_react_.useState)(empresa.categoria);
  const {
    0: lblCategoria,
    1: setLblCategoria
  } = (0,external_react_.useState)(empresa.lblCategoria);
  (0,external_react_.useEffect)(async () => {
    const resSlidesEmpresa = await fetch("http://localhost:3020/responseMako" + '/empresas/imagenesSlide/' + empresa.codigo);
    const slidesEmpresaJson = await resSlidesEmpresa.json();
    setImageSlider(slidesEmpresaJson);
    setCategoria(empresa.categoria);
    setLblCategoria(empresa.lblCategoria);
  }, [empresa.codigo]);

  function Item(item) {
    var urlFondo = "url(https://www.feegosystem.com/scrAppServer/images/empresas/" + empresa.codigo + "/" + item.url + ".jpg)";
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Element, {
      prefixCls: "banner-user-elem",
      children: [/*#__PURE__*/jsx_runtime_.jsx((external_rc_tween_one_default()), {
        animation: {
          y: 0,
          opacity: 0,
          type: 'from',
          delay: 200
        },
        className: (SlideEmpresa_module_default()).degradado,
        name: "TweenOne",
        id: "TweenOne",
        children: /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: (SlideEmpresa_module_default()).degradado
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(BgElement, {
        className: "bg",
        style: {
          backgroundImage: urlFondo,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }, "bg" + item.id), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (SlideEmpresa_module_default()).textoSlide,
        children: /*#__PURE__*/jsx_runtime_.jsx((external_rc_tween_one_default()), {
          animation: {
            y: 50,
            opacity: 0,
            type: 'from',
            delay: 200
          },
          name: "TweenOne",
          id: "TweenOne",
          children: item.nombre
        })
      })]
    }, "Elem" + item.id);
  }

  function renderSlide() {
    if (imageSlider.length > 0) {
      return imageSlider.map(item => Item(item));
    } else {
      if (categoria != '') {
        var urlFondo = "url(https://www.feegosystem.com/scrAppServer/images/categorias/" + categoria + ".jpg)";
        return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Element, {
          prefixCls: "banner-user-elem",
          children: [/*#__PURE__*/jsx_runtime_.jsx((external_rc_tween_one_default()), {
            animation: {
              y: 0,
              opacity: 0,
              type: 'from',
              delay: 200
            },
            className: (SlideEmpresa_module_default()).degradado,
            name: "TweenOne",
            id: "TweenOne",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: (SlideEmpresa_module_default()).degradado
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(BgElement, {
            className: "bg",
            style: {
              backgroundImage: urlFondo,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          }, "bg" + categoria), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: (SlideEmpresa_module_default()).textoSlide,
            children: /*#__PURE__*/jsx_runtime_.jsx((external_rc_tween_one_default()), {
              animation: {
                y: 50,
                opacity: 0,
                type: 'from',
                delay: 200
              },
              name: "TweenOne",
              id: "TweenOne",
              children: lblCategoria
            })
          })]
        }, "fondo1" + categoria);
      } else {
        return null;
      }
    }
  }

  function createSlides() {
    return /*#__PURE__*/jsx_runtime_.jsx((external_rc_banner_anim_default()), {
      autoPlay: true,
      type: "across",
      className: (SlideEmpresa_module_default()).contenido,
      children: renderSlide()
    });
  }

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: (SlideEmpresa_module_default()).SlideDetalleEmpresa,
    children: createSlides()
  });
};

/* harmony default export */ var Header_SlideEmpresa = (SlideEmpresa);
;// CONCATENATED MODULE: ./components/Home/Empresas/Header/Header.js









const Header = ({
  empresa,
  slides
}) => {
  const urllogo = `https://www.feegosystem.com/scrAppServer/images/${empresa.url_logo}`;
  let colorFondo = {};

  if (empresa.colorPrimario) {
    colorFondo = {
      backgroundColor: empresa.colorPrimario
    };
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (Header_module_default()).header,
    style: colorFondo,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (Header_module_default()).logo,
      children: /*#__PURE__*/jsx_runtime_.jsx("img", {
        src: urllogo,
        alt: `${empresa.nombre}-${empresa.nombreMun}-${empresa.nombreDep}`
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Header_module_default()).info,
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Header_module_default()).titulo,
        children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
          children: (0,GlobalFunctions/* MaysPrimera */.G)(empresa.nombre)
        }), /*#__PURE__*/jsx_runtime_.jsx("h3", {
          children: empresa.slogan
        }), /*#__PURE__*/jsx_runtime_.jsx("p", {
          children: empresa.descripcion
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Header_module_default()).iconos,
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
          className: (Header_module_default()).vistos,
          children: [/*#__PURE__*/jsx_runtime_.jsx((Visibility_default()), {
            className: "colorVistos"
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: empresa.visto
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
          className: (Header_module_default()).infos,
          children: [/*#__PURE__*/jsx_runtime_.jsx((Loyalty_default()), {
            className: "colorPromos"
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: empresa.promos
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
          className: (Header_module_default()).promos,
          children: [/*#__PURE__*/jsx_runtime_.jsx((Info_default()), {
            className: "colorInfos"
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: empresa.infos
          })]
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(Header_SlideEmpresa, {
      empresa: empresa,
      slides: slides
    })]
  });
};

/* harmony default export */ var Header_Header = (Header);
;// CONCATENATED MODULE: ./components/Home/Empresas/EmpresaTipoUno.js





const EmpresaTipoUno = ({
  empresa,
  municipios,
  empresas,
  slides
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Header_BarraBusquedaEmpresa, {
      municipios: municipios,
      empresas: empresas
    }), /*#__PURE__*/jsx_runtime_.jsx(Header_Header, {
      empresa: empresa,
      slides: slides
    })]
  });
};

/* harmony default export */ var Empresas_EmpresaTipoUno = (EmpresaTipoUno);
;// CONCATENATED MODULE: ./components/Home/Empresas/EmpresaTipoCero.js


const EmpresaTipoCero = () => {
  return /*#__PURE__*/jsx_runtime_.jsx("h1", {
    children: "empresa tipo 0"
  });
};

/* harmony default export */ var Empresas_EmpresaTipoCero = (EmpresaTipoCero);
;// CONCATENATED MODULE: ./pages/empresas/[ciudad]/[nombre]/[id].js











async function _id_getEmpresas(busqueda, ciudad, categoria) {
  const response = await fetch("http://localhost:3020/responseMako" + '/empresas', {
    method: 'POST',
    headers: {
      // Check what headers the API needs. A couple of usuals right below
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // Validation data coming from a form usually
      ciudad: ciudad,
      busServicios: busqueda,
      busCategoria: categoria
    })
  });

  if (response.ok) {
    return await response.json();
  } else {
    return null;
  }
}

const _id_Empresa = ({
  empresa,
  municipios,
  empresas,
  clearBusqueda,
  clearCiudad,
  slides
}) => {
  const router = (0,router_namespaceObject.useRouter)();
  const {
    id,
    ciudad
  } = router.query;
  (0,external_react_.useEffect)(() => {
    clearBusqueda();
    clearCiudad();
  }, [empresa]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: `${(0,GlobalFunctions/* MaysPrimera */.G)(empresa.nombre)} - ${(0,GlobalFunctions/* MaysPrimera */.G)(empresa.nombreMun)} - ${(0,GlobalFunctions/* MaysPrimera */.G)(empresa.nombreDep)}`
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "viewport",
        content: "initial-scale=1.0, width=device-width"
      })]
    }), empresa.tipo == 1 ? /*#__PURE__*/jsx_runtime_.jsx(Empresas_EmpresaTipoUno, {
      empresa: empresa,
      municipios: municipios,
      empresas: empresas,
      slides: slides
    }) : /*#__PURE__*/jsx_runtime_.jsx(Empresas_EmpresaTipoCero, {
      empresa: empresa,
      municipios: municipios,
      empresas: empresas
    })]
  });
};

async function getServerSideProps(ctx) {
  var props = {
    props: {}
  };
  const resEmpresa = await fetch("http://localhost:3020/responseMako" + '/empresas/' + ctx.query.id);
  const empresaJson = await resEmpresa.json();
  props.props = {
    empresa: empresaJson[0]
  };
  const response = await fetch("http://localhost:3020/responseMako" + '/listaMunicipios');
  const responseJson = await response.json();
  props.props = {
    empresa: empresaJson[0],
    municipios: responseJson
  };
  const empresas = await _id_getEmpresas("", "", 0);
  props.props = {
    empresa: empresaJson[0],
    municipios: responseJson,
    empresas: empresas
  };
  const resSlidesEmpresa = await fetch("http://localhost:3020/responseMako" + '/empresas/imagenesSlide/' + ctx.query.id);
  const slidesEmpresaJson = await resSlidesEmpresa.json();
  props.props = {
    empresa: empresaJson[0],
    municipios: responseJson,
    empresas: empresas,
    slides: slidesEmpresaJson
  };
  console.log(props.props.slides);
  return props;
}

const _id_mapStateToProps = state => {
  return {
    busqueda: state.busqueda,
    ciudad: state.ciudad,
    categoria: state.categoria,
    lblCategoria: state.lblCategoria
  };
};

const _id_mapDispatchToProps = {
  clearBusqueda: Actions/* clearBusqueda */.oM,
  clearlblCategoria: Actions/* clearlblCategoria */.Aw,
  clearCategoria: Actions/* clearCategoria */.Zs,
  clearCiudad: Actions/* clearCiudad */.SP
};
/* harmony default export */ var _id_ = ((0,external_react_redux_.connect)(_id_mapStateToProps, _id_mapDispatchToProps)(_id_Empresa));

/***/ }),

/***/ 8592:
/***/ (function(module) {

// Exports
module.exports = {
	"barraBusqueda": "BarraBusquedaEmpresa_barraBusqueda__3SFGN",
	"panelBusqueda": "BarraBusquedaEmpresa_panelBusqueda__2gf5I",
	"panelResultados": "BarraBusquedaEmpresa_panelResultados__3qHk9",
	"logoMako": "BarraBusquedaEmpresa_logoMako__2Q41U",
	"barra": "BarraBusquedaEmpresa_barra__1hJqa",
	"botonBuscar": "BarraBusquedaEmpresa_botonBuscar__2KMV7",
	"buscar": "BarraBusquedaEmpresa_buscar__ebN4u",
	"busquedaCiudad": "BarraBusquedaEmpresa_busquedaCiudad__3W4AU",
	"buscarCiudad": "BarraBusquedaEmpresa_buscarCiudad__3zBvB",
	"autocompletado": "BarraBusquedaEmpresa_autocompletado__JUgKm",
	"ciudad": "BarraBusquedaEmpresa_ciudad__gCMNi",
	"empresaPeque": "BarraBusquedaEmpresa_empresaPeque__2poHn"
};


/***/ }),

/***/ 7509:
/***/ (function(module) {

// Exports
module.exports = {
	"header": "Header_header__3c4T4",
	"logo": "Header_logo__rk9gE",
	"info": "Header_info__3nHRX",
	"titulo": "Header_titulo__1bvK3",
	"iconos": "Header_iconos__2Qum9"
};


/***/ }),

/***/ 3619:
/***/ (function(module) {

// Exports
module.exports = {
	"SlideDetalleEmpresa": "SlideEmpresa_SlideDetalleEmpresa__3m8es",
	"contenido": "SlideEmpresa_contenido__2ZizR",
	"degradado": "SlideEmpresa_degradado__2KeYF",
	"iconoEmpresa": "SlideEmpresa_iconoEmpresa__1Mji_",
	"textoSlide": "SlideEmpresa_textoSlide__1lJE2",
	"TweenOne": "SlideEmpresa_TweenOne__3EnOO",
	"banner-user": "SlideEmpresa_banner-user__KBUQR",
	"banner-anim": "SlideEmpresa_banner-anim__3-irX",
	"banner-anim-elem": "SlideEmpresa_banner-anim-elem__1T8i0",
	"banner-user-elem": "SlideEmpresa_banner-user-elem__KfMfr",
	"banner-thumb-bottom": "SlideEmpresa_banner-thumb-bottom__rZXJU",
	"banner-anim-thumb": "SlideEmpresa_banner-anim-thumb__2UI0Q",
	"bg": "SlideEmpresa_bg__3a-Ho",
	"text-wrapper": "SlideEmpresa_text-wrapper__25a_h",
	"icon-wrapper": "SlideEmpresa_icon-wrapper__3z9K_",
	"banner-anim-elem-mask": "SlideEmpresa_banner-anim-elem-mask__2D-LL",
	"banner-anim-arrow": "SlideEmpresa_banner-anim-arrow__wGHGV",
	"banner-anim-arrow-default": "SlideEmpresa_banner-anim-arrow-default__3g04P",
	"next": "SlideEmpresa_next__1D0J1",
	"prev": "SlideEmpresa_prev__G24lV",
	"banner-anim-thumb-default": "SlideEmpresa_banner-anim-thumb-default__31TbJ",
	"active": "SlideEmpresa_active__Ke2aL"
};


/***/ }),

/***/ 6751:
/***/ (function(module) {

module.exports = "/_next/static/images/logo_Mako_Directorio_Comercial_Colombia_512x512-1-cfd286f1a2f4a65b9b53a5df47f0f9d3.png";

/***/ }),

/***/ 7381:
/***/ (function(module) {

"use strict";
module.exports = require("@emotion/react");;

/***/ }),

/***/ 8777:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/icons/Close");;

/***/ }),

/***/ 3016:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/icons/Search");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 4072:
/***/ (function(module) {

"use strict";
module.exports = require("rc-banner-anim");;

/***/ }),

/***/ 2365:
/***/ (function(module) {

"use strict";
module.exports = require("rc-tween-one");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 79:
/***/ (function(module) {

"use strict";
module.exports = require("react-redux");;

/***/ }),

/***/ 4330:
/***/ (function(module) {

"use strict";
module.exports = require("react-spinners/BeatLoader");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664,41], function() { return __webpack_exec__(5488); });
module.exports = __webpack_exports__;

})();