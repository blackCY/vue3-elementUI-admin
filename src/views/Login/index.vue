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
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-show="model === 'register'">
          <label id="passwords">确认密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="verification">
          <label for="verify">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input id="verify" v-model.number="ruleForm.verification" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="g-block" @click="getSms()" :disabled="codeButtonStatus.status">
                {{ codeButtonStatus.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn g-block" :disabled="isDisabled">
            {{ model === 'login' ? '登录' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';
import { GetSms, InfoUser } from '@/api/login';
import { mapActions } from 'vuex';
import { LOGIN_ASYNC } from '../../store/mutations-types';
import Message from '@/utils/reminder';
import { reactive, ref } from '@vue/composition-api';
import { verifiication, verifiyUsername, verifiyPassword, verifyCode } from '@/utils/verification.js';
export default {
  name: 'Login',
  // context.root 相当于 this
  setup(props, { refs, root }) {
    /**
     * 声明数据
     */
    const menuTab = reactive([
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
    ]);
    const model = ref('login');
    const isDisabled = ref(false);
    const ruleForm = reactive({
      username: '1503982358@qq.com',
      password: 'blackCY520alone',
      passwords: 'blackCY520alone',
      verification: '981203',
    });
    const codeButtonStatus = reactive({
      status: false,
      text: '获取验证码',
    });
    const timer = ref(null);

    // 验证用户名
    let validateUsername = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请输入用户名'));
      } else if (!verifiyUsername(value)) {
        cb(new Error('用户名格式不正确'));
      } else {
        cb();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, cb) => {
      // 过滤后的数据
      ruleForm.password = verifiication(value);
      value = ruleForm.password;

      if (value === '') {
        cb(new Error('请输入密码'));
      } else if (!verifiyPassword(value)) {
        cb(new Error('密码为6-20位的数字或字母'));
      } else {
        cb();
      }
    };
    // 验证确认密码
    let validatePasswords = (rule, value, cb) => {
      // 过滤后的数据
      ruleForm.passwords = verifiication(value);
      value = ruleForm.passwords;
      if (model.value === 'login') {
        cb();
      }
      if (value === '') {
        cb(new Error('请再次输入密码'));
      } else if (value !== ruleForm.password) {
        cb(new Error('密码不一致'));
      } else if (!verifiyPassword(value)) {
        cb(new Error('密码为6-20位的数字或字母'));
      } else {
        cb();
      }
    };
    // 验证码
    let validateVerification = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('验证码不能为空'));
      } else if (!verifyCode(value)) {
        return cb(new Error('验证码格式有误'));
      } else {
        cb();
      }
    };
    // 获取验证码
    const getSms = () => {
      if (!ruleForm.username || !ruleForm.password || (model.value === 'register' && !ruleForm.passwords)) {
        // {refs, root})下的 root 相当于 this
        Message({
          message: '信息需要填写完整哦...',
          type: 'info',
        });
        return;
      }
      // 验证格式
      if (
        !verifiyUsername(ruleForm.username) ||
        !verifiyPassword(ruleForm.password) ||
        (model.value === 'register' && !verifiyPassword(ruleForm.passwords)) ||
        !verifyCode(ruleForm.verification)
      ) {
        Message({
          message: '信息格式不正确, 请重新填写...',
          type: 'info',
        });
        return;
      }
      // 验证码状态
      codeButtonStatus.status = true;
      Message({
        message: '验证码已发送',
        type: 'info',
        duration: 1000,
      });
      // 启用倒计时
      countDown();
      // 延时模拟
      setTimeout(() => {
        // 请求接口
        GetSms({
          username: ruleForm.username,
        })
          .then(res => {
            // succes
            Message({
              message: res.data.message,
              type: 'success',
            });
            // 启用登录/注册按钮
            isDisabled.value = false;
          })
          .catch(err => {});
      }, 3000);
    };

    // 表单规则验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePassword, trigger: 'blur' }],
      passwords: [{ validator: validatePasswords, trigger: 'blur' }],
      verification: [{ validator: validateVerification, trigger: 'blur' }],
    });

    /**
     * 声明函数
     */
    // 登录注册切换
    const toggleMenu = menu => {
      menuTab.forEach(v => {
        v.current = false;
      });
      model.value = menu.type;
      menu.current = true;
      // 重置表单
      refs['ruleForm'].resetFields();
      codeButtonStatus.status = false;
      codeButtonStatus.text = '获取验证码';
      clearInterval(timer.value);
    };
    // 登录注册提交
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let options = {
            username: ruleForm.username,
            password: sha1(ruleForm.password), // 加密
            verification: ruleForm.verification,
            model: model.value,
          };
          root.$store
            .dispatch(`login/${LOGIN_ASYNC}`, options)
            .then(res => {
              Message({
                message: res.data.message,
                type: 'success',
                duration: 1500,
                onClose() {
                  switch (options.model) {
                    case 'register':
                      toggleMenu(menuTab[0]);
                      break;
                    case 'login':
                      root.$router.push({
                        name: 'Control',
                      });
                      break;
                    default:
                      break;
                  }
                },
              });
            })
            .catch(err => {});
        } else {
          Message({ message: 'error submit!!' });
          return false;
        }
      });
    };
    // 倒计时
    const countDown = () => {
      if (timer.value) clearInterval(timer.value);
      let time = 10;
      timer.value = setInterval(() => {
        time--;
        codeButtonStatus.text = `倒计时 ${time}s`;
        if (time === 0) {
          clearInterval(timer.value);
          codeButtonStatus.status = false;
          codeButtonStatus.text = '获取验证码';
        }
      }, 1000);
    };

    return {
      menuTab,
      model,
      isDisabled,
      ruleForm,
      codeButtonStatus,
      rules,
      getSms,
      toggleMenu,
      submitForm,
    };
  },
};
</script>

<style lang="scss">
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
