<template>
  <div class="plv-iar-product__empty">
    <div class="plv-iar-product__empty__img pws-iar-product-list-empty-img"></div>
    <div class="plv-iar-product__empty__text pws-body-font-color3">{{ tipText }}</div>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';

export default {
  mixins: [basicMixin],

  inject: ['productVm'],

  computed: {
    tipText() {
      if (this.enabledToBool(this.productVm.recruitmentEnabled)) {
        return this.iarTrans('product.noRecruitment');
      }

      return this.iarTrans('product.noProduct');
    }
  },
};
</script>

<style lang="scss">
.plv-iar-product__empty {
  width: 100%;
  line-height: 18px;
  text-align: center;
  color: rgba(255, 255, 255, .3);
  font-size: 14px;
  position: absolute;
  top: 26%;
  padding: 0 10px;
  box-sizing: border-box;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.plv-iar-product__empty__img {
  width: 88px;
  height: 88px;
  margin-bottom: 8px;
  background-image: url(./imgs/empty.png);
  background-size: 100% 100%;
  opacity: 0.3;
}
</style>
