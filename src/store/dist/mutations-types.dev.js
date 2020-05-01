"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOGOUT = exports.SET_COOKIE_WITH_USERNAME = exports.SET_COOKIE_WITH_TOKEN = exports.LOGIN_ASYNC = exports.DETAIL_CATEGORY_DATA = exports.IS_CACHE = exports.SET_PAGE = exports.SET_TOTAL = exports.INFO_ALL_GATEGORY = exports.INFO_CATEGORY_RESULTS = exports.SET_COLLAPSE = void 0;

/**
 * mutations
 */
// /control - 菜单栏状态
var SET_COLLAPSE = 'SET_COLLAPSE'; // /info - 获取到的分类信息

exports.SET_COLLAPSE = SET_COLLAPSE;
var INFO_CATEGORY_RESULTS = 'INFO_CATEGORY_RESULTS'; // info - 获取到的全部 info 信息

exports.INFO_CATEGORY_RESULTS = INFO_CATEGORY_RESULTS;
var INFO_ALL_GATEGORY = 'INFO_ALL_GATEGORY'; // total

exports.INFO_ALL_GATEGORY = INFO_ALL_GATEGORY;
var SET_TOTAL = 'SET_TOTAL'; // page

exports.SET_TOTAL = SET_TOTAL;
var SET_PAGE = 'SET_PAGE'; // isCache

exports.SET_PAGE = SET_PAGE;
var IS_CACHE = 'IS_CACHE'; // /infoDetail - 存储的详情页数据

exports.IS_CACHE = IS_CACHE;
var DETAIL_CATEGORY_DATA = 'DETAIL_CATEGORY_DATA';
/**
 * actions
 */
// /login - 登录请求

exports.DETAIL_CATEGORY_DATA = DETAIL_CATEGORY_DATA;
var LOGIN_ASYNC = 'LOGIN_ASYNC'; // /login - 存储 token

exports.LOGIN_ASYNC = LOGIN_ASYNC;
var SET_COOKIE_WITH_TOKEN = 'SET_TOKEN'; // /login - 存储 username

exports.SET_COOKIE_WITH_TOKEN = SET_COOKIE_WITH_TOKEN;
var SET_COOKIE_WITH_USERNAME = 'SET_USERNAME'; // /control/chome - 登出

exports.SET_COOKIE_WITH_USERNAME = SET_COOKIE_WITH_USERNAME;
var LOGOUT = 'LOGOUT';
exports.LOGOUT = LOGOUT;