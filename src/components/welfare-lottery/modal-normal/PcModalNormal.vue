<template>
  <modal
    :width="width"
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
import Modal from '../../common/modal/PcModal.vue';

export default {
  components: {
    Modal,
  },
  props: {
    width: {
      type: Number,
      default: 560
    },
    height: {
      type: Number,
      default: 414
    }
  }
};
</script>

<style lang="scss">
@import './base.scss';
.plv-iar-welfare-lottery__modal--normal {
  .plv-iar-modal__main {
    padding-top: 46px;
  }
  .plv-iar-welfare-lottery__modal__head {
    height: 46px;
    line-height: 45px;
    border-bottom: 1px solid rgba(0, 0, 0, .04);
  }
}
</style>
