<template>
  <div>
    <slot :countdown="calcDelay"></slot>
  </div>
</template>

<script>
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  name: 'CountDown',
  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      countdownTime: 0,
      timer: null
    };
  },
  computed: {
    calcDelay() {
      const time = Math.floor(this.countdownTime);
      let hour = 0;
      let min = 0;
      let second = 0;

      if (time > 60) {
        // 是否大于零
        min = Math.floor(time / 60); // 分钟
        second = Math.floor(time % 60); // 秒
        if (min > 60) {
          hour = Math.floor(min / 60);
          min = Math.floor(min % 60);
        }
      } else if (time > 0) {
        second = time;
      }
      return {
        hour: hour > 9 ? hour : '0' + hour,
        min: min > 9 ? min : '0' + min,
        second: second > 9 ? second : '0' + second
      };
    }
  },
  watch: {
    time: {
      handler(val) {
        this.countdownTime = Math.floor(val / 1000);
        this.initTimer();
      },
      immediate: true
    }
  },
  [BEFORE_DESTROY]() {
    this.clearTimer();
  },
  methods: {
    initTimer() {
      this.clearTimer();
      let oldDate = new Date().getTime();
      this.timer = setInterval(() => {
        const newDate = new Date().getTime();
        const diffDate = Math.round((newDate - oldDate) / 1000);
        if (this.countdownTime < 0) {
          this.clearTimer();
          this.timer = null;
          this.$emit('countdown-finish');
        } else {
          this.countdownTime = this.countdownTime - diffDate;
          oldDate = newDate;
        }
      }, 1000);

    },
    clearTimer() {
      if (this.timer) clearInterval(this.timer);
    }
  }
};
</script>
