<template>
  <div class="plv-demo-lottery-default">
    <div class="plv-demo-lottery-default__lottery">
      <!-- 抽奖中 -->
      <on-lottery
        v-show="isLotteryShowing"
        :lottery-sdk="lotterySdk"
        :pattern="lotteryPattern"
        @lottery-status-changed="onLotteryStatusChange"
        @is-show-changed="onLotteryShowChange"
      />
    </div>

    <!-- 中奖记录 -->
    <modal
      no-bg
      draggable
      title="中奖记录"
      :visible="isShowRecord"
      :close-on-click-modal="false"
      @close="isShowRecord = false"
    >
      <lottery-record
        :lottery-sdk="lotterySdk"
        :lang="lang"
        :delay-time="3000"
        @lottery-list="onLotteryRecord"
        @submit-info="onClickRecord"
        @check-info="onClickRecord"
      />
    </modal>

    <!-- 中奖结果 -->
    <modal
      no-bg
      draggable
      title="中奖结果"
      :visible="isShowResult"
      :close-on-click-modal="false"
      :lang="lang"
      @close="isShowResult = false"
    >
      <lottery-end
        ref="lotteryEnd"
        :lottery-sdk="lotterySdk"
        :lottery-list="lotteryList"
        @to-show="setLotteryResultShow"
        @to-hide="setLotteryResultHide"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import OnLottery from '../../entry/lottery/on-lottery/PcOnLottery';
import LotteryEnd from '../../entry/lottery/lottery-end/PcLotteryEnd';
import LotteryRecord from '../../entry/lottery/lottery-record/PcLotteryRecord';
import Modal from '../demo-modal/PcModal';

export default {
  components: {
    OnLottery,
    Modal,
    LotteryEnd,
    LotteryRecord,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-demo-lottery-default-widget {
  position: absolute;
  right: 12px;
}
.plv-demo-lottery-default__lottery {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
