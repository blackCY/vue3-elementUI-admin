<template>
  <div id="category">
    <el-button type="danger" style="margin-bottom: 10px;" @click="addFirst({ type: 'category_first_add' })">
      添加一级分类
    </el-button>

    <!-- 分割线 -->
    <el-divider />

    <div>
      <el-row :gutter="30">
        <el-col :span="12">
          <h4 class="menu-title">分类名称编辑</h4>
          <el-form :label-position="labelPosition" label-width="142px" :model="formLabelAlign" class="form-wrap">
            <el-form-item label="一级分类名称" v-show="category_first_input">
              <el-input v-model="formLabelAlign.categoryName" :disabled="category_first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-show="category_children_input">
              <el-input v-model="formLabelAlign.secCategoryName" :disabled="category_children_disabled"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="submit" :loading="submit_loading" :disabled="submit_button_disabled">
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="12">
          <div class="category-wrap">
            <div class="category-item" v-for="(firstItem, idx) in category.categoryList" :key="firstItem.id">
              <!-- 一级分类 -->
              <h4>
                <svg-icon
                  :iconClass="firstItem.children.length ? 'minus' : 'plus'"
                  :className="firstItem.children.length ? 'minus' : 'plus'"
                ></svg-icon>
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button round size="mini" @click="editCategory({ data: firstItem, type: 'category_first_edit' })">
                    编辑
                  </el-button>
                  <el-button
                    type="success"
                    round
                    size="mini"
                    @click="handleAddChildren({ data: firstItem, type: 'category_children_add' })"
                  >
                    添加子级
                  </el-button>
                  <el-button type="danger" round size="mini" @click="deleteCategoryConfirm(firstItem.id, idx)">
                    删除
                  </el-button>
                </div>
              </h4>
              <!-- 子级分类 -->
              <ul v-if="firstItem.children">
                <li v-for="(child, childIdx) in firstItem.children" :key="child.id">
                  {{ child.category_chlidren_name }}
                  <div class="button-group">
                    <el-button
                      round
                      size="mini"
                      @click="
                        hadnleEditChildren({
                          firstItem: firstItem.category_name,
                          idx,
                          childIdx,
                          child,
                          type: 'category_children_edit',
                        })
                      "
                    >
                      编辑
                    </el-button>
                    <el-button type="danger" round size="mini" @click="handleRemoveChildren(idx, childIdx, child)">
                      删除
                    </el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="category-de-wrap" v-if="!category_len">当前暂无分类信息</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watchEffect, onUnmounted, watch } from '@vue/composition-api';
