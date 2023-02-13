<!-- loading组件 -->
<template>
  <div class="plv-iar-welfare-lottery__loading"></div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.plv-iar-welfare-lottery__loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -16px;
    margin-top: -16px;
    width: 32px;
    height: 32px;
    background-image: url(./imgs/loading.png);
    background-size: cover;
    background-position: center;
    animation: spin 1s ease infinite;
  }
}
</style>
