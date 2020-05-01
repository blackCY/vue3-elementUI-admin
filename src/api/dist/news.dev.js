"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddFirstCategory = AddFirstCategory;
exports.GetCategory = GetCategory;
exports.DeleteCategory = DeleteCategory;
exports.EditCategory = EditCategory;
exports.AddInfo = AddInfo;
exports.GetList = GetList;
exports.DeleteInfo = DeleteInfo;
exports.AddChildrenCategory = AddChildrenCategory;
exports.RemoveChildrenCategory = RemoveChildrenCategory;
exports.EditChildrenCategory = EditChildrenCategory;

var _interceptor = _interopRequireDefault(require("@/utils/interceptor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 一级分类添加
 * config.data = Object.assign({}, config.data, {
    authToken: "react-actual-pro-token-config"
  });
 */
function AddFirstCategory(_ref) {
  var categoryName = _ref.categoryName;
  return _interceptor["default"].post('/api/news/addFirstCategory/', {
    categoryName: categoryName
  });
}
/**
 * 获取分类
 */


function GetCategory() {
  return _interceptor["default"].post('/api/news/getCategory/');
}
/**
 * 删除一级分类名称
 */


function DeleteCategory(_ref2) {
  var categoryId = _ref2.categoryId;
  return _interceptor["default"].post('/api/news/deleteCategory/', {
    categoryId: categoryId
  });
}
/**
 * 编辑一级分类名称
 */


function EditCategory(data) {
  return _interceptor["default"].post('/api/news/editCategory/', data);
}
/**
 * 新增一级分类里的信息
 */


function AddInfo(data) {
  return _interceptor["default"].post('/api/news/add/', data);
}
/**
 * 获取信息列表
 */


function GetList(data) {
  return _interceptor["default"].post('/api/news/getList/', data);
}
/**
 * 删除信息
 */


function DeleteInfo(data) {
  return _interceptor["default"].post('/api/news/deleteInfo/', data);
}
/**
 * 添加子级分类
 */


function AddChildrenCategory(data) {
  return _interceptor["default"].post('/api/news/addChildrenCategory/', data);
}
/**
 * 删除子级分类
 */


function RemoveChildrenCategory(data) {
  return _interceptor["default"].post('/api/news/removeChildrenCategory/', data);
}
/**
 * 编辑子级分类
 */


function EditChildrenCategory(data) {
  return _interceptor["default"].post('/api/news/editChildrenCategory/', data);
}