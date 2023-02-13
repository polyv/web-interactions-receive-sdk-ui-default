<template>
  <modal
    :height="height"
    class="plv-iar-welfare-lottery__modal--normal"
  >
    <div class="plv-iar-welfare-lottery__modal__head">
      <slot name="header"></slot>
      <span class="plv-iar-welfare-lottery__modal__close" @click="$emit('close')"></span>
    </div>
    <div class="plv-iar-welfare-lottery__modal__body">
      <slot name="body"></slot>
    </div>
  </modal>
</template>

<script>
import Modal from '../../common/modal/MobileModal.vue';

export default {
  components: {
    Modal,
  },
  props: {
    height: {
      type: Number,
      default: 410
    }
  }
};
</script>

<style lang="scss">
@import './base.scss';
.plv-iar-welfare-lottery__modal--normal {
  .plv-iar-modal__main {
    padding-top: 48px;
    border-radius: 8px 8px 0 0;
  }
  .plv-iar-welfare-lottery__modal__head {
    height: 48px;
    line-height: 48px;
  }
  .plv-iar-welfare-lottery__modal__body {
    height: 100%;
  }
}
</style>
