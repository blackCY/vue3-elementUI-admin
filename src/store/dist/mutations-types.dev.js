"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOGOUT = exports.SET_COOKIE_WITH_USERNAME = exports.SET_COOKIE_WITH_TOKEN = exports.LOGIN_ASYNC = exports.SET_COLLAPSE = void 0;

/**
 * mutations
 */
// /control - 菜单栏状态
var SET_COLLAPSE = 'SET_COLLAPSE';
/**
 * actions
 */
// /login - 登录请求

exports.SET_COLLAPSE = SET_COLLAPSE;
var LOGIN_ASYNC = 'LOGIN_ASYNC'; // /login - 存储 token

exports.LOGIN_ASYNC = LOGIN_ASYNC;
var SET_COOKIE_WITH_TOKEN = 'SET_TOKEN'; // /login - 存储 username

exports.SET_COOKIE_WITH_TOKEN = SET_COOKIE_WITH_TOKEN;
var SET_COOKIE_WITH_USERNAME = 'SET_USERNAME'; // /control/chome - 登出

exports.SET_COOKIE_WITH_USERNAME = SET_COOKIE_WITH_USERNAME;
var LOGOUT = 'LOGOUT';
exports.LOGOUT = LOGOUT;