"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _axios=_interopRequireDefault(require("axios")),_elementUi=require("element-ui");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var service=_axios.default.create({timeout:1e4});service.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",service.interceptors.request.use(function(e){return e.data=Object.assign({},e.data,{authToken:"authToken"}),e},function(e){return Promise.reject(e)}),service.interceptors.response.use(function(e){var r=e.data;return 200!==r.code||r.errMsg?(_elementUi.Message.error({message:r.errMsg,duration:2500,type:"error",onClose:function(){console.log(r)}}),Promise.reject(r)):Object.assign({},e,{data:e.data.data})},function(e){return Promise.reject(e)});var _default=service;exports.default=_default;