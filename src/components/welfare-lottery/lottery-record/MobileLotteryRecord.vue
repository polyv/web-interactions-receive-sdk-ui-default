<!-- 中奖记录移动端组件 -->
<template>
  <modal-normal
    v-if="!showReceiveModal"
    class="plv-iar-welfare-lottery__record-modal"
    @close="handleClose"
  >
    <template #header>
      <span class="plv-iar-welfare-lottery__modal__back-btn--black" @click="handleBack"></span>
      <h2 class="plv-iar-welfare-lottery__modal__title--center">{{ iarTrans('welfareLottery.record') }}</h2>
    </template>
    <template #body>
      <loading v-if="showLoading" />
      <div v-if="list.length" class="plv-iar-welfare-lottery__record-list" @scroll="onScroll">
        <div
          v-for="(item, index) in list"
          :key="item.lotteryId"
          class="plv-iar-welfare-lottery__record__item"
        >
          <img v-if="item.prizeImage" class="plv-iar-welfare-lottery__record__item__pic" :src="item.prizeImage" />
          <div class="plv-iar-welfare-lottery__record__item-right">
            <h2 class="plv-iar-welfare-lottery__record__item__name">{{ item.prizeName }}</h2>
            <div>
              <welfare-lottery-btn
                :type="item.formatType === 0 ? 'deep' : 'border'"
                size="sm"
                @click="handleRecordItemClick(item, index)"
              >
                {{ iarTrans(item.formatType === 0 ? 'welfareLottery.receive' : 'welfareLottery.see') }}
              </welfare-lottery-btn>
              <div class="plv-iar-welfare-lottery__record__item__detail">
                <p class="plv-iar-welfare-lottery__record__item__detail__code">{{ iarTrans('welfareLottery.redemptionCode') }}:{{ item.winnerCode }}</p>
                <p>{{ iarTrans('welfareLottery.winningTime') }}:{{ formatDate(item.winTime) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="plv-iar-welfare-lottery__record--no-data">{{ iarTrans('welfareLottery.noRecord') }}</div>
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
import WelfareLotteryBtn from '../btn.vue';
import ReceivePrizes from '../receive-prizes/MobileReceivePrizes.vue';
import Loading from '../Loading.vue';
import mixin from './mixin';

export default {
  components: {
    ModalNormal,
    WelfareLotteryBtn,
    ReceivePrizes,
    Loading,
  },
  mixins: [mixin],
};
</script>

<style lang="scss">
@import './base.scss';
@import '../base.scss';
.plv-iar-welfare-lottery__record-modal {
  .plv-iar-welfare-lottery__modal__back-btn--black {
    top: 14px;
  }
  .plv-iar-welfare-lottery__modal__title--center {
    font-size: 18px;
  }
}
.plv-iar-welfare-lottery__record-list {
  padding: 12px 16px;
}
.plv-iar-welfare-lottery__record__item {
  margin-bottom: 16px;
}
.plv-iar-welfare-lottery__record__item__pic {
  width: 90px;
  height: 90px;
}
.plv-iar-welfare-lottery__record__item__detail {
  >p {
    margin-bottom: 2px;
  }
}

@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-welfare-lottery__record-modal {
    .plv-iar-modal__main {
      @include full-screen-modal;
    }
  }
}
</style>
