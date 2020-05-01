<template>
  <div id="header-wrap">
    <!-- 这里的 pull-left 是全局的样式类名 -->
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="nemu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <el-avatar style="margin-right: 10px; cursor: pointer;" size="small" icon="el-icon-user-solid" />
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="logout">
        <svg-icon iconClass="exit" className="exit" style="font-size: 20px;" slot="reference" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import { SET_COLLAPSE, LOGOUT } from '@/store/mutations-types';
import { removeCookitWithToken, removeCookitWithUsername } from '../../../utils/app';
export default {
  name: 'Header',
  setup(props, { root }) {
    const username = computed(() => root.$store.state.login.username);
    const navMenuState = () => {
      root.$store.commit(`collapse/${SET_COLLAPSE}`);
    };
    // 登出
    const logout = () => {
      root.$router.push({
        name: 'Login',
      });
      root.$store
        .dispatch(`login/${LOGOUT}`)
        .then(() => {})
        .catch(err => {});
    };
    return {
      navMenuState,
      username,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  background-color: #fff;
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
    @include webkit(user-select, none);
  }
}
.user-info {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 18px;
  }
}
</style>
