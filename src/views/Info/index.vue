<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :span="3">
          <el-form-item label="分类">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.category_name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item label="检索关键字">
            <el-select v-model="search_key" placeholder="请选择">
              <el-option
                v-for="item in searchOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="searchWordWidth">
          <el-form-item label="检索词">
            <el-input v-model="search_keyWork" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9.5">
          <el-form-item label="日期">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              align="right"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="2">
          <el-button type="danger" style="margin-top: 32px;" @click="search">搜索</el-button>
        </el-col>

        <el-col :span="1.5" v-show="searchStateRestore">
          <el-button style="margin-top: 32px;" @click="restore">
            还原
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button type="danger" style="margin-top: 32px;" class="pull-right" @click="dialog_info = true">
            新增
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      :data="tableData.currentPageItem"
      border
      style="width: 100%; margin-top: 15px;"
      :empty-text="emptyText"
      v-loading="loadingTableData"
    >
      <el-table-column align="center" label="标题" width="400">
        <template v-slot="scope">
          <li @click="categoryDetail(scope.row, scope.$index)">
            {{ scope.row.title }}
          </li>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :prop="search_key === 'id' ? 'categoryID' : 'categoryName'"
        :label="search_key === 'id' ? 'ID' : '地区'"
        width="125"
      ></el-table-column>
      <el-table-column align="center" prop="createDate" label="日期"></el-table-column>
      <el-table-column align="center" prop="user" label="管理员" width="100"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-row style="margin-top: 30px;">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNumber"
      ></el-pagination>
    </el-row>

    <!-- 新增按钮的弹窗组件 -->
    <dialog-edit :flag.sync="dialog_info" :category="options.category" @newsAdd="newsAdd" type="add" />
    <!-- 编辑按钮的弹窗组件 -->
    <dialog-edit
      :flag.sync="dialog_info_edit"
      :editData="editData.data"
      :category="options.category"
      @newsEdit="newsEdit"
      type="edit"
    />
  </div>
</template>

