<template>
  <div class="plv-demo-lottery-default">
    <div class="plv-demo-lottery-default__lottery">
      <!-- 抽奖中 -->
      <on-lottery
        v-show="isLotteryShowing"
        :lottery-sdk="lotterySdk"
        :member-list="memberList"
        :locale="lang"
        @lottery-status-changed="onLotteryStatusChange"
        @is-show-changed="onLotteryShowChange"
      />
    </div>

    <!-- 抽奖结果 -->
    <modal
      :visible="isShowResult"
      title="中奖结果"
      :modal-style="{
        height: 'auto',
        position: 'absolute',
        bottom: '0',
        'background-image': 'linear-gradient(90deg, #44352B 6%, #231D1E 98%)'
      }"
      @close="isShowResult = false"
      @back="onClickBack"
    >
      <lottery-end
        ref="lotteryEnd"
        :lottery-sdk="lotterySdk"
        :lottery-list="lotteryList"
        :delay-time="2000"
        :lang="lang"
        @to-show="setLotteryResultShow"
        @to-hide="setLotteryResultHide"
        @status-changed="onStatusChanged"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import OnLottery from '../../entry/lottery/on-lottery/SFMobileOnLottery';
import LotteryEnd from '../../entry/lottery/lottery-end/SFMobileLotteryEnd';
import Modal from '../demo-modal/MobileModal';

export default {
  components: {
    OnLottery,
    Modal,
    LotteryEnd,
  },

  mixins: [mixin],

  data() {
    return {
      // 抽奖结果内部状态
      lotteryEndStatus: '',
    };
  },

  computed: {
    lotteryEndtitle() {
      const titles = {
        isShowLotteryEnd: '中奖结果',
        isShowWinnerList: '中奖名单',
        isShowSubmitInfo: '填写联系信息',
      };
      return titles[this.lotteryEndStatus] || titles.isShowLotteryEnd;
    },

    showBackBtn() {
      if (!this.lotteryEndStatus) {
        return false;
      }
      return this.lotteryEndStatus !== 'isShowLotteryEnd';
    },
  },

  methods: {
    onClickBack() {
      this.$refs.lotteryEnd && this.$refs.lotteryEnd.toBack();
    },

    onStatusChanged(lotteryEndStatus) {
      this.lotteryEndStatus = lotteryEndStatus;
    },

    toShowRecord() {
      this.isShowRecord = true;
    },

    toHideRecord() {
      this.isShowRecord = false;
    },
  },
};
</script>

<style lang="scss">
.plv-demo-lottery-default {
  .plv-iar-popup-default-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    h2 {
      color: #c8c6c6;
    }
  }
}
.plv-demo-lottery-default-widget {
  position: fixed;
  right: 15px;
  bottom: 174px;
}
.plv-demo-lottery-default__lottery {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
