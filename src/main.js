import VueCompositionAPI from '@vue/composition-api';
import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/zh-CN';
/**
 * element-ui 按需加载 - 过渡动画
 */
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Vue from 'vue';
import App from './App.vue';
/**
 * 自定义全局组件
 */
import './icons';
/**
 * element-ui 按需加载
 */
import './plugins/element.js';
import router from './router';
/**
 * 全局前置守卫
 */
import './router/premit';
import store from './store';

/**
 * element-ui 按需加载 - 全局配置
 */
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

/**
 * element-ui 按需加载 - 国际化, 设置语言
 * zh-CN: 中文
 */
locale.use(lang);

Vue.component(CollapseTransition.name, CollapseTransition);

Vue.config.productionTip = false;

/**
 * 安装 @vue/composition-api
 */
Vue.use(VueCompositionAPI);

/**
 * 注入自定义全局方法
 */
// import _global from './utils/global';
// Vue.use(_global);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
