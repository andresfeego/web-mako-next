(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/Inicialized/localStore.js":
/*!**********************************************!*\
  !*** ./components/Inicialized/localStore.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);


function busquedaReducer(state = '', action) {
  switch (action.type) {
    case 'SET_BUSQUEDA':
      return action.busqueda;

    case 'CLEAR_BUSQUEDA':
      return '';

    default:
      return state;
  }
}

function ciudadReducer(state = '', action) {
  switch (action.type) {
    case 'SET_CIUDAD':
      if (action.ciudad != 'Todas') {
        return action.ciudad;
      } else {
        return '';
      }

    case 'CLEAR_CIUDAD':
      return '';

    default:
      return state;
  }
}

function categoriaReducer(state = '', action) {
  switch (action.type) {
    case 'SET_CATEGORIA':
      return action.categoria;

    case 'CLEAR_CATEGORIA':
      return '';

    default:
      return state;
  }
}

function idComercioReducer(state = '', action) {
  switch (action.type) {
    case 'SET_IDCOMERCIO':
      return action.idComercio;

    case 'CLEAR_IDCOMERCIO':
      return '';

    default:
      return state;
  }
}

function lblCategoriaReducer(state = '', action) {
  switch (action.type) {
    case 'SET_LBLCATEGORIA':
      return action.lblCategoria;

    case 'CLEAR_LBLCATEGORIA':
      return '';

    default:
      return state;
  }
}

let rootReducer = (0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
  busqueda: busquedaReducer,
  ciudad: ciudadReducer,
  categoria: categoriaReducer,
  idComercio: idComercioReducer,
  lblCategoria: lblCategoriaReducer
});
/* harmony default export */ __webpack_exports__["default"] = ((0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(rootReducer));

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylesGlobal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylesGlobal.scss */ "./pages/stylesGlobal.scss");
/* harmony import */ var _stylesGlobal_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stylesGlobal_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Inicialized_localStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Inicialized/localStore */ "./components/Inicialized/localStore.js");

var _jsxFileName = "E:\\NEW LIFE 2.0\\FEEGO\\PROYECTOS\\MAKO\\WEB 3.0 NEXT.JS\\web-mako-next\\pages\\_app.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const App = ({
  Component,
  pageProps
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), {
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_3__.Provider, {
    store: _components_Inicialized_localStore__WEBPACK_IMPORTED_MODULE_4__.default,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 7,
  columnNumber: 3
}, undefined);

App.getInitialProps = async ({
  Component,
  ctx
}) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps
  };
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./pages/stylesGlobal.scss":
/*!*********************************!*\
  !*** ./pages/stylesGlobal.scss ***!
  \*********************************/
