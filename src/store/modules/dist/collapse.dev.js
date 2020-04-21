"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mutationsTypes = require("../mutations-types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  // 控制台菜单栏的展开收起状态
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,

};
var getters = {};

var mutations = _defineProperty({}, _mutationsTypes.SET_COLLAPSE, function (state) {
  state.isCollapse = !state.isCollapse;
  sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse)); // Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
});

var actions = {};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;