<template>
  <modal class="plv-iar-welfare-lottery__modal--gift-box">
    <div class="plv-iar-welfare-lottery__modal__head">
      <slot name="header"></slot>
      <span class="plv-iar-welfare-lottery__modal__close" @click="$emit('close')"></span>
    </div>
    <div v-if="isAppleMod && modalBgImg" class="plv-iar-welfare-lottery__modal--gift-box--bg"><img :src="modalBgImg" alt="" /></div>
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
    modalBgImg: {
      type: String,
      default: ''
    },
    isAppleMod: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: null
    };
  }
};
</script>
<style lang="scss">
@import './base.scss';
@import '../../../assets/styles/basic.scss';
.plv-iar-welfare-lottery__modal--gift-box {
  .plv-iar-modal__main {
    background-image: url(./bg-pc.png);
    @include scrollbar();
  }
}
.plv-iar-welfare-lottery__modal--gift-box--bg {
  min-height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
