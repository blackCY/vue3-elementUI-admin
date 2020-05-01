/*
 * @Description: 拦截器(interceptor)
 */
import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
  // baseURL: '',
  timeout: 10000,
});

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做点什么
    /**
     * 添加请求头参数
     */
    config.data = Object.assign({}, config.data, {
      authToken: 'authToken',
    });
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  function(config) {
    // 对响应数据做点什么
    let data = config.data;
    if (data.code !== 200 || !!data.errMsg) {
      Message.error({
        message: data.errMsg,
        duration: 2500,
        type: 'error',
        onClose() {
          console.log(data);
        },
      });
      return Promise.reject(data);
    }

    return Object.assign({}, config, {
      data: config.data.data,
    });
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default service;
