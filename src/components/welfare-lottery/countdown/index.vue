<!-- 任务面板里的倒计时组件 -->
<template>
  <div class="plv-iar-welfare-lottery__countdown">
    <span>{{ iarTrans('welfareLottery.countdownTip1') }}</span>
    <span class="plv-iar-welfare-lottery__countdown__item">{{ hoursText }}</span>
    <span class="plv-iar-welfare-lottery__countdown__item__colon">:</span>
    <span class="plv-iar-welfare-lottery__countdown__item">{{ minutesText }}</span>
    <span class="plv-iar-welfare-lottery__countdown__item__colon">:</span>
    <span class="plv-iar-welfare-lottery__countdown__item">{{ secondsText }}</span>
    <span>{{ iarTrans('welfareLottery.countdownTip2') }}</span>
  </div>
</template>

<script>
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    time: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      countdownTime: 0,
      clock: null,
    };
  },
  computed: {
    hours() {
      return this.countdownTime > 0 ? Math.floor(this.countdownTime / 3600) : 0;
    },
    hoursText() {
      const hours = this.hours;
      return hours ? (hours >= 10 ? `${hours}` : `0${hours}`) : '00';
    },
    minutes() {
      if (this.countdownTime <= 0) return 0;
      const temp = this.countdownTime % 3600;
      return Math.floor(temp / 60);
    },
    minutesText() {
      const minutes = this.minutes;
      return minutes ? (minutes >= 10 ? `${minutes}` : `0${minutes}`) : '00';
    },
    seconds() {
      if (this.countdownTime <= 0) return 0;
      return this.countdownTime % 3600 % 60;
    },
    secondsText() {
      const seconds = this.seconds;
      return seconds ? (seconds >= 10 ? `${seconds}` : `0${seconds}`) : '00';
    },
  },
  watch: {
    time: {
      immediate: true,
      handler(nv) {
        this.countdownTime = nv;
        if (this.time > 0) {
          this.countdown();
        } else {
          this.clearClock(this.clock);
        }
      }
    }
  },
  methods: {
    clearClock(clock) {
      clearTimeout(clock);
      clock = null;
    },
    countdown() {
      this.clearClock(this.clock);
      this.clock = setTimeout(() => {
        if (this.countdownTime > 0) {
          this.countdownTime--;
          this.countdown();
        } else {
          this.clearClock(this.countdownClock);
          this.$emit('end');
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import '../font.scss';

.plv-iar-welfare-lottery__countdown {
  margin-bottom: 12px;
  color: #fff;
  font-size: 0;
  text-align: center;
  line-height: 28px;
  span {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
  .plv-iar-welfare-lottery__countdown__item {
    min-width: 24px;
    height: 28px;
    padding: 0 4px;
    color: #FE3F52;
    font-size: 16px;
    font-weight: 500;
    font-family: DINProFont;
    background-color: #FEF5E5;
    box-shadow: inset 1px 1px 2px 0 rgba(254, 145, 103, .6);
    border-radius: 4px;
  }
}
</style>
