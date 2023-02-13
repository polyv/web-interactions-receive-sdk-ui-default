<template>
  <div class="plv-iar-confirm">
    <div class="plv-iar-confirm-header">
      {{ title }}

      <img class="plv-iar-icon-close" src="./imgs/icon-close.png"  alt=""/>
    </div>
    <div class="plv-iar-confirm-content">
      {{ msg }}
    </div>
    <div class="plv-iar-confirm__footer">
      <div class="plv-iar-confirm__footer-btn plv-iar-confirm__footer-btn--cancel" @click="$emit('cancel')">{{ cancelText }}</div>
      <div class="plv-iar-confirm__footer-btn" @click="$emit('confirm')">{{ confirmText }}</div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
export default {
  name: 'PcConfirm',
  mixins: [mixin]
};
</script>
<style lang="scss">
.plv-iar-confirm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  min-width: 150px;
  .plv-iar-confirm-header {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #eceff1;
    color: #333;
    font-size: 14px;
    position: relative;
    .plv-iar-icon-close {
      width: 24px;
      height: 24px;
    }
  }
  .plv-iar-confirm__footer {
    display: flex;
    .plv-iar-confirm__footer-btn {
      min-width: 60px;
      text-align: center;
    }
  }
}
</style>
