<template>
  <red-envelope-not-wechat
    v-if="curRedEnvelopeData"
    :watch-origin="watchOrigin"
    :room-id="roomId"
    :red-envelope-data="curRedEnvelopeData"
    :redirect-url="redirectUrl"
    @close="handleClose"
  />
</template>

<script>
import RedEnvelopeNotWechat from '../../components/red-envelope/RedEnvelopeNotWechat';
import mixin from './mixin';

export default {
  components: {
    RedEnvelopeNotWechat,
  },
  mixins: [mixin],
};
</script>
