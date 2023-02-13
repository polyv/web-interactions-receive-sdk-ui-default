<!-- 任务详情公共组件 -->
<template>
  <div>
    <slot name="header">
      <countdown :time="countdownTime" />
    </slot>
    <prize-info
      :prize="prize"
    />
    <div class="plv-iar-welfare-lottery__task">
      <h3 class="plv-iar-welfare-lottery__task__title">{{ iarTrans('welfareLottery.participationConditions') }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Countdown from '../countdown';
import PrizeInfo from '../prize-info';
import mixin from '../mixin';

export default {
  components: {
    Countdown,
    PrizeInfo,
  },
  mixins: [mixin],
  props: {
    prize: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    countdownTime() {
      return Math.round((this.prize.endTime - Date.now()) / 1000);
    },
    isQuestionCondition() {
      return this.prize;
    }
  }
};
</script>

<style lang="scss">
.plv-iar-welfare-lottery__task {
  position: relative;
  padding: 8px 16px;
  background-color: #FFF8EB;
  border-radius: 8px;
  margin-bottom: 28px;
}
.plv-iar-welfare-lottery__task__title {
  color: #333;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
  margin-bottom: 4px;
}
</style>
