"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookitWithToken = getCookitWithToken;
exports.setCookitWithToken = setCookitWithToken;
exports.removeCookitWithToken = removeCookitWithToken;
exports.getCookitWithUsername = getCookitWithUsername;
exports.setCookitWithUsername = setCookitWithUsername;
exports.removeCookitWithUsername = removeCookitWithUsername;

var _cookie_js = _interopRequireDefault(require("cookie_js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ADMIN_TOKEN = 'ADMIN_TOKEN';
var USERNAME = 'USERNAME';

function getCookitWithToken() {
  return _cookie_js["default"].get(ADMIN_TOKEN);
}

function setCookitWithToken(token) {
  _cookie_js["default"].set(ADMIN_TOKEN, token);
}

function removeCookitWithToken() {
  _cookie_js["default"].remove(ADMIN_TOKEN);
}

function getCookitWithUsername() {
  return _cookie_js["default"].get(USERNAME);
}

function setCookitWithUsername(username) {
  _cookie_js["default"].set(USERNAME, username);
}

function removeCookitWithUsername() {
  _cookie_js["default"].remove(USERNAME);
}