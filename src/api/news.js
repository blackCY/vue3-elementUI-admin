import service from '@/utils/interceptor.js';

/**
 * 一级分类添加
 * config.data = Object.assign({}, config.data, {
    authToken: "react-actual-pro-token-config"
  });
 */
export function AddFirstCategory({ categoryName }) {
  return service.post('/api/news/addFirstCategory/', { categoryName });
}

/**
 * 获取分类
 */
export function GetCategory() {
  return service.post('/api/news/getCategory/');
}

/**
 * 删除一级分类名称
 */
export function DeleteCategory({ categoryId }) {
  return service.post('/api/news/deleteCategory/', { categoryId });
}

/**
 * 编辑一级分类名称
 */
export function EditCategory(data) {
  return service.post('/api/news/editCategory/', data);
}

/**
 * 新增一级分类里的信息
 */
export function AddInfo(data) {
  return service.post('/api/news/add/', data);
}

/**
 * 获取信息列表
 */
export function GetList(data) {
  return service.post('/api/news/getList/', data);
}

/**
 * 删除信息
 */
export function DeleteInfo(data) {
  return service.post('/api/news/deleteInfo/', data);
}

/**
 * 添加子级分类
 */
export function AddChildrenCategory(data) {
  return service.post('/api/news/addChildrenCategory/', data);
}

/**
 * 删除子级分类
 */
export function RemoveChildrenCategory(data) {
  return service.post('/api/news/removeChildrenCategory/', data);
}

/**
 * 编辑子级分类
 */
export function EditChildrenCategory(data) {
  return service.post('/api/news/editChildrenCategory/', data);
}
