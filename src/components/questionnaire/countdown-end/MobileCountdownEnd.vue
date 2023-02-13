<template>
  <div class="plv-iar-questionnaire-countdown-end">
    <div class="plv-iar-questionnaire-countdown-end__contain">
      <img src="../imgs/icon-time-fill.svg" alt="" />
      <div class="plv-iar-questionnaire-countdown-end__contain__text">{{ iarTrans('questionnaire.countdownEndTip') }}</div>
    </div>

    <div
      class="plv-iar-mobile-questionnaire-answer-default__btn__wrap"
      :style="{
        paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
      }"
    >
      <iar-button
        @click="clickKnow"
      >
        {{ iarTrans('questionnaire.knowBtn') }}
      </iar-button>
    </div>
  </div>
</template>

<script>
import IarButton from '../../../components/common/button/MobileButton';
import mixin from './mixin';

export default {
  name: 'CountdownEnd',
  components: {
    IarButton
  },
  mixins: [mixin]
};
</script>

<style lang="scss">
.plv-iar-questionnaire-countdown-end {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.plv-iar-questionnaire-countdown-end__contain {
  padding: 24px 24px 0;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 68px;
    margin-bottom: 24px;
  }
  .plv-iar-questionnaire-countdown-end__contain__text {
    width: 160px;
    text-align: center;
    line-height: 1.5rem;
  }
}
.plv-iar-questionnaire-countdown-end__footer {
  margin-top: 20px;
  text-align: center;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
}

</style>
