"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.common = common;

var _news = require("../api/news");

function common() {
  var getInfoCategory = function getInfoCategory() {
    (0, _news.GetCategory)({}).then(function (res) {})["catch"](function (err) {});
  };

  return getInfoCategory;
}