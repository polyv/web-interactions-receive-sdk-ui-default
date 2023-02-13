<template>
  <div
    class="plv-iar-product__buy-button"
    :class="{
      'plv-iar-product__buy-button--disabled': isButtonDisabled,
    }"
    @click="handleClickBuy"
  >
    <div class="plv-iar-product__buy-button__render">
      <slot
        :button-text="buttonText"
        :disabled="isButtonDisabled"
      ></slot>
    </div>
    <template v-if="!isButtonDisabled">
      <!-- 微信原生按钮 -->
      <div
        v-if="isWeixinButton"
        ref="wxbtn"
        key="weixin-btn"
        class="plv-iar-product__buy-button__inner"
      ></div>
      <!-- 跳转按钮 -->
      <div
        v-else
        key="link-btn"
        class="plv-iar-product__buy-button__inner"
        @click="clickBtn"
      ></div>
    </template>
    <template v-else-if="showDisabled">
      <!-- 禁用按钮 -->
      <div
        class="plv-iar-product__buy-button__inner plv-iar-product__buy-button__inner--disabled"
      ></div>
    </template>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-product__buy-button {
  position: relative;
}
.plv-iar-product__buy-button__render {
  z-index: 10;
}
.plv-iar-product__buy-button__inner {
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
}

.plv-iar-product__buy-button__inner.plv-iar-product__buy-button__inner--disabled {
  cursor: not-allowed;
}
</style>
