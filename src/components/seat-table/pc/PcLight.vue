<template>
  <div class="plv-iar-seat-table__light">
    <div class="plv-iar-seat-table__light__content pws-seat-table-light"></div>
  </div>
</template>

<style lang="scss">
.plv-iar-seat-table__light {
  width: 740px;
  height: 238px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.plv-iar-seat-table__light__content {
  width: 100%;
  height: 100%;
  margin-top: 28px;
  background-image: url(./imgs/light.png);
  background-size: 100% 100%;
}
</style>
