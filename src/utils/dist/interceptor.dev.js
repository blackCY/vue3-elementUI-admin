"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Description: 拦截器(interceptor)
 */
var service = _axios["default"].create({
  // baseURL: '',
  timeout: 10000
});

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 添加请求拦截器
 */

service.interceptors.request.use(function (config) {
  // 在发送请求之前做点什么

  /**
   * 添加请求头参数
   */
  return config;
}, function (error) {
  return Promise.reject(error);
});
/**
 * 添加响应拦截器
 */

service.interceptors.response.use(function (config) {
  // 对响应数据做点什么
  var data = config.data;

  if (data.code !== 200) {
    _elementUi.Message.error({
      message: data.errMsg,
      duration: 2500,
      type: 'error',
      onClose: function onClose() {}
    });

    return Promise.reject(data);
  }

  return Object.assign({}, config, {
    data: config.data.data
  });
}, function (error) {
  return Promise.reject(error);
});
var _default = service;
exports["default"] = _default;