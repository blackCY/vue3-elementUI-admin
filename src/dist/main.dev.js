"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _locale = _interopRequireDefault(require("element-ui/lib/locale"));

var _zhCN = _interopRequireDefault(require("element-ui/lib/locale/lang/zh-CN"));

require("./plugins/element.js");

require("./assets/theme/element-variables.scss");

require("element-ui/lib/theme-chalk/base.css");

var _collapseTransition = _interopRequireDefault(require("element-ui/lib/transitions/collapse-transition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * element-ui 按需加载 - 样式
 */
// 自定义主题

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
/**
 * element-ui 按需加载 - 过渡动画
 */
// fade/zoom 等


_vue["default"].component(_collapseTransition["default"].name, _collapseTransition["default"]);

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');