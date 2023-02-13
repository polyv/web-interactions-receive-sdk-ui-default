<!-- 扫码领奖公共组件 -->
<template>
  <div class="plv-iar-welfare-lottery__scan__qr-code__wrap">
    <div class="plv-iar-welfare-lottery__scan__qr-code">
      <img :src="qrCode" />
    </div>
    <div
      class="plv-iar-welfare-lottery__scan__tip"
      :class="{'plv-iar-welfare-lottery__scan__tip--ie': isIE}"
    >
      {{ qrCodeTips || iarTrans('welfareLottery.pressToIdentifyCode') }}
    </div>
  </div>
</template>

<script>
import { ieVersion } from '@polyv/utils/src/browser';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    qrCode: {
      type: String,
      required: true
    },
    qrCodeTips: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      isIE: !!ieVersion(),
    };
  },
};
</script>

<style lang="scss">
.plv-iar-welfare-lottery__scan__qr-code {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 64px auto 8px;
  font-size: 0;
  text-align: center;
  background-image: url(./qr-code-bg.png);
  background-repeat: no-repeat;
  background-size: contain;
  >img {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 120px;
    height: 120px;
  }
}
.plv-iar-welfare-lottery__scan__tip {
  width: 295px;
  // height: 50px;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  background-image: linear-gradient(90deg, #FE9067 0%, #FE3F52 100%);
  background-clip: text;
  color: transparent;
}
.plv-iar-welfare-lottery__scan__tip--ie {
  background-image: none;
  color: #FE3F52;
}
</style>
