import Vue from 'vue';
import SvgIcon from './SvgIcon.vue';

/**
 * 自定义全局组件
 */
Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);

const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};

// 这里函数的返回值是一个数组, 数组的每一项都是表示解析出来的 svg 文件的 Module, 这里只需要定义好这个数组, 然后会被 svg-sprite-loader 的设置自动读取, 只需要在 webpack 配置项里设置为指向该文件即可
requireAll(req);
