<template>
  <div class="plv-iar-submit-tips-portrait">
    <div
      class="plv-iar-submit-tips-portrait__main"
      :style="hintStyle"
    >
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
.plv-iar-submit-tips-portrait {
  z-index: 10001;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
  &__main {
    width: 320px;
    height: 320px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    background-size: contain;
    background-position: center;
  }
}
</style>