<script>
import { GetCategory, GetList, DeleteInfo } from '@/api/news';
import DialogEdit from './dialog/edit';
import { reactive, ref, onMounted, watchEffect, watch, computed } from '@vue/composition-api';
import { _global } from '@/utils/global';
import { common } from '../../api/common';
import moment from 'moment';
import Message from '@/utils/reminder';
import {
  INFO_CATEGORY_RESULTS,
  IS_CACHE,
  SET_TOTAL,
  SET_PAGE,
  INFO_ALL_GATEGORY,
  DETAIL_CATEGORY_DATA,
} from '@/store/mutations-types';
export default {
  name: 'Info',
  components: {
    DialogEdit,
  },
  setup(props, { root }) {
    const { confirm } = _global();
    const { getInfoCategory, category } = common();

    const formInline = reactive({
      user: '',
      region: '',
    });
    const options = computed(() => root.$store.state.info.options).value;
    // 搜索关键字
    const searchOption = reactive([
      {
        value: 'id',
        label: '按ID',
      },
      {
        value: 'title',
        label: '按标题',
      },
    ]);

    const vuexData = computed(() => root.$store.state.info);
    const tableData = vuexData.value.tableData;
    let page = computed(() => vuexData.value.page);
    page = page.value;
    let total = computed(() => vuexData.value.total);
    const search_key = ref('title');
    const value = ref('');
    const value2 = ref('');
    const search_keyWork = ref('');
    const dialog_info = ref(false);
    const dialog_info_edit = ref(false);
    const loadingTableData = ref(false);
    // 记录状态 - 是否在搜索状态
    const isSearchState = ref(false);
    const emptyText = ref('数据正在加载...');
    const searchWordWidth = ref(4);
    const searchStateRestore = ref(false);
    const editData = reactive({
      data: {},
    });
    const editIndex = ref(0);

    /**
     * 函数
     */
    // 编辑按钮
    const handleEdit = (index, row) => {
      editIndex.value = index;
      editData.data = row;
      dialog_info_edit.value = true;
    };
    // 删除按钮
    const handleDelete = (index, row) => {
      confirm({
        content: '确认删除当前信息吗?',
        tip: '警告',
        fn: confirmDelete,
        values: {
          data: [
            {
              categoryID: row.categoryID,
              infoID: row.infoID,
            },
          ],
        },
        index,
      });
    };
    // 确认删除
    const confirmDelete = (value, index) => {
      DeleteInfo(value)
        .then(res => {
          Message({
            message: res.data.message,
            type: 'success',
            duration: 1500,
            onClose() {
              tableData.item[0].splice((page.pageNumber - 1) * page.pageSize + index, 1);
              tableData.currentPageItem = tableData.item[0].slice(
                (page.pageNumber - 1) * page.pageSize,
                page.pageNumber * page.pageSize,
              );
              total -= 1;
              root.$store.commit(`info/${SET_TOTAL}`, {
                total,
              });
            },
          });
        })
        .catch(err => {});
    };
    // 处理搜索请求参数
    const formatData = val => {
      let optionsData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
        pageTotal: val || 0, // 从第几条开始请求
      };
      // 分类ID
      if (value.value) optionsData.categoryId = value.value;
      // 日期
      if (value2.value.length) {
        optionsData.startTime = value2.value[0];
        optionsData.endTime = value2.value[1];
      }
      // 关键字
      if (search_keyWork.value) optionsData[search_key.value] = search_keyWork.value;
      return optionsData;
    };
    // 搜索
    const search = () => {
      // 每次进来, 都将数据还原
      tableData.item[0] = tableData.stateItem;
      let data = formatData();
      if (Object.keys(data).length === 3)
        return Message({
          message: '请选择搜索的范围',
        });
      isSearchState.value = true; // 进入搜索状态
      searchStateRestore.value = true; // 还原按钮显示
      searchWordWidth.value = 3; // 更改 检索词 width 参数
      /*** 有数据库 ***/
      /* getList(); */
      /*** 无数据库 ***/
      let result = tableData.item[0].filter(item => {
        return (
          (data.categoryId ? item.categoryName === data.categoryId : true) &&
          (data.title ? item.title.includes(data.title) : true) &&
          (data.id ? item.categoryID.includes(data.id) : true) &&
          (data.endTime ? new Date(item.createDate) < new Date(data.endTime) : true) &&
          (data.startTime ? new Date(item.createDate) > new Date(data.startTime) : true)
        );
      });
      tableData.item[0] = result;
      root.$store.commit(`info/${SET_TOTAL}`, {
        total: tableData.item[0].length,
      });
      handleCurrentChange();

      // 搜索状态, 数据是否为 0, 为 0 则不显示
      if (!tableData.item[0].length) {
        emptyText.value = '无数据';
      }
    };
    //离开搜索, 还原状态
    const restore = () => {
      // 点击还原, 需要将数据还原
      tableData.item[0] = tableData.stateItem;
      root.$store.commit(`info/${SET_TOTAL}`, {
        total: tableData.item[0].length,
      });
      handleCurrentChange();
      isSearchState.value = false; // 离开搜索状态
      searchStateRestore.value = false; // 还原按钮隐藏
      emptyText.value = '数据正在加载...'; // 还原加载提示
      searchWordWidth.value = 4; // 还原 检索词 width 参数
    };
    // 获取信息
    const getList = (val, nv = 1, isCache = false) => {
      isCache = isCache || root.$store.state.info.isCache;

      if (!isCache) return;

      let options = formatData(val);
      loadingTableData.value = true;
      GetList(options)
        .then(res => {
          res.data.sort((a, b) => {
            return new Date(b.createDate) - new Date(a.createDate);
          });
          tableData.item[0] ? tableData.item[0].push(...res.data) : tableData.item.push(res.data);
          // root.$store.commit(`info/${INFO_ALL_GATEGORY}`, {
          //   tableData,
          // });
          // 这里必须先对全部数据做处理才能交由 tableData.currentPageItem
          toCategory();
          tableData.currentPageItem = tableData.item[0].slice((nv - 1) * page.pageSize, nv * page.pageSize);
          // 更新页码
          root.$store.commit(`info/${SET_TOTAL}`, {
            total: tableData.item[0].length,
          });
          // 保留原来的数据
          tableData.stateItem = tableData.item[0];
          loadingTableData.value = false;

          if (root.$store.state.info.isCache) {
            root.$store.commit(`info/${IS_CACHE}`, {
              isCache: false,
            });
          }
        })
        .catch(err => {
          loadingTableData.value = false;
        });
    };
    const handleSizeChange = val => {
      tableData.currentPageItem = tableData.item[0].slice(0, val);
      page.pageNumber = 1;
      page.pageSize = val;
      root.$store.commit(`info/${SET_PAGE}`, {
        page,
      });
    };
    const handleCurrentChange = (val = 1) => {
      page.pageNumber = val;
      root.$store.commit(`info/${SET_PAGE}`, {
        page,
      });
      tableData.currentPageItem = tableData.item[0].slice((val - 1) * page.pageSize, val * page.pageSize);
    };
    // 新增 item
    const newsAdd = val => {
      let options = Object.assign({}, val, {
        createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        infoID: tableData.item[0][tableData.item[0].length - 1]['infoID'] + 1,
      });
      tableData.item[0].unshift(options);
      // root.$store.commit(`info/${INFO_ALL_GATEGORY}`, {
      //   tableData,
      // });
      if (page.pageNumber === 1) {
        handleCurrentChange(1);
      }
      total += 1;
      root.$store.commit(`info/${SET_TOTAL}`, {
        total,
      });
    };
    // 编辑 item
    const newsEdit = val => {
      let index = page.pageSize * (page.pageNumber - 1) + editIndex.value;
      tableData.item[0][index].title = val.title;
      tableData.item[0][index].categoryName = val.categoryName;
      tableData.item[0][index].content = val.content;
      tableData.item[0][index].createDate = moment().format('YYYY-MM-DD HH:mm:ss');
      tableData.currentPageItem = tableData.item[0].slice(
        (page.pageNumber - 1) * page.pageSize,
        page.pageNumber * page.pageSize,
      );
    };
    // 类型格式化
    const toCategory = () => {
      tableData.item[0].forEach(item => {
        let ran = Math.trunc(Math.random() * options.category.length);
        let categoryName = options.category[ran]['category_name'];
        item['categoryName'] = categoryName;
      });
    };
    // 转到详情页
    const categoryDetail = (row, index) => {
      // 将详情页数据存储到 vuex
      root.$store.commit(`info/${DETAIL_CATEGORY_DATA}`, {
        detail: row,
      });
      root.$router.push({
        name: 'infoDetail',
        params: {
          infoID: row.infoID,
          currentTotal: index,
        },
      });
    };

    // 监听
    watch(
      () => category.item,
      (nv, ov) => {
        root.$store.commit(`info/${INFO_CATEGORY_RESULTS}`, {
          category: nv,
        });
      },
      {
        lazy: true,
      },
    );
    watch(
      () => page.pageNumber,
      (nv, ov) => {
        let num = total.value / page.pageSize;
        if (!Number.isInteger(num)) {
          num = Math.trunc(num) + 1;
        }
        if (isSearchState.value) {
          return;
        }
        if (num - nv <= 3) {
          // 预加载请求
          getList(total, nv, true);
        }
      },
      { lazy: true },
    );

    /**
     * lifecycle
     */
    // 获取分类
    onMounted(() => {
      options.category.toString() || getInfoCategory();
      getList();
    });

    return {
      formInline,
      options,
      searchOption,
      tableData,
      search_key,
      value,
      value2,
      search_keyWork,
      dialog_info,
      dialog_info_edit,
      total,
      page,
      emptyText,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      toCategory,
      newsAdd,
      loadingTableData,
      search,
      searchWordWidth,
      searchStateRestore,
      restore,
      editData,
      newsEdit,
      categoryDetail,
    };
  },
};
</script>

<style lang="scss" scoped></style>
