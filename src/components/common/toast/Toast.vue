<template>
  <div v-if="visible" class="plv-iar-toast">{{ text }}</div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    // 要显示的文案
    text: {
      type: String,
      default: ''
    },
    // 显示时长，单位秒
    duration: {
      type: Number,
      default: 3
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  BEFORE_DESTROY() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  watch: {
    visible(nv) {
      if (nv) {
        this.countdown();
      }
    }
  },
  methods: {
    countdown() {
      const { duration } = this;
      const time = duration > 0 ? duration : 3;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit('hidden');
        clearTimeout(this.timer);
        this.timer = null;
      }, time * 1000);
    }
  }
};
</script>

<style lang="scss">
.plv-iar-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 18px;
  z-index: 99999;
}
</style>
