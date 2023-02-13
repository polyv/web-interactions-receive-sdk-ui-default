<!-- 红包弹窗关闭按钮 -->
<template>
  <div class="plv-iar-red-envelope__popup__close" @click="$emit('close')"></div>
</template>

<style lang="scss">
.plv-iar-red-envelope__popup__close {
  width: 32px;
  height: 66px;
  margin: 0 auto;
  background-image: url(../imgs/btn-close.png);
  background-size: cover;
}
</style>
