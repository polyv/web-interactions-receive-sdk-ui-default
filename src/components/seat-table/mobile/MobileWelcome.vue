<template>
  <div class="plv-iar-seat-table__welcome">
    <div class="plv-iar-seat-table__welcome__star plv-iar-seat-table__welcome__star--left"></div>
    <div class="plv-iar-seat-table__welcome__msg">{{ iarTrans('seatTable.welcome') }} {{ nickName }} {{ iarTrans('seatTable.welcomeSuffix') }}</div>
    <div class="plv-iar-seat-table__welcome__star plv-iar-seat-table__welcome__star--right"></div>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';

export default {
  mixins: [basicMixin],

  props: {
    nickName: {
      type: String,
      default: '',
    }
  }
};
</script>

<style lang="scss">
.plv-iar-seat-table__welcome {
  height: 32px;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  background: url(./imgs/welcome-bg.png) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 26px;
}

.plv-iar-seat-table__welcome__msg {
  font-size: 14px;
  color: #fff;
}

.plv-iar-seat-table__welcome__star {
  display: inline-block;
  flex-shrink: 0;
  width: 16px;
  height: 32px;
}
.plv-iar-seat-table__welcome__star--left {
  background: url(./imgs/icon-start-left.png) no-repeat center;
  background-size: contain;
}
.plv-iar-seat-table__welcome__star--right {
  background: url(./imgs/icon-start-right.png) no-repeat center;
  background-size: contain;
}
</style>
