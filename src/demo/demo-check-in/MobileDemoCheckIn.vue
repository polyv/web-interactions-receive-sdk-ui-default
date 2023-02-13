<!-- 签到 pc 端 demo -->

<template>
  <div>
    <!-- 签到弹窗 -->
    <modal
      title="签到"
      :visible="isShowCheckIn"
      :model-style="modelStyle"
      @close="onSetCheckInVisible(false)"
    >
      <!-- 签到组件内容 -->
      <check-in
        :check-in-sdk="checkInSdk"
        :lang="lang"
        :enable-sound-effects="true"
        :tips-class="tipsClass"
        @to-show="onSetCheckInVisible(true)"
        @to-hide="onSetCheckInVisible(false)"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import CheckIn from '../../entry/check-in/MobileCheckIn';
import Modal from '../demo-modal/MobileModal';

// 测试 tipsClass
const testTipsClass = false;

export default {
  components: {
    Modal,
    CheckIn,
  },

  mixins: [
    mixin,
  ],

  data() {
    return {
      tipsClass: testTipsClass ? 'rotate-90-deg' : '',
    };
  },

  computed: {
    modelStyle() {
      return {
        position: 'absolute',
        height: '392px',
        bottom: 0
      };
    }
  },
};
</script>

<style lang="scss">
.rotate-90-deg {
  transform: rotate(90deg);
  transform-origin: center center;
  width: 100vh;
  height: 100vw;
  top: 50%;
  left: 50%;
  margin-top: -50vw;
  margin-left: -50vh;
  position: fixed;
}
</style>
