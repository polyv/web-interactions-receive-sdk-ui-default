<!-- 普通红包封面 -->
<template>
  <red-envelope-modal
    @close="$emit('close')"
  >
    <red-envelope-cover
      class="plv-iar-red-envelope__cover--normal"
      :sender="redEnvelopeData.user"
      :cover-text="redEnvelopeData.blessing || redEnvelopeData.content || redEnvelopeData.greeting"
      :cover-img="coverImg"
      @open="handleOpen"
    />
  </red-envelope-modal>
</template>

<script>
import RedEnvelopeModal from './components/RedEnvelopeModal';
import RedEnvelopeCover from './components/RedEnvelopeCover';
export default {
  components: {
    RedEnvelopeModal,
    RedEnvelopeCover,
  },
  props: {
    redEnvelopeData: {
      type: Object,
      default: null
    },
    coverImg: {
      type: [String, null],
      default: null
    },
  },
  methods: {
    handleOpen() {
      this.$emit('open');
    }
  },
};
</script>
<style lang="scss">
.plv-iar-red-envelope__cover--normal {
  .plv-iar-red-envelope__cover__text {
    margin-top: 12px;
  }
}
</style>
