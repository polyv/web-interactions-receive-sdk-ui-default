<template>
  <div ref="label" class="plv-iar-bulletin__top-bubble-label">
    <div
      ref="content"
      class="plv-iar-bulletin__top-bubble-label__content"
      @click="$emit('look')"
      v-html="formatContent(content)"
    ></div>
    <div v-if="showDots" class="plv-iar-bulletin__top-bubble-label__dots">...</div>
    <div class="plv-iar-bulletin__top-bubble-label__close" @click="$emit('close')">
      <svg viewBox="0 0 16 16" class="design-iconfont">
        <path
          d="M2 5L8 11 14 5"
          transform="matrix(1 0 0 -1 0 16)"
          stroke="#CCC"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
  props: {
    content: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      showDots: false,
    };
  },
  watch: {
    content: {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.showDots = this.$refs.content.scrollHeight > 102;
        }, 0);
      },
    },
  },
};
</script>

<style lang="scss">
.plv-iar-bulletin__top-bubble-label {
  position: relative;
  width: 100px;
  padding: 8px;
  box-sizing: border-box;
  background-color: #000;
  opacity: .6;
  border-radius: 8px;
  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    margin-left: -5px;
    border-top-width: 6px;
    border-right-width: 5px;
    border-bottom-width: 6px;
    border-left-width: 5px;
    border-style: solid;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #000;
    border-left-color: transparent;
  }
}
.plv-iar-bulletin__top-bubble-label__content {
  max-height: 102px;
  overflow: hidden;
  word-break: break-word;
  * {
    font-size: 12px;
    line-height: 17px;
    color: #fff;
    margin: 0;
  }
}
.plv-iar-bulletin__top-bubble-label__dots {
  position: absolute;
  right: 24px;
  bottom: 8px;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
  background-color: #000;
}
.plv-iar-bulletin__top-bubble-label__close {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 16px;
  height: 16px;
  font-size: 0;
  background-color: #000;
}
</style>
