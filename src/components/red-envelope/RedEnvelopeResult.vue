<!-- 红包领取结果 -->
<template>
  <red-envelope-modal @close="$emit('close')">
    <red-envelope-result-success
      v-if="redEnvelopeData.status === 'received'"
      class="plv-iar-red-envelope__result plv-iar-red-envelope__result--success"
      :class="{'plv-iar-red-envelope__result__alipay-pwd-rn': isAlipayPwdRn}"
      :is-point="isPoint"
      :amount="redEnvelopeData.amount"
      :unit="unit"
      :with-draw-enabled="withDrawEnabled"
      :alipay-password="redEnvelopeData.alipayPassword"
      :is-alipay-pwd-rn="isAlipayPwdRn"
      v-on="$listeners"
    />
    <red-envelope-result-fail
      v-else
      class="plv-iar-red-envelope__result plv-iar-red-envelope__result--fail"
      :status="redEnvelopeData.status"
      @close="$emit('close')"
    />
  </red-envelope-modal>
</template>

<script>
import RedEnvelopeModal from './components/RedEnvelopeModal';
import RedEnvelopeResultSuccess from './components/result-success';
import RedEnvelopeResultFail from './components/result-fail';

export default {
  components: {
    RedEnvelopeModal,
    RedEnvelopeResultSuccess,
    RedEnvelopeResultFail,
  },
  props: {
    redEnvelopeData: {
      type: Object,
      default: () => ({})
    },
    isPoint: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    },
    withDrawEnabled: {
      type: Boolean,
      default: true,
    },
    isAlipayPwdRn: {
      type: Boolean,
      default: false
    },
  }
};
</script>

<style lang="scss">
.plv-iar-red-envelope__result {
  position: relative;
  width: 270px;
  height: 308px;
  color: #FCEEBC;
  text-align: center;
  background-size: cover;
  border-radius: 18px;
  overflow: hidden;
}
.plv-iar-red-envelope__result--success {
  background-image: url(./imgs/get-success.png);
}
.plv-iar-red-envelope__result--fail,
.plv-iar-red-envelope__result__alipay-pwd-rn {
  height: 268px;
  background-image: url(./imgs/get-fail.png);
}
.plv-iar-red-envelope__result__title {
  font-size: 20px;
  line-height: 28px;
}
.plv-iar-red-envelope__result__title--super {
  font-size: 28px;
  line-height: 40px;
}
.plv-iar-red-envelope__result__money {
  margin-top: 8px;
  margin-bottom: 48px;
  font-size: 32px;
  font-weight: 500;
  >span {
    font-size: 48px;
  }
}
.plv-iar-red-envelope__result__btn {
  >button {
    width: 230px;
    height: 48px;
    color: #4A2206;
    font-size: 16px;
    line-height: 22px;
    background-image: url(./imgs/btn-accept.png);
    background-size: cover;
    border-radius: 24px;
    border: none;
  }
}
.plv-iar-red-envelope__result__tip {
  margin-top: 8px;
  font-size: 12px;
  line-height: 17px;
}
</style>
