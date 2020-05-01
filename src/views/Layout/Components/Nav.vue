<template>
  <div id="nav-wrap">
    <div class="logo"><img src="../../../assets/logo.png" alt="" /></div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#fff"
      router
      style="border:none"
    >
      <template v-for="(item, idx) in routes">
        <el-submenu :key="item.path" :index="idx + ''" v-if="!item.hidden">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>

          <template v-for="subItem in item.children">
            <el-menu-item :index="subItem.path" :key="subItem.path" v-if="!subItem.hidden">
              {{ subItem.meta.name }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api';
import SvgIcon from '@/icons/SvgIcon.vue';
export default {
  name: 'Nav',
  components: {
    SvgIcon,
  },
  setup(props, { root }) {
    const routes = reactive(root.$router.options.routes);

    // const isCollapse = ref(false);
    // 监听
    const isCollapse = computed(() => root.$store.state.collapse.isCollapse);

    return {
      isCollapse,
      routes,
    };
  },
};
</script>

<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: $navMenu;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s !important);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  @include webkit(z-index, 999 !important);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $navMenu;
  min-height: 400px;
}
.logo {
  text-align: center;
  img {
    margin: 10px auto 15px;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s !important);
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo {
    img {
      width: 60%;
    }
  }
}
</style>
