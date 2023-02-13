<template>
  <modal>
    <div class="plv-iar-confirm">
      <div class="plv-iar-confirm-content">
        {{ msg }}
      </div>
      <div class="plv-iar-confirm__footer">
        <div class="plv-iar-confirm__footer-btn plv-iar-confirm__footer-btn--cancel" @click="$emit('cancel')">{{ cancelText }}</div>
        <div class="plv-iar-confirm__footer-btn" @click="$emit('confirm')">{{ confirmText }}</div>
      </div>
    </div>
  </modal>
</template>

<script>
import modal from '@/components/redpack-rain/pc-comp/modal';
import mixin from './mixin';
export default {
  name: 'MobileConfirm',
  components: {
    modal
  },
  mixins: [mixin]
};
</script>

<style lang="scss">
.plv-iar-confirm {
  height: auto;
}
</style>
