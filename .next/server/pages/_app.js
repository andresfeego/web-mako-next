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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XRUJNQUtPLy4vY29tcG9uZW50cy9JbmljaWFsaXplZC9sb2NhbFN0b3JlLmpzIiwid2VicGFjazovL1dFQk1BS08vLi9wYWdlcy9fYXBwLmpzIiwid2VicGFjazovL1dFQk1BS08vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL1dFQk1BS08vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovL1dFQk1BS08vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9XRUJNQUtPL2V4dGVybmFsIFwicmVkdXhcIiJdLCJuYW1lcyI6WyJidXNxdWVkYVJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJidXNxdWVkYSIsImNpdWRhZFJlZHVjZXIiLCJjaXVkYWQiLCJjYXRlZ29yaWFSZWR1Y2VyIiwiY2F0ZWdvcmlhIiwibGJsQ2F0ZWdvcmlhUmVkdWNlciIsImxibENhdGVnb3JpYSIsInJvb3RSZWR1Y2VyIiwiY29tYmluZVJlZHVjZXJzIiwiY3JlYXRlU3RvcmUiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJsb2NhbFN0b3JlIiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsU0FBU0EsZUFBVCxDQUF5QkMsS0FBSyxHQUFDLEVBQS9CLEVBQWtDQyxNQUFsQyxFQUF5QztBQUNyQyxVQUFRQSxNQUFNLENBQUNDLElBQWY7QUFDSSxTQUFLLGNBQUw7QUFDSSxhQUFPRCxNQUFNLENBQUNFLFFBQWQ7O0FBRUosU0FBSyxnQkFBTDtBQUNJLGFBQU8sRUFBUDs7QUFHSjtBQUNJLGFBQU9ILEtBQVA7QUFUUjtBQVdIOztBQUVELFNBQVNJLGFBQVQsQ0FBdUJKLEtBQUssR0FBQyxFQUE3QixFQUFnQ0MsTUFBaEMsRUFBdUM7QUFDbkMsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0ksU0FBSyxZQUFMO0FBQ0ksVUFBSUQsTUFBTSxDQUFDSSxNQUFQLElBQWlCLE9BQXJCLEVBQThCO0FBQzFCLGVBQU9KLE1BQU0sQ0FBQ0ksTUFBZDtBQUNILE9BRkQsTUFFTztBQUNILGVBQU8sRUFBUDtBQUNIOztBQUVMLFNBQUssY0FBTDtBQUNJLGFBQU8sRUFBUDs7QUFHSjtBQUNJLGFBQU9MLEtBQVA7QUFiUjtBQWVIOztBQUVELFNBQVNNLGdCQUFULENBQTBCTixLQUFLLEdBQUMsRUFBaEMsRUFBbUNDLE1BQW5DLEVBQTBDO0FBQ3RDLFVBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtBQUNJLFNBQUssZUFBTDtBQUNJLGFBQU9ELE1BQU0sQ0FBQ00sU0FBZDs7QUFFSixTQUFLLGlCQUFMO0FBQ0ksYUFBTyxFQUFQOztBQUdKO0FBQ0ksYUFBT1AsS0FBUDtBQVRSO0FBV0g7O0FBRUQsU0FBU1EsbUJBQVQsQ0FBNkJSLEtBQUssR0FBQyxFQUFuQyxFQUFzQ0MsTUFBdEMsRUFBNkM7QUFDekMsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0ksU0FBSyxrQkFBTDtBQUNJLGFBQU9ELE1BQU0sQ0FBQ1EsWUFBZDs7QUFFSixTQUFLLG9CQUFMO0FBQ0ksYUFBTyxFQUFQOztBQUdKO0FBQ0ksYUFBT1QsS0FBUDtBQVRSO0FBV0g7O0FBR0QsSUFBSVUsV0FBVyxHQUFHQyxzREFBZSxDQUFDO0FBQzlCUixVQUFRLEVBQUVKLGVBRG9CO0FBRTlCTSxRQUFNLEVBQUVELGFBRnNCO0FBRzlCRyxXQUFTLEVBQUVELGdCQUhtQjtBQUk5QkcsY0FBWSxFQUFFRDtBQUpnQixDQUFELENBQWpDO0FBT0EsK0RBQWVJLGtEQUFXLENBQUNGLFdBQUQsQ0FBMUIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1HLEdBQUcsR0FBRyxDQUFDO0FBQUVDLFdBQUY7QUFBYUM7QUFBYixDQUFELGtCQUNWLDhEQUFDLHVEQUFEO0FBQUEseUJBQ0UsOERBQUMsaURBQUQ7QUFBVSxTQUFLLEVBQUVDLHVFQUFqQjtBQUFBLDJCQUNFLDhEQUFDLFNBQUQsb0JBQWVELFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREY7O0FBUUFGLEdBQUcsQ0FBQ0ksZUFBSixHQUFzQixPQUFPO0FBQUVILFdBQUY7QUFBYUk7QUFBYixDQUFQLEtBQThCO0FBQ2xELE1BQUlILFNBQVMsR0FBRyxFQUFoQjs7QUFDQSxNQUFJRCxTQUFTLENBQUNHLGVBQWQsRUFBK0I7QUFDN0JGLGFBQVMsR0FBRyxNQUFNRCxTQUFTLENBQUNHLGVBQVYsQ0FBMEJDLEdBQTFCLENBQWxCO0FBQ0Q7O0FBQ0QsU0FBTztBQUFFSDtBQUFGLEdBQVA7QUFDRCxDQU5EOztBQVFBLCtEQUFlRixHQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQSxtQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxtQyIsImZpbGUiOiJwYWdlcy9fYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCdcclxuXHJcbmZ1bmN0aW9uIGJ1c3F1ZWRhUmVkdWNlcihzdGF0ZT0nJyxhY3Rpb24pe1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1NFVF9CVVNRVUVEQSc6ICBcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5idXNxdWVkYTtcclxuICAgICAgICBcclxuICAgICAgICBjYXNlICdDTEVBUl9CVVNRVUVEQSc6IFxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICBcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaXVkYWRSZWR1Y2VyKHN0YXRlPScnLGFjdGlvbil7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnU0VUX0NJVURBRCc6ICBcclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5jaXVkYWQgIT0gJ1RvZGFzJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5jaXVkYWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjYXNlICdDTEVBUl9DSVVEQUQnOiBcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2F0ZWdvcmlhUmVkdWNlcihzdGF0ZT0nJyxhY3Rpb24pe1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1NFVF9DQVRFR09SSUEnOiAgXHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uY2F0ZWdvcmlhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNhc2UgJ0NMRUFSX0NBVEVHT1JJQSc6IFxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICBcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsYmxDYXRlZ29yaWFSZWR1Y2VyKHN0YXRlPScnLGFjdGlvbil7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnU0VUX0xCTENBVEVHT1JJQSc6ICBcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5sYmxDYXRlZ29yaWE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FzZSAnQ0xFQVJfTEJMQ0FURUdPUklBJzogXHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgIFxyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5sZXQgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgYnVzcXVlZGE6IGJ1c3F1ZWRhUmVkdWNlcixcclxuICAgIGNpdWRhZDogY2l1ZGFkUmVkdWNlcixcclxuICAgIGNhdGVnb3JpYTogY2F0ZWdvcmlhUmVkdWNlcixcclxuICAgIGxibENhdGVnb3JpYTogbGJsQ2F0ZWdvcmlhUmVkdWNlclxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyKSIsImltcG9ydCBcIi4vc3R5bGVzR2xvYmFsLnNjc3NcIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCBsb2NhbFN0b3JlIGZyb20gJy4uL2NvbXBvbmVudHMvSW5pY2lhbGl6ZWQvbG9jYWxTdG9yZSdcclxuXHJcbmNvbnN0IEFwcCA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pID0+IChcclxuICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e2xvY2FsU3RvcmV9PlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8L1Byb3ZpZGVyPlxyXG4gIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbilcclxuXHJcbkFwcC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoeyBDb21wb25lbnQsIGN0eCB9KSA9PiB7XHJcbiAgbGV0IHBhZ2VQcm9wcyA9IHt9XHJcbiAgaWYgKENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMpIHtcclxuICAgIHBhZ2VQcm9wcyA9IGF3YWl0IENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMoY3R4KVxyXG4gIH1cclxuICByZXR1cm4geyBwYWdlUHJvcHMgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=