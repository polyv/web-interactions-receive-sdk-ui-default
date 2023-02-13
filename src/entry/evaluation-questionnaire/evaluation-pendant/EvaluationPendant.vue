<!-- 风险测评挂件 -->
<template>
  <div>
    <pendant
      :icon-url="iconUrl"
      :time="leftTime"
      :segments="2"
      :show-tooltip="false"
      @click="handleEntrance"
      @countdown="handleCountdown"
      @countdown-end="handleCountdownEnd"
    />
  </div>
</template>

<script>
import Pendant from '../../../components/pendant/pendant';
import mixin from './mixin';

export default {
  components: {
    Pendant
  },
  mixins: [mixin],
};

</script>
<style lang="scss">
.plv-iar-pendant__text {
  color: #fff;
}
</style>
