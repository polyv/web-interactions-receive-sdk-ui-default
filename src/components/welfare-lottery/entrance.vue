<!-- 条件抽奖入口挂件 -->
<template>
  <div class="plv-iar-welfare-lottery__pendant">
    <pendant
      :icon-url="iconUrl"
      :content="content"
      :time="countdownTime"
      :segments="segments"
      :tooltip="hint"
      :show-tooltip="showHint"
      :tooltip-position="hintPosition"
      @click="$emit('click')"
      @countdown="onCountdown"
      @countdown-end="onCountdownEnd"
    />
  </div>
</template>

<script>
import Pendant from '../pendant/pendant.vue';
import normalIconUrl from './imgs/pendant.png';
import questionIconUrl from './imgs/pendant-question.png';

export default {
  components: {
    Pendant,
  },
  props: {
    entranceImg: {
      type: [String, undefined],
      default: undefined
    },
    // 挂件下方文案
    copywriting: {
      type: [String, undefined],
      default: undefined
    },
    // 进行倒计时的时间（s）,小于等于0时，如果有文案，则显示文案
    countdownTime: {
      type: Number,
      default: 0
    },
    // 提示语内容
    hint: {
      type: [String, undefined],
      default: () => undefined
    },
    // 提示语位置：right、left
    hintPosition: {
      type: String,
      default: 'left'
    },
    isQuestionCondition: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      showHint: false,
    };
  },
  computed: {
    iconUrl() {
      return this.isQuestionCondition ? (this.entranceImg || questionIconUrl) : normalIconUrl;
    },
    segments() {
      return this.countdownTime > 3600 ? 3 : 2;
    },
    content() {
      return this.countdownTime > 0 ? '' : this.copywriting;
    },
  },
  watch: {
    countdownTime(nv) {
      this.showHint = nv > 0;
    }
  },
  methods: {
    onCountdown(secs) {
      this.showHint = secs <= 3;
    },
    onCountdownEnd() {
      this.showHint = false;
    },
  }
};
</script>

<style lang="scss">
.plv-iar-welfare-lottery__pendant {
  position: relative;
  .plv-iar-pendant__text {
    color: rgba(255, 255, 255, .8);
  }
  .plv-iar-pendant__tooltip {
    background-image: linear-gradient(135deg, #FE9668 0%, #FE3F52 46%, #FF5691 100%);
    border-color: #FE9164;
    color: #fff;
    &::before,
    &::after {
      border-left-color: #FF5691;
      box-sizing: border-box;
    }
  }
}
</style>
