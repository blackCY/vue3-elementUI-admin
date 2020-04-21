import { InfoUser } from '@/api/login';
import {
  getCookitWithUsername,
  setCookitWithToken,
  setCookitWithUsername,
  removeCookitWithToken,
  removeCookitWithUsername,
} from '../../utils/app';
import { LOGIN_ASYNC, SET_COOKIE_WITH_TOKEN, SET_COOKIE_WITH_USERNAME, LOGOUT } from '../mutations-types';

const state = {
  token: '',
  username: getCookitWithUsername() || '',
};

const getters = {};

const mutations = {
  [SET_COOKIE_WITH_TOKEN](state, payload) {
    state.token = payload;
  },
  [SET_COOKIE_WITH_USERNAME](state, payload) {
    state.username = payload;
  },
};

const actions = {
  [LOGIN_ASYNC]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      InfoUser(payload)
        .then(res => {
          // 存储 token, username
          commit(SET_COOKIE_WITH_TOKEN, res.data.token);
          commit(SET_COOKIE_WITH_USERNAME, res.data.username);
          setCookitWithToken(res.data.token);
          setCookitWithUsername(res.data.username);

          // 返回成功状态
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [LOGOUT]({ commit }) {
    return new Promise((resolve, reject) => {
      removeCookitWithToken();
      removeCookitWithUsername();
      commit(SET_COOKIE_WITH_TOKEN, '');
      commit(SET_COOKIE_WITH_USERNAME, '');
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
