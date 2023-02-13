<template>
  <div class="plv-iar-seat-table__light">
    <div
      class="plv-iar-seat-table__light__content pws-seat-table-light"
      :style="{
        width: `${computeStyle(448)}px`,
        height: `${computeStyle(162)}px`,
        marginTop: `${computeStyle(28)}px`,
      }"
    ></div>
  </div>
</template>

<script>
import ResponsiveMixin from '../responsive-mixin';

export default {
  mixins: [ResponsiveMixin],
};
</script>

<style lang="scss">
.plv-iar-seat-table__light {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.plv-iar-seat-table__light__content {
  flex-shrink: 0;
  background-image: url(./imgs/light.png);
  background-size: 100% 100%;
}
</style>
