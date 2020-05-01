<template>
  <div>
    <slot name="header">
      header
    </slot>
    <slot>
      default
    </slot>
    <slot name="footer">
      footer
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Test',
};
</script>

<style lang="scss" scoped></style>
