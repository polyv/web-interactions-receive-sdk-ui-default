
<template>
  <div>
    <div class="c-demo-enroll-lottery-pendant">
      <EnrollLotteryPendant :enroll-lottery-sdk="EnrollLottery" @to-show-modal="updateModalVisible(true)" />
    </div>
    <modal
      draggable
      body-locked
      title="报名抽奖"
      :no-bg="true"
      :visible="visible"
      @close="updateModalVisible(false)"
    >
      <EnrollLottery
        :enroll-lottery-sdk="EnrollLottery"
        :lang="lang"
        :enable-sound-effects="true"
        @to-show="updateModalVisible(true)"
        @to-hide="updateModalVisible(false)"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import EnrollLottery from '../../entry/enroll-lottery/MobileEnrollLottery';
import EnrollLotteryPendant from '../../entry/enroll-lottery/EnrollLotteryPendant';
import Modal from '../demo-modal/MobileModal';

export default {
  components: {
    Modal,
    EnrollLottery,
    EnrollLotteryPendant
  },

  mixins: [
    mixin,
  ],
};
</script>

<style lang="scss">
.c-demo-enroll-lottery-pendant {
  display: inline-block;
}
</style>
