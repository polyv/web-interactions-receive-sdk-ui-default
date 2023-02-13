<!-- 领奖移动端组件 -->
<template>
  <modal-normal
    class="plv-iar-welfare-lottery__receive-modal"
    :class="`plv-iar-welfare-lottery__receive-modal--${receiveData.acceptType}`"
    @close="handleClose"
  >
    <template #header>
      <header-prizes :title="title" @back="handleBack" />
    </template>
    <template #body>
      <scan-qr-code
        v-if="receiveData.acceptType === 'qrCode'"
        :qr-code="receiveData.qrCode"
        :qr-code-tips="receiveData.qrCodeTips"
      />
      <submit-info
        v-else
        :collect-info="receiveData.formList || []"
        :received="receiveData.hasObtain"
        @submit="handleSubmit"
      />
    </template>
  </modal-normal>
</template>

<script>
import ModalNormal from '../modal-normal/MobileModalNormal.vue';
import HeaderPrizes from './Header.vue';
import ScanQrCode from './scan-qr-code.vue';
import SubmitInfo from '../submit-info/MobileSubmitInfo.vue';
import mixin from './mixin';

export default {
  components: {
    ModalNormal,
    HeaderPrizes,
    ScanQrCode,
    SubmitInfo,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
@import '../base.scss';
.plv-iar-welfare-lottery__receive-modal {
  .plv-iar-welfare-lottery__modal__title--center {
    font-size: 18px;
  }
  .plv-iar-welfare-lottery__modal__body {
    height: 100%;
  }
  .plv-iar-welfare-lottery__modal__close {
    height: 48px;
  }
}
@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-welfare-lottery__receive-modal {
    .plv-iar-modal__main {
      @include full-screen-modal;
    }
  }
}
.plv-iar-welfare-lottery__receive-modal--qrCode {
  .plv-iar-welfare-lottery__modal__body {
    overflow: auto;
  }
}
</style>
