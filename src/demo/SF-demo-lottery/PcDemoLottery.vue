<template>
  <div class="plv-demo-lottery-default">
    <div class="plv-demo-lottery-default__lottery">
      <!-- 抽奖中 -->
      <on-lottery
        v-show="isLotteryShowing"
        :lottery-sdk="lotterySdk"
        :lang="lang"
        :member-list="memberList"
        :scroll-speed="2"
        @lottery-status-changed="onLotteryStatusChange"
        @is-show-changed="onLotteryShowChange"
      />
    </div>
    <!-- 中奖结果 -->
    <modal
      no-bg
      draggable
      :title="modelTile"
      :visible="isShowResult"
      :close-on-click-modal="false"
      class="plv-demo-modal-SF"
      :lang="lang"
      :modal-style="{
        width: '400px',
        'min-height': '230px',
        'background-color': '#211e1e'
      }"
      @close="isShowResult = false"
    >
      <lottery-end
        ref="lotteryEnd"
        :lottery-sdk="lotterySdk"
        :lottery-list="lotteryList"
        :lang="lang"
        @to-show="setLotteryResultShow"
        @to-hide="setLotteryResultHide"
        @status-changed="changeStatue"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import OnLottery from '../../entry/lottery/on-lottery/SFPcOnLottery';
import LotteryEnd from '../../entry/lottery/lottery-end/SFPcLotteryEnd';
import Modal from '../demo-modal/PcModal';

export default {
  components: {
    OnLottery,
    Modal,
    LotteryEnd,
  },

  mixins: [mixin],
  data() {
    return {
      modelTile: '中奖结果'
    };
  },
  methods: {
    changeStatue(val) {
      const AllStatus = {
        isShowLotteryEnd: 'isShowLotteryEnd',
        isShowWinnerList: 'isShowWinnerList',
        isShowSubmitInfo: 'isShowSubmitInfo',
      };
      if (val === AllStatus.isShowWinnerList) {
        this.modelTile = '中奖名单';
      } else {
        this.modelTile = '中奖结果';
      }
    }
  }
};
</script>

<style lang="scss">
.plv-demo-modal-SF {
  .plv-demo-modal-default__content {
    opacity: 0.98;
  }
  .plv-demo-modal-default__header {
    background-image: linear-gradient(270deg, #423636 3%, #4D4237 93%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    h2 {
      color: #c8c6c6;
    }
  }
  .plv-iar-module-container-default__body--border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .plv-demo-modal-default__body {
    background-image: linear-gradient(90deg, #44352B 6%, #231D1E 98%);
  }
  .plv-iar-module-container-default__body::-webkit-scrollbar-thumb {
    background-color: #7B7070;
    border-radius: 5px;
  }
  .plv-iar-module-container-default__body::-webkit-scrollbar-track {
    background-color: #211e1e;
    border-left: 1px solid #211e1e;
  }
}
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
