/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\nvar registerBlockType = wp.blocks.registerBlockType;\nvar useState = wp.element.useState;\nvar _wp$components = wp.components,\n  Spinner = _wp$components.Spinner,\n  Button = _wp$components.Button,\n  TextControl = _wp$components.TextControl;\n\nregisterBlockType('custom/weather-block', {\n  title: 'Weather Block',\n  icon: 'cloud',\n  category: 'widgets',\n  attributes: {\n    temperature: {\n      type: 'string'\n    },\n    description: {\n      type: 'string'\n    },\n    humidity: {\n      type: 'string'\n    },\n    location: {\n      type: 'string',\n      \"default\": 'New York, US' // Default location\n    }\n  },\n  edit: function edit(props) {\n    var attributes = props.attributes,\n      setAttributes = props.setAttributes;\n    var _useState = useState(false),\n      _useState2 = _slicedToArray(_useState, 2),\n      loading = _useState2[0],\n      setLoading = _useState2[1];\n    var _useState3 = useState(null),\n      _useState4 = _slicedToArray(_useState3, 2),\n      error = _useState4[0],\n      setError = _useState4[1];\n\n    // Fetch weather data when user clicks the button\n    var fetchWeather = function fetchWeather() {\n      setLoading(true);\n      var apiKey = weatherBlockData.apiKey || ''; // Use the localized API key\n      var city = attributes.location; // Get the location from attributes\n      var url = \"https://api.openweathermap.org/data/2.5/weather?q=\".concat(city, \"&appid=\").concat(apiKey, \"&units=imperial\");\n      fetch(url).then(function (response) {\n        if (!response.ok) {\n          throw new Error('Network response was not ok');\n        }\n        return response.json();\n      }).then(function (data) {\n        // Update attributes with weather data\n        setAttributes({\n          temperature: \"\".concat(data.main.temp, \" \\xB0C\"),\n          description: data.weather[0].description,\n          humidity: \"\".concat(data.main.humidity, \"%\"),\n          location: data.name\n        });\n        setLoading(false);\n      })[\"catch\"](function (err) {\n        setError(err.message);\n        setLoading(false);\n      });\n    };\n\n    // Render the block\n    return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(TextControl, {\n      label: \"Location\",\n      value: attributes.location,\n      onChange: function onChange(location) {\n        return setAttributes({\n          location: location\n        });\n      } // Update location attribute\n      ,\n      placeholder: \"Enter a city name...\"\n    }), /*#__PURE__*/React.createElement(Button, {\n      onClick: fetchWeather,\n      isPrimary: true\n    }, \"Fetch Weather\"), loading && /*#__PURE__*/React.createElement(Spinner, null), error && /*#__PURE__*/React.createElement(\"p\", null, \"Error fetching weather: \", error), attributes.temperature && /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h2\", null, \"Today's Weather in \", attributes.location), /*#__PURE__*/React.createElement(\"p\", null, \"Temperature: \", attributes.temperature), /*#__PURE__*/React.createElement(\"p\", null, \"Weather: \", attributes.description), /*#__PURE__*/React.createElement(\"p\", null, \"Humidity: \", attributes.humidity)));\n  },\n  save: function save(props) {\n    var attributes = props.attributes;\n    return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h2\", null, \"Today's Weather in \", attributes.location), /*#__PURE__*/React.createElement(\"p\", null, \"Temperature: \", attributes.temperature), /*#__PURE__*/React.createElement(\"p\", null, \"Weather: \", attributes.description), /*#__PURE__*/React.createElement(\"p\", null, \"Humidity: \", attributes.humidity));\n  }\n});\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/block.js");
/******/ 	
/******/ })()
;