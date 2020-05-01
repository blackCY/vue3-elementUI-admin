<template>
  <div>
    <el-dialog title="编辑" :visible.sync="data.dialog_flag_info" @close="close" width="580px" @opened="openDialog">
      <el-form :model="form" ref="addInfoForm">
        <el-form-item label="类别" :label-width="data.formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域" @change="changeCategoryName">
            <el-option
              v-for="item in categoryOption.item"
              :label="item.category_name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="data.formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="data.formLabelWidth">
          <el-input type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close" size="mini">取 消</el-button>
        <el-button type="danger" size="mini" @click="submit" :loading="submit_loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, watchEffect, watch, computed, onMounted } from '@vue/composition-api';
import { AddInfo } from '@/api/news';
import Message from '@/utils/reminder';
export default {
  name: 'DialogEdit',
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    flag: {
      type: Boolean,
      default: false,
      required: true,
    },
    category: {
      type: Array,
      defualt: () => [],
      required: true,
    },
    editData: {
      type: Object,
      default: () => {
        return {};
      },
      // required: true,
    },
  },
  setup(props, { emit, root }) {
    const data = reactive({
      dialog_flag_info: false,
      formLabelWidth: '70px',
    });
    const form = reactive({
      category: '',
      title: '',
      content: '',
    });
    const submit_loading = ref(false);
    const categoryName = ref('');

    const resetForm = () => {
      form.category = '';
      form.title = '';
      form.content = '';
    };

    const close = () => {
      data.dialog_flag_info = false;
      emit('update:flag', false);
      if (props.type === 'add') resetForm();
    };

    const categoryOption = reactive({
      item: [],
    });

    const openDialog = () => {
      if (categoryOption.item.toString() === '') {
        categoryOption.item = props.category;
      }
    };

    const changeCategoryName = value => {
      categoryName.value = props.category.filter(item => item.id === value)[0]['category_name'];
    };

    // 监听
    watch(
      () => props.editData,
      (nv, ov) => {
        form.category = nv.categoryName;
        form.title = nv.title;
        form.content = nv.content;
      },
      {
        lazy: true,
      },
    );

    watchEffect(() => {
      data.dialog_flag_info = props.flag;
    });
    const submit = () => {
      if (!form.category || !form.title || !form.content) {
        Message({
          message: '请完整填写信息才能提交哦',
          duration: 1500,
        });
        return;
      }
      submit_loading.value = true;
      let options = {
        categoryID: form.category,
        title: form.title,
        content: form.content,
        categoryName: categoryName.value || props.editData.categoryName,
      };
      AddInfo(options)
        .then(res => {
          submit_loading.value = false;
          Message({
            message: res.data.message,
            type: 'success',
            duration: 1500,
            onClose() {
              close();
              if (props.type === 'edit') {
                emit('newsEdit', options);
              } else {
                emit('newsAdd', options);
                resetForm();
              }
            },
          });
        })
        .catch(err => {
          submit_loading.value = false;
        });
    };

    return {
      data,
      form,
      submit_loading,
      close,
      openDialog,
      categoryOption,
      submit,
      changeCategoryName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
