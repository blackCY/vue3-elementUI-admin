import { reactive } from '@vue/composition-api';
import { GetCategory } from './news';

export function common() {
  const category = reactive({
    item: [],
  });
  /**
   * 获取分类信息
   */
  const getInfoCategory = () => {
    GetCategory()
      .then(res => {
        let info_arr = [],
          category_arr = [];
        info_arr.push(res.data.categoryList[0].category_name);
        category_arr.push(res.data.categoryList[0]);
        res.data.categoryList.map(v => {
          if (info_arr.indexOf(v.category_name) < 0) {
            info_arr.push(v.category_name);
            category_arr.push(v);
          }
        });
        category.item = category_arr;
      })
      .catch(e => {
        return Promise.reject(e);
      });
  };
  return { getInfoCategory, category };
}
