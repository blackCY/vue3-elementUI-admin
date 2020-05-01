import {
  INFO_CATEGORY_RESULTS,
  IS_CACHE,
  SET_TOTAL,
  SET_PAGE,
  INFO_ALL_GATEGORY,
  DETAIL_CATEGORY_DATA,
} from '../mutations-types';

const state = {
  categoryList: [],
  options: {
    category: [],
  },
  isCache: true,
  tableData: {
    item: [],
    currentPageItem: [],
    stateItem: [],
  },
  page: {
    pageNumber: 1,
    pageSize: 10,
  },
  total: 0,
  // 详情页数据
  detail: {},
};

const getters = {};

const mutations = {
  [INFO_CATEGORY_RESULTS](state, payload) {
    state.options.category = payload.category;
    state.categoryList = payload.category.map(item => {
      return {
        category_name: item.category_name,
        id: item.id,
      };
    });
  },
  [IS_CACHE](state, { isCache }) {
    state.isCache = isCache;
  },
  [SET_TOTAL](state, { total }) {
    state.total = total;
  },
  [SET_PAGE](state, { page }) {
    state.page = page;
  },
  [INFO_ALL_GATEGORY](state, tableData) {
    state.tableData = tableData;
  },
  [DETAIL_CATEGORY_DATA](state, { detail }) {
    state.detail = detail;
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
