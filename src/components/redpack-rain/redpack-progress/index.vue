<!-- @file 红包雨进度组件 -->
<template>
  <div class="plv-ia-c-redpack-rain-progress">
    <div class="plv-ia-c-redpack-rain-progress__clock">
      <div
        class="plv-ia-c-redpack-rain-progress__clock__circle"
        :class="{
          'plv-ia-c-redpack-rain-progress__clock__circle--transition': showWave
        }"
      >
        <div
          class="plv-ia-c-redpack-rain-progress__clock__circle-inner"
        ></div>
      </div>
      <div class="plv-ia-c-redpack-rain-progress__clock__pointer"></div>
    </div>

    <div class="plv-ia-c-redpack-rain-progress__main">
      <!-- 左侧背景 -->
      <div class="plv-ia-c-redpack-rain-progress__main__left"></div>
      <!-- 右侧背景 -->
      <div class="plv-ia-c-redpack-rain-progress__main__right"></div>
      <div
        class="plv-ia-c-redpack-rain-progress__main__inner"
        :style="{
          width: `${progressPercent}%`,
        }"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  props: {
    duration: {
      type: Number,
      default: 15
    },

    visible: {
      type: Boolean
    }
  },

  data() {
    return {
      timer: null,
      leftTime: 0,
      // 是否显示倒数波动动画
      showWave: false,
    };
  },

  computed: {
    durationMs() {
      return this.duration * 1000;
    },

    progressPercent() {
      return (this.leftTime / this.durationMs) * 100;
    },
  },

  watch: {
    visible: {
      immediate: true,
      handler() {
        if (this.visible) {
          if (this.duration) {
            this.leftTime = this.duration * 1000;
          }
          this.setTimer();
        } else {
          this.clearTimer();
          this.leftTime = 0;
        }
      }
    }
  },

  [BEFORE_DESTROY]() {
    this.clearTimer();
    this.showWave = false;
  },

  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        if (this.leftTime > 0) {
          this.leftTime -= 100;
        } else {
          this.$emit('end');
          this.clearTimer();
          return;
        }
        if (this.leftTime === 3000) {
          this.showWave = true;
        }
      }, 100);
    },

    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../entry/redpack-rain/redpack.scss';
@import '../../../assets/styles/basic.scss';

.plv-ia-c-redpack-rain-progress {
  position: relative;
  width: 100%;
  height: 32px;
}

$clock-width: 32px;
.plv-ia-c-redpack-rain-progress__clock {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: $clock-width;
  height: $clock-width;
  @include bg('./imgs/redpack-clock.png');
}
.plv-ia-c-redpack-rain-progress__clock__pointer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  @include bg('./imgs/redpack-clock-pointer.gif');
}
.plv-ia-c-redpack-rain-progress__clock__circle {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: - $clock-width/2;
  margin-top: - $clock-width/2;
  height: 100%;
  width: 100%;
  border: 3px solid #F14146;
  box-sizing: border-box;
  box-shadow: 0 0 5px 6px #FED06E;
  border-radius: 50%;
  opacity: 0;
  &--transition {
    opacity: 1;
    animation: wave 1s ease-in-out infinite;
  }
}
.plv-ia-c-redpack-rain-progress__main {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: calc(100% - 4px);
  height: 22px;
  @include bg('./imgs/redpack-progress-bg.png');
  background-size: calc(100% - 22px) 100%;
  &__left {
    width: 13px;
    height: 22px;
    position: absolute;
    left: 0;
    top: 0;
    @include bg('./imgs/redpack-progress-bg-left.png');
  }
  &__right {
    position: absolute;
    width: 13px;
    height: 22px;
    right: 0;
    top: 0;
    @include bg('./imgs/redpack-progress-bg-right.png');
  }
}
.plv-ia-c-redpack-rain-progress__main__inner {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 97%;
  height: 59%;
  max-width: calc(100% - 5px);
  overflow: hidden;
  border-radius: 8px;
  background-image: url(./imgs/redpack-progress.png);
  background-size: 60px 22px;
  background-repeat: repeat;
  background-position: 0 0;
  transition: width .1s ease;
}
.plv-ia-c-redpack-rain-progress__main__inner-transition {
  width: 0%;
}

@keyframes wave {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.7);
    opacity: 0;
  }
  75% {
    transform: scale(1.7);
    opacity: 0;
  }
  100% {
    transform: scale(1.7);
    opacity: 0;
  }
}
</style>
