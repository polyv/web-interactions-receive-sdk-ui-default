<!-- 抽奖结果PC端组件 -->
<template>
  <modal-normal
    v-if="!showReceiveModal"
    :height="modalHeight"
    class="plv-iar-welfare-lottery__result-modal"
    :class="{'plv-iar-welfare-lottery__result-modal--ie': isIE}"
    @close="handleClose"
  >
    <template #header>
      <span>{{ iarTrans('welfareLottery.winningResult') }}</span>
    </template>
    <template #body>
      <loading v-if="showLoading" />
      <template v-else>
        <span class="plv-iar-welfare-lottery__result__record-btn" @click="handleRecord">{{ iarTrans('welfareLottery.record') }}</span>
        <lottery-result
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
import { ieVersion } from '@polyv/utils/src/browser';
import ModalNormal from '../modal-normal/PcModalNormal.vue';
import LotteryResult from './LotteryResult.vue';
import ReceivePrizes from '../receive-prizes/PcReceivePrizes.vue';
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
  data() {
    return {
      isIE: !!ieVersion(),
    };
  },
  computed: {
    modalHeight() {
      let modalHeight = 414;
      if (!this.lotteryData.thumbnail) {
        modalHeight = 345;
      }
      if (!this.isWinner) {
        modalHeight = 414;
      }
      return modalHeight;
    },
  }
};
</script>
<style lang="scss">
@import './base.scss';
.plv-iar-welfare-lottery__result__content {
  padding: 28px 0;
}
.plv-iar-welfare-lottery__result__record-btn {
  right: 16px;
  cursor: pointer;
  z-index: 1;
  @include arrow-right-black;
}
.plv-iar-welfare-lottery__result__exchange-code {
  margin-bottom: 28px;
}
.plv-iar-welfare-lottery__result-modal {
  .plv-iar-welfare-lottery__modal__body {
    position: relative;
  }
}
.plv-iar-welfare-lottery__result-modal--ie {
  .plv-iar-welfare-lottery__result__content__title {
    background-image: none;
    color: #FE3F52;
  }
  .plv-iar-welfare-lottery__result__prize__name--no-img {
    background-image: none;
    color: #FE3F52;
  }
}
.plv-iar-welfare-lottery__result__content__btn-group {
  padding: 0 116px;
}
</style>
