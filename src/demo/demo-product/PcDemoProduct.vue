<template>
  <div class="plv-demo-product">
    <div class="plv-demo-product__list">
      <pc-product
        v-if="productSdk"
        :product-sdk="productSdk"
        desc-label="职位详情"
        :recruitment-enabled="'N'"
        @click-good-desc="handleClickGoodDesc"
        @jobDetail="handleShowJobDetail"
      />
    </div>

    <product-button
      v-if="productSdk"
      :product-sdk="productSdk"
      :good="good"
    >
      <template #default="{ buttonText, disabled }">
        <div
          :class="{
            'is-disabled': disabled
          }"
        >
          {{ buttonText }}
        </div>
      </template>
    </product-button>

    <div class="plv-demo-product__bubble">
      <product-bubble v-if="productSdk" :product-sdk="productSdk" @job-detail="handleShowJobDetail" />

      <div class="plv-demo-product__bubble__scale">
        <product-bubble
          v-if="productSdk"
          :product-sdk="productSdk"
          animation-type="scale"
          @job-detail="handleShowJobDetail"
        />
      </div>
    </div>

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
        :job-detail="jobDetail"
        :product-sdk="productSdk"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import PcProduct from '../../entry/product/PcProduct.vue';
import ProductBubble from '../../entry/product-bubble/ProductBubble.vue';
import ProductButton from '../../entry/product-button/ProductButton.vue';
import Modal from '../demo-modal/PcModal';
import productJob from '@/entry/product-job/productJob.vue';

export default {
  components: {
    PcProduct,
    ProductBubble,
    ProductButton,
    Modal,
    productJob
  },

  mixins: [mixin],

  data() {
    return {
      good: {
        linkType: 10,
        // link: 'http://www.baidu.com',
      }
    };
  },

  methods: {
    handleClickProduct(good) {
      console.info(good);
    },

    productDisabled(good) {
      console.info(good);
      return true;
    },

    handleClickGoodDesc(good) {
      console.info(good);
    }
  }
};
</script>

<style lang="scss">
.plv-demo-product__list {
  width: 400px;
  height: 670px;
}
.plv-demo-product__bubble {
  height: 120px;
  padding-top: 10px;
  margin-top: 20px;
  background: #202127;
  position: relative;
}
.plv-demo-product__bubble__scale {
  position: absolute;
  top: 0;
  right: 200px;
  width: 12px;
  height: 12px;
  background: red;
}
</style>
