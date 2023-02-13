<template>
  <div class="plv-iar-product pws-aside-bg-color pws-iar-product-list-wrap">
    <div
      ref="productContent"
      class="plv-iar-product__content pws-iar-product-list-content"
      @scroll="handleScroll"
    >
      <template v-if="products.length && !isShowLoading">
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
      <template v-else-if="!products.length && isFirstLoadDone && !isShowLoading">
        <product-empty />
      </template>
      <template v-else-if="isShowLoading">
        <div class="plv-iar-product__list-loading-wrap">
          <product-list-loading />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import ProductEmpty from '../../components/product/list/ProductEmpty.vue';
import ProductTotal from '../../components/product/list/ProductTotal.vue';
import ProductItem from '../../components/product/list/ProductItem.vue';
import ProductListLoading from '../../components/product/list/ProductListLoading.vue';

export default {
  components: {
    ProductEmpty,
    ProductTotal,
    ProductItem,
    ProductListLoading
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

.plv-iar-product {
  .plv-iar-product__item__cover {
    width: 90px;
    height: 90px;
  }

  .plv-iar-product__item__price {
    font-size: 18px;
  }
  .plv-iar-product__item__price--free {
    font-size: 16px;
  }
  .plv-iar-product__item__btn__content {
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
  }

  .plv-iar-product__item--job .plv-iar-product__item__btn__content {
    height: 24px;
    line-height: 24px;
  }

  .plv-iar-product__item--job .plv-iar-product__item__cover {
    height: 104px;
    width: 104px;
  }
}

.plv-iar-product__list-loading-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
