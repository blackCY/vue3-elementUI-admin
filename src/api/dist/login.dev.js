"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSms = GetSms;
exports.InfoUser = InfoUser;

var _interceptor = _interopRequireDefault(require("@/utils/interceptor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 获取验证码
 */
function GetSms(_ref) {
  var username = _ref.username;
  return _interceptor["default"].post('/api/mock/authCode', {
    username: username
  });
}
/**
 * 获取用户角色
 */

/**
 * 登录 & 注册
 */


function InfoUser(_ref2) {
  var username = _ref2.username,
      password = _ref2.password,
      verifiication = _ref2.verifiication,
      model = _ref2.model;
  return _interceptor["default"].post("/api/mock/".concat(model), {
    username: username,
    password: password,
    verifiication: verifiication
  });
}