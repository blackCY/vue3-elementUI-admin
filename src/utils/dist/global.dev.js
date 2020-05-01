"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._global = _global;

var _elementUi = require("element-ui");

var _compositionApi = require("@vue/composition-api");

// Vue3.0
function _global() {
  var confirm = function confirm(params) {
    _elementUi.MessageBox.confirm(params.content, params.tip || '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: params.type || 'warning',
      center: true
    }).then(function () {
      params.fn && params.fn(params.values, params.index);
    })["catch"](function () {});
  };

  return {
    confirm: confirm
  };
} // Vue2.x
// export default (){
// install(Vue, options) {
//   Vue.prototype.confirm = params => {
//     MessageBox.confirm(params.content, params.tip || '提示', {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: params.type || 'warning',
//       center: true,
//     })
//       .then(() => {
//         params.fn && params.fn();
//       })
//       .catch(() => {});
//   };
//   // Vue.prototype.xxx = ...
// },
// };