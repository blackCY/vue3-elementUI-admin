<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类信息">
        <el-select v-model="form.categoryName">
          <el-option
            v-for="item in $store.state.info.categoryList"
            :key="item.id"
            :value="item.category_name"
            :label="item.category_name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="缩略图">
        缩略图
      </el-form-item>

      <el-form-item label="发布日期">
        <el-date-picker v-model="form.createDate" disabled type="datetime" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容">
        <quill-editor v-model="form.content" ref="myQuillEditor" :options="data.editorOprion"></quill-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="submit_loading">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 富文本编辑器
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { reactive, computed, onMounted, ref } from '@vue/composition-api';
import moment from 'moment';
import { AddInfo } from '@/api/news';
import Message from '@/utils/reminder';
export default {
  name: 'infoDetail',
  components: {
    quillEditor,
  },
  setup(props, { root }) {
    const detail = computed(() => root.$store.state.info.detail).value;
    const form = reactive({
      categoryName: detail.categoryName,
      title: detail.title,
      createDate: detail.createDate,
      content: detail.content,
      categoryID: detail.categoryID,
    });
    const data = reactive({
      editorOprion: {},
    });
    const editIndex = root.$route.params.currentTotal;
    const tableData = computed(() => root.$store.state.info.tableData).value;
    const page = computed(() => root.$store.state.info.page).value;
    const submit_loading = ref(false);
    // 保存
    const onSubmit = () => {
      // 开启 loading
      submit_loading.value = true;
      let index = page.pageSize * (page.pageNumber - 1) + editIndex;
      tableData.item[0][index].title = form.title;
      tableData.item[0][index].categoryName = form.categoryName;
      tableData.item[0][index].content = form.content;
      tableData.item[0][index].createDate = moment().format('YYYY-MM-DD HH:mm:ss');
      tableData.currentPageItem = tableData.item[0].slice(
        (page.pageNumber - 1) * page.pageSize,
        page.pageNumber * page.pageSize,
      );

      // 后台请求
      let options = {
        categoryID: form.categoryID,
        title: form.title,
        content: form.content,
        categoryName: form.categoryName,
      };
      AddInfo(options)
        .then(res => {
          submit_loading.value = false;
          Message({
            message: res.data.message,
            type: 'success',
            duration: 1000,
            onClose() {
              // 跳转到首页
              root.$router.push({
                path: '/info/infohome',
              });
            },
          });
        })
        .catch(err => {
          submit_loading.value = false;
        });
    };

    return {
      onSubmit,
      form,
      data,
      submit_loading,
    };
  },
};
</script>

<style lang="scss" scoped></style>
