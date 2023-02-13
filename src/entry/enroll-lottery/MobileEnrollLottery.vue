<template>
  <div class="plv-ia-enroll-lottery__mobile">
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
    <EnrollLotteryList
      v-if="enrollStatus === 'result'"
      :enroll-lottery-sdk="enrollLotterySdk"
      :prize="lotteryData.name"
      :times="lotteryData.times"
      :end-time="lotteryData.endTime"
      :channel-id="lotteryData.channelId"
      :lottery-id="lotteryData.lotteryId"
    />
    <!-- 抽奖动画-->
    <modal
      v-show="isLotteryShowing"
      ref="onLotteryModal"
      :width="300"
      :height="300"
      :append-to-body="true"
      class="plv-iar-enroll-lottery__on-lottery-modal"
    >
      <OnLottery
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
import AddEnrollMessage from '../../components/enroll-lottery/add-enroll-message/MobileAddEnrollMessage';
import EnrollLotteryList from '../../components/enroll-lottery/enroll-lottery-list/MobileEnrollLotteryList';
import Modal from '../../components/common/modal/MobileModal.vue';
import OnLottery from '../lottery/on-lottery/MobileOnLottery.vue';

export default {
  name: 'PcEnrollLottery',

  components: {
    AddEnrollMessage,
    EnrollLotteryList,
    Modal,
    OnLottery
  },

  mixins: [mixin],

};
</script>

<style lang="scss">
.plv-ia-enroll-lottery__mobile {
  height: 100%;
  overflow: hidden;
}
.plv-ia-c-enroll-lottery__start--mobile {
  width: 400px;
  height: 256px;
  margin: 30px auto 0;
  display: block;
}
.plv-ia-c-enroll-lottery__start--mobile-box {
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
  }
}
</style>