import {
  AddFirstCategory,
  GetCategory,
  DeleteCategory,
  EditCategory,
  AddChildrenCategory,
  RemoveChildrenCategory,
  EditChildrenCategory,
} from '../../api/news';
import Message from '@/utils/reminder';
import { common } from '../../api/common';
export default {
  name: 'InfoCategory',
  setup(props, { root }) {
    const labelPosition = ref('right');
    const formLabelAlign = reactive({
      categoryName: '',
      secCategoryName: '',
    });
    // 一级输入框是否隐藏
    const category_first_input = ref(true);
    // 二级输入框是否隐藏
    const category_children_input = ref(true);
    // 一级输入框的状态是否为可编辑
    const category_first_disabled = ref(true);
    // 二级输入框的状态是否为可编辑
    const category_children_disabled = ref(true);
    // 确定按钮的状态是否为可编辑
    const submit_button_disabled = ref(true);
    const { getInfoCategory, category: commonCategory } = common();

    // 这里尽可能的不要放数组, 最好是对象
    let category = reactive({
      // 初始模拟数据
      categoryList: [],
      current: [],
    });
    const submit_button_type = ref('');
    const category_len = ref(0);
    const submit_loading = ref(false);
    const childrenCategoryNum = ref(0);
    const editTimeChildrenCategoryID = ref(0);
    const editChildrenData = reactive({
      idx: 0,
      childIdx: 0,
    });
    const categoryChildren = reactive({
      item: [],
    });

    // 当watchEffect在一个组件的调用 setup() 功能或生命周期挂钩, 观察者链接到组件的生命周期, 当组件卸载将自动停止
    // watchEffect(() => {
    //   category_len.value = category.categoryList.length;
    // });
    // 监听, 获取分类信息
    watch(
      () => commonCategory.item,
      (nv, ov) => {
        category.categoryList = nv;
        category_len.value = category.categoryList.length;
        let children = category.categoryList[category_len.value - 1]['children'];
        childrenCategoryNum.value = children[children.length - 1]['id'];
      },
      {
        lazy: true,
      },
    );

    /**
     * 函数
     */
    // 提交新增分类的按钮
    const submit = () => {
      if (!formLabelAlign.categoryName) {
        Message({ message: '请添加分类信息', duration: 1000 });
        return;
      }
      submit_loading.value = true;
      if (submit_button_type.value === 'category_first_add') {
        addFirstCategory();
      }
      if (submit_button_type.value === 'category_first_edit') {
        editFirstCategory();
      }
      if (submit_button_type.value === 'category_children_add') {
        addChildrenCategory();
      }
      if (submit_button_type.value === 'category_children_edit') {
        editChildrenCategory();
      }
    };

    // 添加一级分类
    const addFirst = params => {
      submit_button_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      //清空一级分类输入框的内容
      formLabelAlign.categoryName = '';
    };
    const addFirstCategory = () => {
      // let category_info = false;
      for (let i = 0, len = category.categoryList.length; i < len; i++) {
        if (category.categoryList[i].category_name === formLabelAlign.categoryName) {
          submit_loading.value = false;
          Message({
            message: '该一级分类已存在, 请重新命名',
            duration: 1500,
          });
          // category_info = true;
          break;
        }
      }
      AddFirstCategory({ categoryName: formLabelAlign.categoryName })
        .then(res => {
          // console.log(category_info);
          // category_info ||
          category.categoryList.unshift({
            id: res.data.id,
            category_name: formLabelAlign.categoryName || res.data.category,
            children: [],
          });
          // category_info ||
          Message({
            message: res.data.message,
            type: 'success',
            duration: 1000,
            onClose() {
              category_children_input.value = true;
              category_first_disabled.value = true;
              submit_button_disabled.value = true;
              category_children_disabled.value = true;
              formLabelAlign.categoryName = '';
              formLabelAlign.secCategoryName = '';
            },
          });
          submit_loading.value = false;
        })
        .catch(err => {
          formLabelAlign.categoryName = '';
          formLabelAlign.secCategoryName = '';
          submit_loading.value = false;
          category_children_input.value = true;
          category_first_disabled.value = true;
          submit_button_disabled.value = true;
          category_children_disabled.value = true;
        });
    };

    // 删除一级分类
    const deleteCategoryConfirm = (categoryId, idx) => {
      root.$confirm('确定要删除该分类吗?', '警告', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 注意, confirm MessageBox 按钮的 callback 是有 arguments 的, 将其转化为数组后, arguments[0] 是当前按钮的状态, 即点击了确定是 'confirm', 点击了取消是 'cancel', arguments[1] 则是当前 confirm MessageBox 组件
        callback() {
          if (Array.from(arguments)[0] === 'confirm') {
            root.$loading({
              text: '删除中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
            });
            deleteCategory(categoryId, idx);
          }
        },
      });
    };
    // 删除接口函数封装
    const deleteCategory = (categoryId, idx) => {
      DeleteCategory({ categoryId })
        .then(res => {
          Message({
            message: res.data.message,
            type: 'success',
            duration: 1000,
          });
          category.categoryList.splice(idx, 1);
          // 以服务的方式调用的 Loading 需要异步关闭
          root.$nextTick(() => {
            root.$loading().close();
          });
        })
        .catch(err => {
          root.$nextTick(() => {
            root.$loading().close();
          });
        });
    };

    // 编辑一级分类
    const editCategory = params => {
      submit_button_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      // 一级名称输入还原名称
      formLabelAlign.categoryName = params.data.category_name;
      // 存储当前的数据对象
      category.current = params.data;
    };
    const editFirstCategory = () => {
      // 这里判断 length, 即前提是提交修改后需要重新选择分类的时候, 那时已经清空一次了
      if (category.current.length === 0) {
        Message({
          message: '未选择分类',
          duration: 1500,
        });
        submit_loading.value = false;
        return false;
      }
      let requestData = {
        id: category.current.id,
        categoryName: formLabelAlign.categoryName,
      };
      EditCategory(requestData)
        .then(res => {
          category.current.category_name = formLabelAlign.categoryName || res.data.categoryName;
          submit_loading.value = false;
          category.current = [];
          Message({
            message: res.data.message,
            type: 'success',
            duration: 1000,
            onClose() {
              formLabelAlign.categoryName = '';
              category_children_input.value = true;
              category_first_disabled.value = true;
              submit_button_disabled.value = true;
            },
          });
        })
        .catch(err => {
          formLabelAlign.categoryName = '';
          category_children_input.value = true;
          category_first_disabled.value = true;
          submit_button_disabled.value = true;
        });
    };

    // 添加子级
    const handleAddChildren = val => {
      // 更新确定按钮类型
      submit_button_type.value = val.type;
      // 显示子级输入框
      category_children_input.value = true;
      // 启用子级输入框
      category_children_disabled.value = false;
      // 启用确定按钮
      submit_button_disabled.value = false;
      // 禁用一级输入框
      category_first_disabled.value = true;
      //存储数据
      category.current = val.data;
      // 显示一级分类文本
      formLabelAlign.categoryName = val.data.category_name;
    };
    const addChildrenCategory = () => {
      if (!formLabelAlign.secCategoryName) {
        return Message({
          message: '请填写分类名称',
          duration: 1000,
        });
      }
      childrenCategoryNum.value += 1;
      let options = {
        categoryName: formLabelAlign.secCategoryName,
        parentId: category.current.id,
      };
      categoryChildren.item = category.categoryList.filter(item => options.parentId === item.id)[0];
      categoryChildren.item['children'] = categoryChildren.item['children'] || [];
      AddChildrenCategory(options)
        .then(res => {
          Message({
            message: res.data.message,
            duration: 1000,
            type: 'success',
            onClose() {
              categoryChildren.item.children.push({
                category_chlidren_name: options.categoryName,
                id: childrenCategoryNum.value,
              });
              formLabelAlign.secCategoryName = '';
              formLabelAlign.categoryName = '';
              category_first_disabled.value = true;
              category_children_disabled.value = true;
            },
          });
          submit_loading.value = false;
        })
        .catch(err => {
          formLabelAlign.secCategoryName = '';
          submit_loading.value = false;
          formLabelAlign.categoryName = '';
          category_first_disabled.value = true;
          category_children_disabled.value = true;
        });
    };

    // 编辑子级
    const hadnleEditChildren = data => {
      category_children_disabled.value = false;
      formLabelAlign.categoryName = data.firstItem;
      formLabelAlign.secCategoryName = data.child.category_chlidren_name;
      editChildrenData.idx = data.idx;
      editChildrenData.childIdx = data.childIdx;
      submit_button_disabled.value = false;
      submit_button_type.value = data.type;
      editTimeChildrenCategoryID.value = data.child.id;
    };
    const editChildrenCategory = () => {
      EditChildrenCategory({
        category_children_id: editTimeChildrenCategoryID.value,
        categoryName: formLabelAlign.secCategoryName,
      })
        .then(res => {
          Message({
            message: res.data.message,
            duration: 1000,
            type: 'success',
            onClose() {
              let children = category.categoryList[editChildrenData.idx]['children'][editChildrenData.childIdx];
              children.category_chlidren_name = formLabelAlign.secCategoryName;
              children.id = editTimeChildrenCategoryID.value;
              submit_button_disabled.value = true;
              category_children_disabled.value = true;
              formLabelAlign.categoryName = '';
              formLabelAlign.secCategoryName = '';
            },
          });
          submit_loading.value = false;
        })
        .catch(err => {
          submit_loading.value = false;
          submit_button_disabled.value = true;
          category_children_disabled.value = true;
          formLabelAlign.categoryName = '';
          formLabelAlign.secCategoryName = '';
        });
    };

    // 删除子级
    const handleRemoveChildren = (idx, childIdx, child) => {
      root.$confirm('确定要删除该二级分类吗?', '警告', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 注意, confirm MessageBox 按钮的 callback 是有 arguments 的, 将其转化为数组后, arguments[0] 是当前按钮的状态, 即点击了确定是 'confirm', 点击了取消是 'cancel', arguments[1] 则是当前 confirm MessageBox 组件
        callback() {
          if (Array.from(arguments)[0] === 'confirm') {
            root.$loading({
              text: '删除中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
            });
            RemoveChildrenCategory({
              category_chlidren_name: child.category_chlidren_name,
              id: child.id,
            })
              .then(res => {
                Message({
                  message: res.data.message,
                  duration: 1000,
                  type: 'success',
                  onClose() {
                    category.categoryList[idx].children.splice(childIdx, 1);
                  },
                });
                root.$nextTick(() => {
                  root.$loading().close();
                });
              })
              .catch(err => {
                root.$nextTick(() => {
                  root.$loading().close();
                });
              });
          }
        },
      });
    };

    /**
     * lifecicle - onMounted
     */
    // 获取分类信息
    onMounted(() => {
      getInfoCategory();
    });
    onUnmounted(() => {});

    return {
      labelPosition,
      formLabelAlign,
      category_first_input,
      category_children_input,
      category,
      submit_loading,
      category_len,
      category_first_disabled,
      category_children_disabled,
      submit_button_disabled,
      submit,
      addFirst,
      deleteCategory,
      deleteCategoryConfirm,
      editCategory,
      handleAddChildren,
      hadnleEditChildren,
      handleRemoveChildren,
    };
  },
};
</script>

