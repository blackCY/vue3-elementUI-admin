"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifiication = verifiication;
exports.verifiyUsername = verifiyUsername;
exports.verifiyPassword = verifiyPassword;
exports.verifyCode = verifyCode;

/**
 * @param: 过滤特殊字符
 */
function verifiication(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}:;',\\[\\].<>/?!-[] ");
  var rs = '';

  for (var i = 0, len = str.length; i < len; i++) {
    rs += str.substr(i, 1).replace(pattern, '');
  }

  return rs;
}
/**
 * @param: 验证邮箱
 */


function verifiyUsername(val) {
  var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}
/**
 * @param: 验证密码
 */


function verifiyPassword(val) {
  var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;

  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}

function verifyCode(val) {
  var reg = /^[a-z0-9]{6}$/;

  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}