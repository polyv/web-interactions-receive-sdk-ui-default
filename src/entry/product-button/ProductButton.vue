<template>
  <buy-button
    :good="good"
    v-on="$listeners"
  >
    <template #default="slotData">
      <slot v-bind="slotData"></slot>
    </template>
  </buy-button>
</template>

<script>
import BuyButton from '../../components/product/BuyButton/BuyButton.vue';
import productBaseMixin from '../../components/product/base-mixin';

export default {
  components: {
    BuyButton,
  },

  mixins: [productBaseMixin],

  props: {
    good: {
      type: Object,
      default: () => null
    },
  },
};
</script>
