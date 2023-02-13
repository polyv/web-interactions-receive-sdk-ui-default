<template>
  <div class="plv-iar-modal">
    <div
      class="plv-iar-modal__main plv-iar-modal__main--mobile"
      :style="{
        'width': mainWdith,
        'height': mainHeight
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
  props: {
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: 460
    },
  },
  computed: {
    mainWdith() {
      let temp;
      if (typeof this.width === 'number') {
        temp = `${this.width}px`;
      } else if (/^\d+%$/.test(this.width)) {
        temp = this.width;
      } else {
        temp = '100%';
      }
      return temp;
    },
    mainHeight() {
      let temp;
      if (typeof this.height === 'number') {
        temp = `${this.height}px`;
      } else if (/^\d+%$/.test(this.height)) {
        temp = this.height;
      } else {
        temp = '460px';
      }
      return temp;
    }
  },
};
</script>

<style lang="scss">
@import './base.scss';
.plv-iar-modal {
  background-color: rgba(0, 0, 0, .6);
}
.plv-iar-modal__main--mobile {
  bottom: 0;
  left: 0;
}
</style>