<style lang="scss" scoped>
.category-wrap {
  div:first-child {
    &:before {
      top: 25px;
    }
  }
  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.menu-title {
  line-height: 44px;
  background-color: #f3f3f3;
  padding-left: 22px;
}
.category-item {
  line-height: 44px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px dotted rgb(94, 92, 92);
    z-index: 99;
  }
  h4,
  li {
    &:hover {
      background-color: rgba(143, 143, 143, 0.5);
      .button-group {
        display: inline-block;
      }
    }
    @include webkit(transition, all 0.5s esae 0s !important);
    position: relative;
    .button-group {
      display: none;
      position: absolute;
      z-index: 99;
      right: 31px;
      button {
        font-size: 12px;
      }
    }
  }
  li {
    padding-left: 40px;
    margin-left: 22px;
    &:before {
      content: '';
      left: 0;
      top: 22px;
      bottom: 0px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  h4 {
    padding-left: 40px;
    background-color: #f3f3f3;
    svg {
      position: absolute;
      left: 14px;
      top: 15px;
      font-size: 17px;
      background-color: #fff;
    }
    svg:hover {
      cursor: pointer;
    }
  }
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
.category-de-wrap {
  height: 150px;
  font-size: 14px;
  line-height: 150px;
  text-align: center;
  color: #bbb;
  background-color: #f3f3f3;
  @include webkit(user-select, none);
}
</style>
