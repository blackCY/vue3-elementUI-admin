import { MessageBox } from 'element-ui';
import { ref, reactive } from '@vue/composition-api';
// Vue3.0
export function _global() {
  const confirm = params => {
    MessageBox.confirm(params.content, params.tip || '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: params.type || 'warning',
      center: true,
    })
      .then(() => {
        params.fn && params.fn(params.values, params.index);
      })
      .catch(() => {});
  };

  return {
    confirm,
  };
}

// Vue2.x
// export default (){
// install(Vue, options) {
//   Vue.prototype.confirm = params => {
//     MessageBox.confirm(params.content, params.tip || '提示', {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: params.type || 'warning',
//       center: true,
//     })
//       .then(() => {
//         params.fn && params.fn();
//       })
//       .catch(() => {});
//   };
//   // Vue.prototype.xxx = ...
// },
// };
