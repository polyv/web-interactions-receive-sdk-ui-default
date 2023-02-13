<template>
  <div class="plv-iar-module-container-default">
    <div
      class="plv-iar-module-container-default__body"
      :class="{
        'plv-iar-module-container-default__body--border': withBorder
      }"
      :style="{
        height: `${maxBodyHeight}px`,
      }"
      @scroll="onScroll"
    >
      <div ref="bodyMain">
        <slot></slot>
      </div>
    </div>
    <div class="plv-iar-module-container-default__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxBodyHeight: {
      type: [Number, null],
      default: 292,
    }
  },

  data() {
    return {
      withBorder: false,
    };
  },

  mounted() {
    this.updateBorderStatus();
  },

  methods: {
    updateBorderStatus() {
      this.$nextTick(() => {
        const $bodyMain = this.$refs.bodyMain;
        // 产生滚动时展示下方边框
        if ($bodyMain.clientHeight > this.maxBodyHeight) {
          this.withBorder = true;
        } else {
          this.withBorder = false;
        }
      });
    },

    onScroll(e) {
      this.$emit('scroll', e);
    },
  },
};
</script>

<style lang="scss">
@import '../../../assets/styles/basic.scss';
// 滚动条样式
.plv-iar-module-container-default {
  color: #333;
}
.plv-iar-module-container-default__body {
  overflow-y: auto;
  border-bottom: transparent solid #eceff1;
  box-sizing: border-box;
  @include scrollbar;
}
.plv-iar-module-container-default__body--border {
  border-bottom: 1px solid #eceff1;
}

.plv-iar-module-container-default__footer {
  position: relative;
}
</style>
