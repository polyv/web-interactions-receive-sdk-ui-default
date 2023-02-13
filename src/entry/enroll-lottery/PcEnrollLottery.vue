<template>
  <div class="plv-ia-enroll-lottery__pc">
    <AddEnrollMessage
      v-if="enrollStatus === 'addMsg'"
      :enroll-lottery-sdk="enrollLotterySdk"
      :prize="lotteryData.name"
      :end-time="lotteryData.endTime"
      :channel-id="lotteryData.channelId"
      :lottery-id="lotteryData.lotteryId"
      :is-mobile="isMobile"
      @close-modal="closeModal"
    />
    <!--      &lt;!&ndash; 礼品盒动图(无限极使用) &ndash;&gt;-->
    <!--      <template v-if="isInfinitus">-->
    <!--        <svga-player-->
    <!--          :src="lotteryBoxSvga"-->
    <!--          class="plv-ia-c-enroll-lottery__start&#45;&#45;pc-box"-->
    <!--          clears-after-stop-->
    <!--        />-->
    <!--      </template>-->
    <!--      <template v-else>-->
    <!--        <svga-player-->
    <!--          :src="lotteryGiftSvga"-->
    <!--          class="plv-ia-c-enroll-lottery__start&#45;&#45;pc-box"-->
    <!--          clears-after-stop-->
    <!--        />-->
    <EnrollLotteryList
      v-if="enrollStatus === 'result'"
      :enroll-lottery-sdk="enrollLotterySdk"
      :prize="lotteryData.name"
      :times="lotteryData.times"
      :end-time="lotteryData.endTime"
      :lottery-id="lotteryData.lotteryId"
    />
    <!-- 抽奖动画-->
    <modal
      v-show="isLotteryShowing"
      ref="onLotteryModal"
      :height="300"
      :append-to-body="true"
      class="plv-iar-enroll-lottery__on-lottery-modal"
    >
      <PcOnLottery
        ref="onLottery"
        :pattern="isInfinitus ? 'box' : 'default'"
        :delay-time="0"
        :lang="lang"
        @is-show-changed="onLotteryShowChange"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import AddEnrollMessage from '../../components/enroll-lottery/add-enroll-message/PcAddEnrollMessage';
import EnrollLotteryList from '../../components/enroll-lottery/enroll-lottery-list/PcEnrollLotteryList';
import Modal from '../../components/common/modal/PcModal.vue';
import PcOnLottery from '../lottery/on-lottery/PcOnLottery';
export default {
  name: 'PcEnrollLottery',

  components: {
    AddEnrollMessage,
    Modal,
    EnrollLotteryList,
    PcOnLottery
  },

  mixins: [mixin],

  computed: {
    title() {
      const { enrollStatus } = this;
      return {
        addMsg: this.iarTrans('enroll.lottery.lucky.draw'),
        start: this.iarTrans('enroll.lottery.ongoing'),
        result: this.iarTrans('enroll.lottery.winner.list')
      }[enrollStatus] || '';
    }
  },
};
</script>

<style lang="scss">
.plv-ia-c-enroll-lottery__start--pc {
  width: 400px;
  height: 256px;
  margin: 30px auto 0;
  display: block;
}
.plv-ia-c-enroll-lottery__start--pc-box {
  width: 300px;
  height: 300px;
  margin: 30px auto 0;
}
.plv-iar-enroll-lottery__on-lottery-modal {
  z-index: 99;
  .plv-iar-modal__main {
    top: 50%;
    left: 50%;
    bottom: initial;
    transform: translate(-50%, -50%);
    background-color: (0, 0, 0, 0);
  }
}
</style>
