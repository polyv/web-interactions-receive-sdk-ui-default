<template>
  <div class="plv-demo-product">
    <mobile-product v-if="productSdk" :product-sdk="productSdk" @jobDetail="handleShowJobDetail" />

    <product-bubble v-if="productSdk" :product-sdk="productSdk" @jobDetail="handleShowJobDetail" />

    <modal
      draggable
      body-locked
      title="岗位详情"
      :visible="visible"
      :close-on-click-modal="false"
      no-bg
      @close="hideJobDetail"
    >
      <product-job
        v-if="productSdk"
        :product-sdk="productSdk"
        :job-detail="jobDetail"
        :use-mobile-class="true"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import MobileProduct from '../../entry/product/MobileProduct.vue';
import ProductBubble from '../../entry/product-bubble/ProductBubble.vue';
import Modal from '../demo-modal/MobileModal.vue';
import productJob from '@/entry/product-job/productJob.vue';

export default {
  components: {
    MobileProduct,
    ProductBubble,
    Modal,
    productJob
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-demo-product {
  height: 600px;
  margin-bottom: 200px;
}
</style>
