<template>
  <div id="layout" :class="[!!menuStatus ? 'close' : 'open']">
    <layout-header />
    <layout-main />
    <Layout-nav />
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import LayoutHeader from './Components/Header';
import LayoutMain from './Components/Main';
import LayoutNav from './Components/Nav';
export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav,
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.collapse.isCollapse);

    return {
      menuStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
#layout {
  background-color: #f7f7f7;
}
</style>
