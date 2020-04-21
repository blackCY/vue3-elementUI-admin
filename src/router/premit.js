/**
 * 导航守卫
 */
import { getCookitWithToken, removeCookitWithToken, removeCookitWithUsername } from '../utils/app';
import router from './index';
import store from '@/store';

// 白名单
const whiteRouter = ['/login'];

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (getCookitWithToken()) {
    if (to.path === ('/login' || '/')) {
      removeCookitWithToken();
      removeCookitWithUsername();
      store.commit('login/SET_COOKIE_WITH_TOKEN', '');
      store.commit('login/SET_COOKIE_WITH_USERNAME', '');
      next();
    }
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login'); // next 方法默认调用 to 里面的路径
    }
  }
});
