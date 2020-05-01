"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.common = common;

var _compositionApi = require("@vue/composition-api");

var _news = require("./news");

function common() {
  var category = (0, _compositionApi.reactive)({
    item: []
  });
  /**
   * 获取分类信息
   */

  var getInfoCategory = function getInfoCategory() {
    (0, _news.GetCategory)().then(function (res) {
      var info_arr = [],
          category_arr = [];
      info_arr.push(res.data.categoryList[0].category_name);
      category_arr.push(res.data.categoryList[0]);
      res.data.categoryList.map(function (v) {
        if (info_arr.indexOf(v.category_name) < 0) {
          info_arr.push(v.category_name);
          category_arr.push(v);
        }
      });
      category.item = category_arr;
    })["catch"](function (e) {
      return Promise.reject(e);
    });
  };

  return {
    getInfoCategory: getInfoCategory,
    category: category
  };
}