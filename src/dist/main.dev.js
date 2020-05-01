"use strict";

var _compositionApi = _interopRequireDefault(require("@vue/composition-api"));

var _locale = _interopRequireDefault(require("element-ui/lib/locale"));

var _zhCN = _interopRequireDefault(require("element-ui/lib/locale/lang/zh-CN"));

require("element-ui/lib/theme-chalk/base.css");

var _collapseTransition = _interopRequireDefault(require("element-ui/lib/transitions/collapse-transition"));

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

require("./icons");

require("./plugins/element.js");

var _router = _interopRequireDefault(require("./router"));

require("./router/premit");

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * element-ui 按需加载 - 过渡动画
 */
// fade/zoom 等
// collapse 展开折叠

/**
 * 自定义全局组件
 */

/**
 * element-ui 按需加载
 */

/**
 * 全局前置守卫
 */

/**
 * element-ui 按需加载 - 全局配置
 */
_vue["default"].prototype.$ELEMENT = {
  size: 'small',
  zIndex: 3000
};
/**
 * element-ui 按需加载 - 国际化, 设置语言
 * zh-CN: 中文
 */

_locale["default"].use(_zhCN["default"]);

_vue["default"].component(_collapseTransition["default"].name, _collapseTransition["default"]);

_vue["default"].config.productionTip = false;
/**
 * 安装 @vue/composition-api
 */

_vue["default"].use(_compositionApi["default"]);
/**
 * 注入自定义全局方法
 */
// import _global from './utils/global';
// Vue.use(_global);


new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');