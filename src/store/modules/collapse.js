import { SET_COLLAPSE } from '../mutations-types';

const state = {
  // 控制台菜单栏的展开收起状态
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
};

const getters = {};

const mutations = {
  [SET_COLLAPSE](state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    // Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
