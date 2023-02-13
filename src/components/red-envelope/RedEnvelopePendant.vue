<!-- 红包挂件 -->
<template>
  <div class="plv-iar-red-envelope__pendant">
    <pendant
      :icon-url="iconUrl"
      :time="time"
      :segments="2"
      :tooltip="tipContent"
      :show-tooltip="showTip"
      @click="toggleTip"
      @countdown-end="$emit('end')"
    />
  </div>
</template>

<script>
import Pendant from '../pendant/pendant.vue';
import mixin from './mixin';
import normalPendantImg from './imgs/icon-pendant-normal.png';
import passwordPendantImg from './imgs/icon-pendant-password.png';
import rainPendantImg from './imgs/icon-pendant-rain.png';

export default {
  components: {
    Pendant,
  },
  mixins: [mixin],
  props: {
    // 红包类型
    type: {
      type: String,
      default: 'normal'
    },
    // 红包倒计时
    time: {
      type: Number,
      default: 0
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },
  data() {
    return {
      timer: null, // 倒计时计时器
      countdownTime: 0, // 倒计时时间: 时间戳
      showTip: false, // 是否显示提示文案
      tipTimer: null, // 文案提示计时器
      tip: '红包即将来袭',
    };
  },
  computed: {
    redEnvelopeType() {
      return this.type.toLowerCase();
    },
    tipContent() {
      const TEXT = {
        normal: this.iarTrans('redEnvelope.normalPendantTip'),
        official_normal: this.iarTrans('redEnvelope.normalPendantTip'),
        score_official_normal: this.iarTrans('redEnvelope.normalPendantTip'),
        password: this.iarTrans('redEnvelope.pwsPendantTip'),
        score_password: this.iarTrans('redEnvelope.pwsPendantTip'),
        alipay_password_official_normal: this.iarTrans('redEnvelope.pwsPendantTip'),
        rain: this.iarTrans('redEnvelope.rainPendantTip'),
        score_rain: this.iarTrans('redEnvelope.rainPendantTip'),
      };
      return TEXT[this.redEnvelopeType];
    },
    iconUrl() {
      const { customImgConfig } = this;
      const ICON_URL = {
        normal: customImgConfig?.normalPendantImg || normalPendantImg,
        score_official_normal: customImgConfig?.normalPendantImg || normalPendantImg,
        official_normal: customImgConfig?.normalPendantImg || normalPendantImg,
        password: customImgConfig?.passwordPendantImg || passwordPendantImg,
        alipay_password_official_normal: customImgConfig?.aliPasswordPendantImg || passwordPendantImg,
        score_password: customImgConfig?.passwordPendantImg || passwordPendantImg,
        rain: customImgConfig?.rainPendantImg || rainPendantImg,
        score_rain: customImgConfig?.rainPendantImg || rainPendantImg,
      };
      return ICON_URL[this.redEnvelopeType];
    },
  },
  methods: {
    toggleTip() {
      this.$emit('click');
      clearTimeout(this.tipTimer);
      this.showTip = true;
      this.tipTimer = setTimeout(() => {
        this.showTip = false;
        clearTimeout(this.tipTimer);
        this.tipTimer = null;
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
.plv-iar-red-envelope__pendant {
  .plv-iar-pendant__text {
    color: #FCEEBC;
    font-size: 12px;
    white-space: nowrap;
  }
  .plv-iar-pendant__tooltip {
    background-image: linear-gradient(231deg, #F65F49 0%, #FF9D4D 100%);
    border-color: #FD7232;
    color: #fff;
    &::before,
    &::after {
      border-left-color: #F65F49;
    }
  }
}
</style>
