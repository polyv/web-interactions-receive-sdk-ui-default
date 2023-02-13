<template>
  <div class="plv-iar-product pws-aside-bg-color pws-iar-product-list-wrap">
    <div
      ref="productContent"
      class="plv-iar-product__content pws-iar-product-list-content"
      @scroll="handleScroll"
    >
      <template v-if="products.length">
        <!-- 总数 -->
        <product-total v-if="totalVisible" :total="total" />
        <!-- 列表 -->
        <div v-for="(good, index) in products" :key="index">
          <product-item
            ref="productItem"
            :number="total - index"
            :good="good"
            @jobDetail="$emit('jobDetail', $event)"
          />
        </div>
      </template>
      <template v-else>
        <product-empty />
      </template>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import ProductEmpty from '../../components/product/list/ProductEmpty.vue';
import ProductTotal from '../../components/product/list/ProductTotal.vue';
import ProductItem from '../../components/product/list/ProductItem.vue';

export default {
  components: {
    ProductEmpty,
    ProductTotal,
    ProductItem,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-product {
  width: 100%;
  height: 100%;
  position: relative;
  background: #202127;
}

.plv-iar-product__content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
}
</style>
