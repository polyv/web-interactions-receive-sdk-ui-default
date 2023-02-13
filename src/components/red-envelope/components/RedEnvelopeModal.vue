<!-- 红包弹窗 -->
<template>
  <div class="plv-iar-red-envelope">
    <div class="plv-iar-red-envelope__popup">
      <slot></slot>
      <mobile-red-envelope-close @close="$emit('close')" />
    </div>
  </div>
</template>

<script>
import MobileRedEnvelopeClose from './RedEnvelopeClose';

export default {
  components: {
    MobileRedEnvelopeClose,
  },
};
</script>

<style lang="scss">
.plv-iar-red-envelope {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, .65);
  background-image: linear-gradient(180deg, rgba(255, 88, 74, .33) 0%, rgba(0, 0, 0, 0) 54%, rgba(160, 25, 20, .3) 100%);
}
.plv-iar-red-envelope__popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
