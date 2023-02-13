<!-- 签到 pc 端 demo -->

<template>
  <div>
    <!-- 签到弹窗 -->
    <modal
      draggable
      body-locked
      title="签到"
      :no-bg="true"
      :visible="isShowCheckIn"
      @close="onSetCheckInVisible(false)"
    >
      <!-- 签到组件内容 -->
      <check-in
        mount-node=".plv-demo-main-default__panel"
        :check-in-sdk="checkInSdk"
        :lang="lang"
        :enable-sound-effects="true"
        @to-show="onSetCheckInVisible(true)"
        @to-hide="onSetCheckInVisible(false)"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import CheckIn from '../../entry/check-in/PcCheckIn';
import Modal from '../demo-modal/PcModal';

export default {
  components: {
    Modal,
    CheckIn,
  },

  mixins: [
    mixin,
  ],
};
</script>
