import Vue from 'vue';
import Vuex from 'vuex';
import collapse from './modules/collapse';
import login from './modules/login';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login,
    collapse,
  },
});

/**
 * 热重载
 * 使用 webpack 的 Hot Module Replacement API，Vuex 支持在开发过程中热重载 mutation、module、action 和 getter。你也可以在 Browserify 中使用 browserify-hmr 插件
 * 对于 mutation 和模块，你需要使用 store.hotUpdate() 方法
 */
if (module.hot) {
  // 使 action 和 muation 成为可热重载模块
  module.hot.accept(['./modules/collapse.js', './modules/login.js'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题, 这里需要加上 `.default`
    const newCollapse = require('./modules/collapse').default;
    const newLogin = require('./modules/login').default;
    // 加载新模块
    store.hotUpdate({
      login,
      collapse,
    });
  });
}

export default store;
