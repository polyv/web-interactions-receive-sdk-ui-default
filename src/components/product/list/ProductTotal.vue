<template>
  <div class="plv-iar-product__total pws-aside-bg-color pws-body-font-color2">
    <i v-if="!enabledToBool(productVm.recruitmentEnabled)" class="plv-iar-product__total__icon pws-iar-product-list-icon"></i>
    <i v-else class="plv-iar-product__total__icon--recruitment pws-iar-product-list-icon-recruitment"></i>
    {{ iarTrans('product.total') }}<span>{{ total }}</span>{{ suffixText }}
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';

export default {
  mixins: [basicMixin],

  inject: ['productVm'],

  props: {
    total: {
      type: Number,
      default: 0,
    }
  },

  computed: {
    suffixText() {
      if (this.enabledToBool(this.productVm.recruitmentEnabled)) {
        return this.iarTrans('product.totalTextRecruitment');
      }

      return this.iarTrans('product.totalText');
    },
  },
};
</script>

<style lang="scss">
.plv-iar-product__total {
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 16px 16px 14px;
  position: sticky;
  top: 0;
  left: 0;
  background: #202127;
  z-index: 30;

  span {
    color: #F15D5D;
    margin-left: 3px;
    margin-right: 3px;
  }
}
.plv-iar-product__total__icon {
  width: 12px;
  height: 12px;
  margin-right: 6px;
  background-image: url(./imgs/icon-product.png);
  background-size: 100% 100%;
}
.plv-iar-product__total__icon--recruitment {
  width: 12px;
  height: 12px;
  margin-right: 6px;
  background-image: url(./imgs/icon-recruitment.png);
  background-size: 100% 100%;
}
</style>
