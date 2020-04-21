"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _login = require("@/api/login");

var _app = require("../../utils/app");

var _mutationsTypes = require("../mutations-types");

var _mutations, _actions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  token: '',
  username: (0, _app.getCookitWithUsername)() || ''
};
var getters = {};
var mutations = (_mutations = {}, _defineProperty(_mutations, _mutationsTypes.SET_COOKIE_WITH_TOKEN, function (state, payload) {
  state.token = payload;
}), _defineProperty(_mutations, _mutationsTypes.SET_COOKIE_WITH_USERNAME, function (state, payload) {
  state.username = payload;
}), _mutations);
var actions = (_actions = {}, _defineProperty(_actions, _mutationsTypes.LOGIN_ASYNC, function (_ref, payload) {
  var commit = _ref.commit;
  return new Promise(function (resolve, reject) {
    (0, _login.InfoUser)(payload).then(function (res) {
      // 存储 token, username
      commit(_mutationsTypes.SET_COOKIE_WITH_TOKEN, res.data.token);
      commit(_mutationsTypes.SET_COOKIE_WITH_USERNAME, res.data.username);
      (0, _app.setCookitWithToken)(res.data.token);
      (0, _app.setCookitWithUsername)(res.data.username); // 返回成功状态

      resolve(res);
    })["catch"](function (err) {
      reject(err);
    });
  });
}), _defineProperty(_actions, _mutationsTypes.LOGOUT, function (_ref2) {
  var commit = _ref2.commit;
  return new Promise(function (resolve, reject) {
    (0, _app.removeCookitWithToken)();
    (0, _app.removeCookitWithUsername)();
    commit(_mutationsTypes.SET_COOKIE_WITH_TOKEN, '');
    commit(_mutationsTypes.SET_COOKIE_WITH_USERNAME, '');
    resolve();
  });
}), _actions);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;