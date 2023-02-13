<!-- 领取奖品公共组件 -->
<template>
  <scan-qr-code
    v-if="receiveData.acceptType === 'qrCode'"
    :qr-code="receiveData.qrCode"
    :qr-code-tips="receiveData.qrCodeTips"
  />
  <submit-info
    v-else
    :collect-info="formList"
    :received="receiveData.hasObtain"
    @submit="handleSubmit"
  />
</template>

<script>
import { isMobile } from '@polyv/utils/src/browser';
import ScanQrCode from './scan-qr-code.vue';

export default {
  components: {
    ScanQrCode,
    SubmitInfo: isMobile() ? () => import('../submit-info/MobileSubmitInfo.vue') : () => import('../submit-info/PcSubmitInfo.vue'),
  },
  props: {
    receiveData: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    formList() {
      return this.receiveData.formList || [];
    },
  },
  methods: {
    handleSubmit(data) {
      this.$emit('submit', data);
    },
  },
};
</script>
