<template>
  <div class="plv-iar-pendant" @click="onClick">
    <div
      class="plv-iar-pendant__icon"
      :style="{'background-image': `url(${iconUrl})`}"
    >
      <div
        v-if="showTooltip"
        class="plv-iar-pendant__tooltip"
        :class="`plv-iar-pendant__tooltip--${tooltipPosition}`"
      >
        {{ tooltip }}
      </div>
    </div>
    <div v-if="content" class="plv-iar-pendant__content">
      <span class="plv-iar-pendant__text pws-font-theme-color">{{ content }}</span>
    </div>
    <div v-else-if="countdownTime > 0" class="plv-iar-pendant__countdown">
      <span class="plv-iar-pendant__text pws-font-theme-color">{{ formatSeconds(countdownTime, { segments }) }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Polling from '@polyv/utils/src/polling';
import { formatSeconds } from '@polyv/utils/src/date';

export default {
  props: {
    /** 挂件图标图 */
    iconUrl: {
      type: String,
      required: true
    },
    /** 挂件图标下方文案，与倒计时互斥 */
    content: {
      type: [String, undefined],
      default: () => undefined
    },
    /** 倒计时时间，整数，单位秒，与content参数互斥 */
    time: {
      type: [Number, undefined],
      default: () => undefined
    },
    /** 倒计时显示格式: 3（hh:mm:ss）、2（mm:ss） */
    segments: {
      type: Number,
      default: 3,
      validator(val) {
        return [3, 2].indexOf(val) !== -1;
      },
    },
    /** 侧边提示文案 */
    tooltip: {
      type: [String, undefined],
      default: () => undefined
    },
    /** 是否显示侧边提示文案 */
    showTooltip: {
      type: Boolean,
      default: true,
    },
    /** 侧边提示文案位置，可选left/right，默认left */
    tooltipPosition: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'right'].indexOf(val) !== -1;
      },
    },
  },
  data() {
    return {
      countdownTime: 0,
      clock: null,
      tooltipVisible: false,
      hideTooltip: undefined,
      popupPolling: null,
    };
  },
  watch: {
    time: {
      immediate: true,
      handler(nv) {
        this.stopPopupPolling();
        this.countdownTime = Math.round(nv);
        if (this.countdownTime > 0) {
          this.initPopupPolling();
        }
      }
    },
  },
  methods: {
    formatSeconds,
    initPopupPolling() {
      const polling = this.popupPolling = new Polling(() => {
        if (this.countdownTime <= 0) {
          this.stopPopupPolling();
          // 倒计时结束
          this.$emit('countdown-end');
        } else {
          this.countdownTime -= 1;
          this.$emit('countdown', this.countdownTime);
        }
      }, {
        interval: 1000
      });
      polling.start();
    },
    stopPopupPolling() {
      if (this.popupPolling) {
        this.popupPolling.stop();
        this.popupPolling = null;
      }
    },
    onClick() {
      this.$emit('click');
    },
  }
};
</script>

<style lang="scss">
.plv-iar-pendant {
  position: relative;
  min-width: 40px;
  padding-top: 40px;
  user-select: none;
  cursor: pointer;
}
.plv-iar-pendant__icon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.plv-iar-pendant__content,
.plv-iar-pendant__countdown {
  text-align: center;
  white-space: nowrap;
  font-size: 12px;
  transform: scale(.83);
  line-height: 14px;
}
.plv-iar-pendant__tooltip {
  position: absolute;
  top: 6px;
  padding: 0 8px;
  border-radius: 4px;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  white-space: nowrap;
  border: 1px solid #333;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    transform: translateY(-50%);
    border-color: transparent;
    border-style: solid;
  }
  &::before {
    border-width: 8px;
  }
  &::after {
    border-width: 6px;
  }
}
.plv-iar-pendant__tooltip--right {
  left: 50px;
  &::before {
    left: -16px;
    border-right-color: #333;
  }
  &::after {
    left: -12px;
    border-right-color: #fff;
  }
}
.plv-iar-pendant__tooltip--left {
  right: 50px;
  &::before {
    right: -16px;
    border-left-color: #333;
  }
  &::after {
    right: -12px;
    border-left-color: #fff;
  }
}
</style>
