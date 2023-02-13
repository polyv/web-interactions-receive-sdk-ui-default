<!-- @file 商品标签组件 -->

<template>
  <div
    class="plv-iar-product__label pws-product-theme-tags-bg"
    :style="{
      width: `${width}px`,
      maxWidth: maxWidth ? `${maxWidth}px`: 'none'
    }"
    :title="text"
  >
    <span
      ref="labelContent"
      class="plv-iar-product__label__content pws-product-theme-text-color"
    >{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },

    tagWidth: {
      type: Number,
      default: 52
    },

    maxWidth: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {
      width: 0
    };
  },

  watch: {
    text() {
      this.$nextTick(() => {
        this.setWidth();
      });
    }
  },

  mounted() {
    this.setWidth();
  },

  methods: {
    setWidth() {
      const contentDom = this.$refs.labelContent;
      // 内容宽度 * 0.83得到10px字体大小下的宽度，再加上左右的内边距12px
      this.width = contentDom.clientWidth * 0.83 + 12;
    }
  },
};
</script>

<style lang="scss">
.plv-iar-product__label {
  user-select: none;
  min-width: 52px;
  height: 18px;
  line-height: 18px;
  display: inline-block;
  flex-shrink: 0;
  position: relative;
  font-size: 12px;
  cursor: default;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(.83);
  }
}
</style>
