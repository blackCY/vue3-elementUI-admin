import service from '@/utils/interceptor.js';

/**
 * 获取验证码
 */
export function GetSms({ username }) {
  return service.post('/api/mock/authCode', {
    username,
  });
}

/**
 * 获取用户角色
 */

/**
 * 登录 & 注册
 */
export function InfoUser({ username, password, verifiication, model }) {
  return service.post(`/api/mock/${model}`, { username, password, verifiication });
}
