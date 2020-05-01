import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/login',
    hidden: true,
    meta: {
      name: '主页',
    },
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登录',
    },
    component: () => import('@views/Login'),
  },
  {
    path: '/control',
    name: 'Control',
    meta: {
      icon: 'control',
      name: '控制台',
    },
    redirect: '/control/chome',
    component: () => import('@views/Layout'),
    children: [
      {
        path: '/control/chome',
        name: 'ControlHome',
        meta: {
          name: '首页',
        },
        component: () => import('@views/Control'),
      },
    ],
  },
  /**
   * 信息管理
   */
  {
    path: '/info',
    name: 'Info',
    meta: {
      icon: 'info',
      name: '信息管理',
    },
    component: () => import('@views/Layout'),
    children: [
      {
        path: '/info/infohome',
        name: 'InfoHome',
        meta: {
          name: '信息列表',
        },
        component: () => import('@views/Info'),
      },
      {
        path: '/info/infoCategory',
        name: 'InfoCategory',
        meta: {
          name: '信息分类',
        },
        component: () => import('@views/Info/Category'),
      },
      {
        path: '/info/infoDetail/:currentTotal/:infoID',
        name: 'infoDetail',
        meta: {
          name: '信息详情',
        },
        hidden: true,
        component: () => import('@views/Info/infoDetail'),
      },
    ],
  },
  /**
   * 用户管理
   */
  {
    path: '/user',
    name: 'User',
    meta: {
      icon: 'user',
      name: '用户管理',
    },
    component: () => import('@views/Layout'),
    children: [
      {
        path: '/user/userhome',
        name: 'UserHome',
        meta: {
          name: '用户列表',
        },
        component: () => import('@views/User'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
