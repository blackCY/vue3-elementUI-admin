<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{ current: item.current }" v-for="item in menuTab" :key="item.txt" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm login-form"
        size="small"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="verification">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.verification" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="g-block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn g-block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { verifiication, verifiyUsername, verifiyPassword, verifyCode } from '@/utils/verification.js';
export default {
  name: 'Login',
  data() {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!verifiyUsername(value)) {
        callback(new Error('用户名格式不正确'));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.password = verifiication(value);
      value = this.ruleForm.password;

      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!verifiyPassword(value)) {
        callback(new Error('密码为6-20位的数字或字母'));
      } else {
        callback();
      }
    };
    // 验证确认密码
    let validatePasswords = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.passwords = verifiication(value);
      value = this.ruleForm.passwords;
      if (this.model === 'login') {
        callback();
      }
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        console.log(1);
        callback(new Error('密码不一致'));
      } else {
        callback();
      }
    };
    // 验证码
    let validateVerification = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      } else if (!verifyCode(value)) {
        return callback(new Error('验证码格式有误'));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        {
          txt: '登录',
          current: true,
          type: 'login',
        },
        {
          txt: '注册',
          current: false,
          type: 'register',
        },
      ],
      model: 'login',
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        verification: '',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        passwords: [{ validator: validatePasswords, trigger: 'blur' }],
        verification: [{ validator: validateVerification, trigger: 'blur' }],
      },
    };
  },
  methods: {
    toggleMenu(menu) {
      this.menuTab.forEach(v => {
        v.current = false;
      });
      this.model = menu.type;
      menu.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/theme/element-variables.scss';
#login {
  height: 100vh;
  background-color: $--color-bgc;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 20px label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .g-block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
