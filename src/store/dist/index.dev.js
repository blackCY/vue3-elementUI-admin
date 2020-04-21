"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _collapse = _interopRequireDefault(require("./modules/collapse"));

var _login = _interopRequireDefault(require("./modules/login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  modules: {
    login: _login["default"],
    collapse: _collapse["default"]
  }
});
/**
 * 热重载
 * 使用 webpack 的 Hot Module Replacement API，Vuex 支持在开发过程中热重载 mutation、module、action 和 getter。你也可以在 Browserify 中使用 browserify-hmr 插件
 * 对于 mutation 和模块，你需要使用 store.hotUpdate() 方法
 */

if (module.hot) {
  // 使 action 和 muation 成为可热重载模块
  module.hot.accept(['./modules/collapse.js', './modules/login.js'], function () {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题, 这里需要加上 `.default`
    var newCollapse = require('./modules/collapse')["default"];

    var newLogin = require('./modules/login')["default"]; // 加载新模块


    store.hotUpdate({
      login: _login["default"],
      collapse: _collapse["default"]
    });
  });
}

var _default = store;
exports["default"] = _default;