"use strict";

var _app = require("../utils/app");

var _index = _interopRequireDefault(require("./index"));

var _store = _interopRequireDefault(require("@/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 导航守卫
 */
// 白名单
var whiteRouter = ['/login']; // 全局前置守卫

_index["default"].beforeEach(function (to, from, next) {
  if ((0, _app.getCookitWithToken)()) {
    if (to.path === ('/login' || '/')) {
      (0, _app.removeCookitWithToken)();
      (0, _app.removeCookitWithUsername)();

      _store["default"].commit('login/SET_COOKIE_WITH_TOKEN', '');

      _store["default"].commit('login/SET_COOKIE_WITH_USERNAME', '');

      next();
    }

    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login'); // next 方法默认调用 to 里面的路径
    }
  }
});