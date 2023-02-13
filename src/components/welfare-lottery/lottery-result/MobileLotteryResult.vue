<!-- 抽奖结果移动端组件 -->
<template>
  <modal-normal
    v-if="!showReceiveModal"
    class="plv-iar-welfare-lottery__modal--result"
    :height="modalHeight"
    @close="handleClose"
  >
    <template #header>
      <span class="plv-iar-welfare-lottery__result__record-btn" @click="handleRecord">{{ iarTrans('welfareLottery.record') }}</span>
      <h2 class="plv-iar-welfare-lottery__result__header__title">{{ iarTrans('welfareLottery.winningResult') }}</h2>
    </template>
    <template #body>
      <loading v-if="showLoading" />
      <lottery-result
        v-else
        :lottery-data="lotteryData"
        :is-winner="isWinner"
        :winner-code="winnerCode"
        :is-apple-mod="isAppleMod"
        :is-question-condition="isQuestionCondition"
        @got-it="handleClose"
        @receive="handleReceive"
        @winner-list="handleWinnerList"
      />
    </template>
  </modal-normal>
  <receive-prizes
    v-else
    :receive-data="receiveData"
    @close="handleClose"
    @back="hideReceiveModal"
    @submit="handleSubmit"
  />
</template>

<script>
import ModalNormal from '../modal-normal/MobileModalNormal.vue';
import LotteryResult from './LotteryResult.vue';
import ReceivePrizes from '../receive-prizes/MobileReceivePrizes.vue';
import Loading from '../Loading.vue';
import mixin from './mixin';

export default {
  components: {
    ModalNormal,
    LotteryResult,
    ReceivePrizes,
    Loading,
  },
  mixins: [mixin],
  computed: {
    modalHeight() {
      let modalHeight = 410;
      if (!this.lotteryData.thumbnail) {
        modalHeight = 340;
      }
      if (!this.isWinner) {
        modalHeight = 410;
      }
      return modalHeight;
    },
  }
};
</script>
<style lang="scss">
@import '../base.scss';
.plv-iar-welfare-lottery__result__content {
  padding: 20px 0;
}
.plv-iar-welfare-lottery__result__record-btn {
  top: 0;
  left: 16px;
}
.plv-iar-welfare-lottery__result__header__title {
  font-size: 18px;
  color: #333;
  font-weight: normal;
  text-align: center;
  margin: 0;
  padding: 0;
}
.plv-iar-welfare-lottery__result__exchange-code {
  margin-bottom: 24px;
}
.plv-iar-welfare-lottery__result__content__btn-group {
  padding: 0 24px;
}
.plv-iar-welfare-lottery__modal__body {
  display: flex;
  flex-direction: column;
}
@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-welfare-lottery__modal--result {
    .plv-iar-modal__main {
      @include full-screen-modal;
    }
    .plv-iar-welfare-lottery__result__content {
      padding-top: 10px;
      height: 100%;
      max-height: calc(100vh - 50px);
    }
  }
}
</style>
