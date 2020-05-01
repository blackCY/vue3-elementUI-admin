"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mutationsTypes = require("../mutations-types");

var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  categoryList: [],
  options: {
    category: []
  },
  isCache: true,
  tableData: {
    item: [],
    currentPageItem: [],
    stateItem: []
  },
  page: {
    pageNumber: 1,
    pageSize: 10
  },
  total: 0,
  // 详情页数据
  detail: {}
};
var getters = {};
var mutations = (_mutations = {}, _defineProperty(_mutations, _mutationsTypes.INFO_CATEGORY_RESULTS, function (state, payload) {
  state.options.category = payload.category;
  state.categoryList = payload.category.map(function (item) {
    return {
      category_name: item.category_name,
      id: item.id
    };
  });
}), _defineProperty(_mutations, _mutationsTypes.IS_CACHE, function (state, _ref) {
  var isCache = _ref.isCache;
  state.isCache = isCache;
}), _defineProperty(_mutations, _mutationsTypes.SET_TOTAL, function (state, _ref2) {
  var total = _ref2.total;
  state.total = total;
}), _defineProperty(_mutations, _mutationsTypes.SET_PAGE, function (state, _ref3) {
  var page = _ref3.page;
  state.page = page;
}), _defineProperty(_mutations, _mutationsTypes.INFO_ALL_GATEGORY, function (state, tableData) {
  state.tableData = tableData;
}), _defineProperty(_mutations, _mutationsTypes.DETAIL_CATEGORY_DATA, function (state, _ref4) {
  var detail = _ref4.detail;
  state.detail = detail;
}), _mutations);
var actions = {};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;