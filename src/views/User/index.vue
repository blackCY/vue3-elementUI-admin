<template>
  <div>
    用户列表
    <test>
      <template v-slot:header></template>
      <template v-slot:footer></template>
      <p>11111</p>
    </test>
  </div>
</template>

<script>
import Test from './test';
export default {
  name: 'User',
  components: {
    Test,
  },
};
</script>

<style lang="scss" scoped></style>
