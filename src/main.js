import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/zh-CN';

/**
 * element-ui 按需加载 - 样式
 */
import './plugins/element.js';

// 自定义主题
import './assets/theme/element-variables.scss';

/**
 * element-ui 按需加载 - 全局配置
 */
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

/**
 * element-ui 按需加载 - 国际化, 设置语言
 * zh-CN: 中文
 */
locale.use(lang);

/**
 * element-ui 按需加载 - 过渡动画
 */
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
