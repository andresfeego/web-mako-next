exports.id = 41;
exports.ids = [41];
exports.modules = {

/***/ 7679:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8817);
/* harmony import */ var _Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var _Inicialized_GlobalFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(641);






const Empresa = ({
  empresa
}) => {
  const urllogo = 'https://www.feegosystem.com/scrAppServer/images/' + empresa.url_logo;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: (_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default().Empresa),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__.default, {
      className: (_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default().Empresa),
      href: `/empresas/${empresa.nombreMun}_${empresa.nombreDep}/${empresa.nombre.replace(/\s/g, '_')}/${empresa.codigo}`,
      title: empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion + " - Mako directorio empresarial",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default().logoEmpresa),
        style: {
          border: '2px solid ',
          borderColor: empresa.color
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
          loading: "lazy",
          src: urllogo,
          alt: empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion,
          title: empresa.nombre + " - " + empresa.slogan + " - " + empresa.descripcion
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: (_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default().textoEmpresa),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
        className: (_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default().razonSocial),
        children: empresa.nombre.toProperCase()
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
        className: (_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default().ciudad),
        children: (0,_Inicialized_GlobalFunctions__WEBPACK_IMPORTED_MODULE_2__/* .MaysPrimera */ .G)(empresa.nombreDep) + " - " + (0,_Inicialized_GlobalFunctions__WEBPACK_IMPORTED_MODULE_2__/* .MaysPrimera */ .G)(empresa.nombreMun)
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
        className: (_Empresa_module_scss__WEBPACK_IMPORTED_MODULE_3___default().descripcion),
        children: (0,_Inicialized_GlobalFunctions__WEBPACK_IMPORTED_MODULE_2__/* .MaysPrimera */ .G)(empresa.slogan)
      })]
    })]
  });
};

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/* harmony default export */ __webpack_exports__["Z"] = (Empresa);

/***/ }),

/***/ 2600:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b_": function() { return /* binding */ saveBusqueda; },
/* harmony export */   "oM": function() { return /* binding */ clearBusqueda; },
/* harmony export */   "bT": function() { return /* binding */ saveCiudad; },
/* harmony export */   "SP": function() { return /* binding */ clearCiudad; },
/* harmony export */   "IS": function() { return /* binding */ saveCategoria; },
/* harmony export */   "Zs": function() { return /* binding */ clearCategoria; },
/* harmony export */   "sG": function() { return /* binding */ savelblCategoria; },
/* harmony export */   "Aw": function() { return /* binding */ clearlblCategoria; }
/* harmony export */ });
const saveBusqueda = auxi => {
  return {
    type: 'SET_BUSQUEDA',
    busqueda: auxi
  };
};
const clearBusqueda = () => {
  return {
    type: 'CLEAR_BUSQUEDA'
  };
};
const saveCiudad = auxi => {
  if (auxi == null) {
    return {
      type: 'SET_CIUDAD',
      ciudad: ''
    };
  } else {
    return {
      type: 'SET_CIUDAD',
      ciudad: auxi
    };
  }
};
const clearCiudad = () => {
  return {
    type: 'CLEAR_CIUDAD'
  };
};
const saveCategoria = auxi => {
  return {
    type: 'SET_CATEGORIA',
    categoria: auxi
  };
};
const clearCategoria = () => {
  return {
    type: 'CLEAR_CATEGORIA'
  };
};
const savelblCategoria = auxi => {
  return {
    type: 'SET_LBLCATEGORIA',
    lblCategoria: auxi
  };
};
const clearlblCategoria = () => {
  return {
    type: 'CLEAR_LBLCATEGORIA'
  };
};

/***/ }),

/***/ 3692:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7381);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4330);
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Cargando_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2929);
/* harmony import */ var _Cargando_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Cargando_module_scss__WEBPACK_IMPORTED_MODULE_3__);





const override = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: block;
  margin: 0 auto;
  border-color: gray;
`;

const Cargando = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: (_Cargando_module_scss__WEBPACK_IMPORTED_MODULE_3___default().CargandoContainer),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2___default()), {
      css: override,
      size: 15,
      color: "gray",
      loading: true
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
      className: (_Cargando_module_scss__WEBPACK_IMPORTED_MODULE_3___default().cargando),
      children: "Cargando..."
    })]
  });
};

/* harmony default export */ __webpack_exports__["Z"] = (Cargando);

/***/ }),

/***/ 641:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": function() { return /* binding */ MaysPrimera; }
/* harmony export */ });
const MaysPrimera = string => {
  var salida = string.toLowerCase();
  return salida.charAt(0).toUpperCase() + salida.slice(1);
};

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/***/ }),

/***/ 8817:
/***/ (function(module) {

// Exports
module.exports = {
	"Empresa": "Empresa_Empresa__1vgjn",
	"ciudad": "Empresa_ciudad__3cEcW",
	"descripcion": "Empresa_descripcion__2qHaU",
	"logoEmpresa": "Empresa_logoEmpresa__uGl7z",
	"textoEmpresa": "Empresa_textoEmpresa__2gg8F"
};


/***/ }),

/***/ 2929:
/***/ (function(module) {

// Exports
module.exports = {
	"CargandoContainer": "Cargando_CargandoContainer__2knhc",
	"cargando": "Cargando_cargando__2VPeO",
	"spinnerCargando": "Cargando_spinnerCargando__3EEMZ"
};


/***/ }),

/***/ 4453:
/***/ (function() {

/* (ignored) */

/***/ })

};
;