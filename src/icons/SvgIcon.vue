<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue/composition-api';
export default {
  name: 'SvgIcon',
  // props 也可以是一个数组
  props: {
    className: {
      type: String,
      required: true,
      default: 'class-name-default',
      // 自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出
      vaildator(val) {
        return val.length > 1; // 这里以传入的字符串长度为 1 做演示
      },
    },
    iconClass: String,
  },
  setup(props, { root }) {
    // 计算属性
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return 'svg-icon';
      }
    });

    return {
      iconName,
      svgClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  // 修改 svg 颜色, 需要加: 表示当前的文字颜色, 即 color 属性值
  fill: currentColor;
}
</style>
