"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  name: 'Index',
  redirect: '/login',
  hidden: true,
  meta: {
    name: '主页'
  }
}, {
  path: '/login',
  name: 'Login',
  hidden: true,
  meta: {
    name: '登录'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@views/Login'));
    });
  }
}, {
  path: '/control',
  name: 'Control',
  meta: {
    icon: 'control',
    name: '控制台'
  },
  redirect: '/control/chome',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@views/Layout'));
    });
  },
  children: [{
    path: '/control/chome',
    name: 'ControlHome',
    meta: {
      name: '首页'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@views/Control'));
      });
    }
  }]
},
/**
 * 信息管理
 */
{
  path: '/info',
  name: 'Info',
  meta: {
    icon: 'info',
    name: '信息管理'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@views/Layout'));
    });
  },
  children: [{
    path: '/info/infohome',
    name: 'InfoHome',
    meta: {
      name: '信息列表'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@views/Info'));
      });
    }
  }, {
    path: '/info/infoCategory',
    name: 'InfoCategory',
    meta: {
      name: '信息分类'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@views/Info/Category'));
      });
    }
  }, {
    path: '/info/infoDetail/:currentTotal/:infoID',
    name: 'infoDetail',
    meta: {
      name: '信息详情'
    },
    hidden: true,
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@views/Info/infoDetail'));
      });
    }
  }]
},
/**
 * 用户管理
 */
{
  path: '/user',
  name: 'User',
  meta: {
    icon: 'user',
    name: '用户管理'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@views/Layout'));
    });
  },
  children: [{
    path: '/user/userhome',
    name: 'UserHome',
    meta: {
      name: '用户列表'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@views/User'));
      });
    }
  }]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;