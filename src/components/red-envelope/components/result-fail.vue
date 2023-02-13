<!-- 红包领取失败 -->
<template>
  <div class="plv-iar-red-envelope__result--success">
    <div class="plv-iar-red-envelope__result__title plv-iar-red-envelope__result__title--super">{{ superTitleText }}</div>
    <div class="plv-iar-red-envelope__result__title">{{ titleText }}</div>
    <div class="plv-iar-red-envelope__result__btn">
      <button type="button" @click="$emit('close')">{{ iarTrans('redEnvelope.close') }}</button>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    status: {
      type: [String, undefined],
      default: () => undefined
    },
  },
  computed: {
    superTitleText() {
      return this.status === 'expired' ? this.iarTrans('redEnvelope.expired') : this.iarTrans('redEnvelope.unfortunately');
    },
    titleText() {
      return this.status === 'expired' ? this.iarTrans('redEnvelope.expired2') : this.iarTrans('redEnvelope.robbed');
    },
  }
};
</script>

<style lang="scss">
.plv-iar-red-envelope__result--fail {
  .plv-iar-red-envelope__result__title {
    margin-top: 4px;
    margin-bottom: 32px;
  }
  .plv-iar-red-envelope__result__title--super {
    margin-top: 76px;
    margin-bottom: 0;
  }
}
</style>
