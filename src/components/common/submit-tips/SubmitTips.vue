<template>
  <div :class="`plv-iar-submit-tips-default ${tipsClass}`">
    <div
      class="plv-iar-submit-tips-default__main"
      :class="{
        'plv-iar-submit-tips-default__main--mobile': isMobile
      }"
      :style="tipsStyle"
    >
      <div
        class="plv-iar-submit-tips-default__main__icon"
        :class="{
          'plv-iar-submit-tips-default__icon-success': submitStatus === 'success',
          'plv-iar-submit-tips-default__icon-failed': submitStatus === 'fail',
          'plv-iar-submit-tips-default__icon-time': submitStatus === 'time'
        }"
      ></div>
      <div v-if="tips" class="plv-iar-submit-tips-default__main__content">
        {{ tips }}
      </div>
      <div v-else class="plv-iar-submit-tips-default__main__content">
        {{ submitStatus === 'success' ? iarTrans('submit.submitSuccess') : iarTrans('submit.submitFailed') }}
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixins';

export default {
  name: 'SubmitTip',

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-submit-tips-default__main {
  z-index: 10001;
  position: absolute;
  padding: 0 16px;
  top: 50%;
  left: 50%;
  margin-top: -90px;
  margin-left: -100px;
  height: 180px;
  width: 200px;
  background: #fff;
  box-shadow: 0 0 2px 0 #ccc;
  border-radius: 8px;
  &--mobile {
    height: 142px;
    width: 180px;
    margin: 0;
    transform: translate(-50%, -50%);
    .plv-iar-submit-tips-default__main__icon {
      margin: 24px auto 20px;
    }
  }
  &__icon {
    width: 60px;
    height: 60px;
    margin: 42px auto 20px;
  }
  &__content {
    font-size: 14px;
    color: #333;
    text-align: center;
  }
}

.plv-iar-submit-tips-default__icon-success {
  background-image: url(./imgs/icon-submit-success.png);
  background-size: 100%;
  background-position: center;
}

.plv-iar-submit-tips-default__icon-failed {
  background-image: url(./imgs/icon-submit-fail.png);
  background-size: 100%;
  background-position: center;
}
.plv-iar-submit-tips-default__icon-time {
  background-image: url(./imgs/icon-time-fill.svg);
  background-size: 100%;
  background-position: center;
}
</style>
