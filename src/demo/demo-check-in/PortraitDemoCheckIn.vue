<!-- 签到 竖屏页  demo -->

<template>
  <div>
    <!-- 签到组件内容 -->
    <check-in
      v-show="isShowCheckIn"
      :check-in-sdk="checkInSdk"
      @to-show="onSetCheckInVisible(true)"
      @to-hide="onSetCheckInVisible(false)"
    />
  </div>
</template>

<script>
import mixin from './mixin';
import CheckIn from '../../entry/check-in/PortraitCheckIn';

export default {
  components: {
    CheckIn,
  },

  mixins: [
    mixin,
  ]
};
</script>
