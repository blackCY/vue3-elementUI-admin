/**
 * @param: 过滤特殊字符
 */
export function verifiication(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}:;',\\[\\].<>/?!-[] ");
  var rs = '';
  for (let i = 0, len = str.length; i < len; i++) {
    rs += str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

/**
 * @param: 验证邮箱
 */
export function verifiyUsername(val) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}
/**
 * @param: 验证密码
 */
export function verifiyPassword(val) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}

export function verifyCode(val) {
  let reg = /^[a-z0-9]{6}$/;
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}