/***/ (function() {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-redux");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("redux");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XRUJNQUtPLy4vY29tcG9uZW50cy9JbmljaWFsaXplZC9sb2NhbFN0b3JlLmpzIiwid2VicGFjazovL1dFQk1BS08vLi9wYWdlcy9fYXBwLmpzIiwid2VicGFjazovL1dFQk1BS08vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL1dFQk1BS08vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovL1dFQk1BS08vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9XRUJNQUtPL2V4dGVybmFsIFwicmVkdXhcIiJdLCJuYW1lcyI6WyJidXNxdWVkYVJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJidXNxdWVkYSIsImNpdWRhZFJlZHVjZXIiLCJjaXVkYWQiLCJjYXRlZ29yaWFSZWR1Y2VyIiwiY2F0ZWdvcmlhIiwiaWRDb21lcmNpb1JlZHVjZXIiLCJpZENvbWVyY2lvIiwibGJsQ2F0ZWdvcmlhUmVkdWNlciIsImxibENhdGVnb3JpYSIsInJvb3RSZWR1Y2VyIiwiY29tYmluZVJlZHVjZXJzIiwiY3JlYXRlU3RvcmUiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJsb2NhbFN0b3JlIiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsU0FBU0EsZUFBVCxDQUF5QkMsS0FBSyxHQUFDLEVBQS9CLEVBQWtDQyxNQUFsQyxFQUF5QztBQUNyQyxVQUFRQSxNQUFNLENBQUNDLElBQWY7QUFDSSxTQUFLLGNBQUw7QUFDSSxhQUFPRCxNQUFNLENBQUNFLFFBQWQ7O0FBRUosU0FBSyxnQkFBTDtBQUNJLGFBQU8sRUFBUDs7QUFHSjtBQUNJLGFBQU9ILEtBQVA7QUFUUjtBQVdIOztBQUVELFNBQVNJLGFBQVQsQ0FBdUJKLEtBQUssR0FBQyxFQUE3QixFQUFnQ0MsTUFBaEMsRUFBdUM7QUFDbkMsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0ksU0FBSyxZQUFMO0FBQ0ksVUFBSUQsTUFBTSxDQUFDSSxNQUFQLElBQWlCLE9BQXJCLEVBQThCO0FBQzFCLGVBQU9KLE1BQU0sQ0FBQ0ksTUFBZDtBQUNILE9BRkQsTUFFTztBQUNILGVBQU8sRUFBUDtBQUNIOztBQUVMLFNBQUssY0FBTDtBQUNJLGFBQU8sRUFBUDs7QUFHSjtBQUNJLGFBQU9MLEtBQVA7QUFiUjtBQWVIOztBQUVELFNBQVNNLGdCQUFULENBQTBCTixLQUFLLEdBQUMsRUFBaEMsRUFBbUNDLE1BQW5DLEVBQTBDO0FBQ3RDLFVBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtBQUNJLFNBQUssZUFBTDtBQUNJLGFBQU9ELE1BQU0sQ0FBQ00sU0FBZDs7QUFFSixTQUFLLGlCQUFMO0FBQ0ksYUFBTyxFQUFQOztBQUdKO0FBQ0ksYUFBT1AsS0FBUDtBQVRSO0FBV0g7O0FBRUQsU0FBU1EsaUJBQVQsQ0FBMkJSLEtBQUssR0FBQyxFQUFqQyxFQUFvQ0MsTUFBcEMsRUFBMkM7QUFDdkMsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0ksU0FBSyxnQkFBTDtBQUNJLGFBQU9ELE1BQU0sQ0FBQ1EsVUFBZDs7QUFFSixTQUFLLGtCQUFMO0FBQ0ksYUFBTyxFQUFQOztBQUdKO0FBQ0ksYUFBT1QsS0FBUDtBQVRSO0FBV0g7O0FBR0QsU0FBU1UsbUJBQVQsQ0FBNkJWLEtBQUssR0FBQyxFQUFuQyxFQUFzQ0MsTUFBdEMsRUFBNkM7QUFDekMsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0ksU0FBSyxrQkFBTDtBQUNJLGFBQU9ELE1BQU0sQ0FBQ1UsWUFBZDs7QUFFSixTQUFLLG9CQUFMO0FBQ0ksYUFBTyxFQUFQOztBQUdKO0FBQ0ksYUFBT1gsS0FBUDtBQVRSO0FBV0g7O0FBR0QsSUFBSVksV0FBVyxHQUFHQyxzREFBZSxDQUFDO0FBQzlCVixVQUFRLEVBQUVKLGVBRG9CO0FBRTlCTSxRQUFNLEVBQUVELGFBRnNCO0FBRzlCRyxXQUFTLEVBQUVELGdCQUhtQjtBQUk5QkcsWUFBVSxFQUFFRCxpQkFKa0I7QUFLOUJHLGNBQVksRUFBRUQ7QUFMZ0IsQ0FBRCxDQUFqQztBQVFBLCtEQUFlSSxrREFBVyxDQUFDRixXQUFELENBQTFCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNRyxHQUFHLEdBQUcsQ0FBQztBQUFFQyxXQUFGO0FBQWFDO0FBQWIsQ0FBRCxrQkFDViw4REFBQyx1REFBRDtBQUFBLHlCQUNFLDhEQUFDLGlEQUFEO0FBQVUsU0FBSyxFQUFFQyx1RUFBakI7QUFBQSwyQkFDRSw4REFBQyxTQUFELG9CQUFlRCxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGOztBQVFBRixHQUFHLENBQUNJLGVBQUosR0FBc0IsT0FBTztBQUFFSCxXQUFGO0FBQWFJO0FBQWIsQ0FBUCxLQUE4QjtBQUNsRCxNQUFJSCxTQUFTLEdBQUcsRUFBaEI7O0FBQ0EsTUFBSUQsU0FBUyxDQUFDRyxlQUFkLEVBQStCO0FBQzdCRixhQUFTLEdBQUcsTUFBTUQsU0FBUyxDQUFDRyxlQUFWLENBQTBCQyxHQUExQixDQUFsQjtBQUNEOztBQUNELFNBQU87QUFBRUg7QUFBRixHQUFQO0FBQ0QsQ0FORDs7QUFRQSwrREFBZUYsR0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkEsbUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsbUMiLCJmaWxlIjoicGFnZXMvX2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlU3RvcmUsIGNvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXHJcblxyXG5mdW5jdGlvbiBidXNxdWVkYVJlZHVjZXIoc3RhdGU9JycsYWN0aW9uKXtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdTRVRfQlVTUVVFREEnOiAgXHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uYnVzcXVlZGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FzZSAnQ0xFQVJfQlVTUVVFREEnOiBcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2l1ZGFkUmVkdWNlcihzdGF0ZT0nJyxhY3Rpb24pe1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1NFVF9DSVVEQUQnOiAgXHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24uY2l1ZGFkICE9ICdUb2RhcycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb24uY2l1ZGFkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FzZSAnQ0xFQVJfQ0lVREFEJzogXHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgIFxyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhdGVnb3JpYVJlZHVjZXIoc3RhdGU9JycsYWN0aW9uKXtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdTRVRfQ0FURUdPUklBJzogIFxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmNhdGVnb3JpYTtcclxuICAgICAgICBcclxuICAgICAgICBjYXNlICdDTEVBUl9DQVRFR09SSUEnOiBcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaWRDb21lcmNpb1JlZHVjZXIoc3RhdGU9JycsYWN0aW9uKXtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdTRVRfSURDT01FUkNJTyc6ICBcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5pZENvbWVyY2lvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNhc2UgJ0NMRUFSX0lEQ09NRVJDSU8nOiBcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGxibENhdGVnb3JpYVJlZHVjZXIoc3RhdGU9JycsYWN0aW9uKXtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdTRVRfTEJMQ0FURUdPUklBJzogIFxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmxibENhdGVnb3JpYTtcclxuICAgICAgICBcclxuICAgICAgICBjYXNlICdDTEVBUl9MQkxDQVRFR09SSUEnOiBcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmxldCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBidXNxdWVkYTogYnVzcXVlZGFSZWR1Y2VyLFxyXG4gICAgY2l1ZGFkOiBjaXVkYWRSZWR1Y2VyLFxyXG4gICAgY2F0ZWdvcmlhOiBjYXRlZ29yaWFSZWR1Y2VyLFxyXG4gICAgaWRDb21lcmNpbzogaWRDb21lcmNpb1JlZHVjZXIsXHJcbiAgICBsYmxDYXRlZ29yaWE6IGxibENhdGVnb3JpYVJlZHVjZXJcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyb290UmVkdWNlcikiLCJpbXBvcnQgXCIuL3N0eWxlc0dsb2JhbC5zY3NzXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgbG9jYWxTdG9yZSBmcm9tICcuLi9jb21wb25lbnRzL0luaWNpYWxpemVkL2xvY2FsU3RvcmUnXHJcblxyXG5jb25zdCBBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSA9PiAoXHJcbiAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtsb2NhbFN0b3JlfT5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9Qcm92aWRlcj5cclxuICA8L1JlYWN0LkZyYWdtZW50PlxyXG4pXHJcblxyXG5BcHAuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKHsgQ29tcG9uZW50LCBjdHggfSkgPT4ge1xyXG4gIGxldCBwYWdlUHJvcHMgPSB7fVxyXG4gIGlmIChDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKSB7XHJcbiAgICBwYWdlUHJvcHMgPSBhd2FpdCBDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eClcclxuICB9XHJcbiAgcmV0dXJuIHsgcGFnZVByb3BzIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOzsiXSwic291cmNlUm9vdCI6IiJ9