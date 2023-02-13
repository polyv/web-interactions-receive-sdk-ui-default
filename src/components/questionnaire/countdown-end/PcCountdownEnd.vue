<template>
  <div class="plv-iar-questionnaire-countdown-end">
    <div class="plv-iar-questionnaire-countdown-end__contain">
      <img src="../imgs/icon-time-fill.svg" alt="" />
      <div>{{ iarTrans('questionnaire.countdownEndTip') }}</div>
    </div>
    <div class="plv-iar-questionnaire-countdown-end__footer">
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
  padding: 20px 0;
}
.plv-iar-questionnaire-countdown-end__contain {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin-bottom: 24px;
  }
}
.plv-iar-questionnaire-countdown-end__footer {
  padding-top: 16px;
  border-top: 1px solid #ECEFF1;
  display: flex;
  justify-content: center;
  button {
    width: 120px;
    height: 32px;
    font-size: 14px;
    padding: 0;
  }
}

</style>
