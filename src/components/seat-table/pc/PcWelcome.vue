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
  height: 24px;
  width: 400px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 3;
  background: url(./imgs/welcome-bg.svg) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 52px;
}

.plv-iar-seat-table__welcome__msg {
  font-size: 14px;
  color: #fff;
}

.plv-iar-seat-table__welcome__star {
  display: inline-block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}
.plv-iar-seat-table__welcome__star--left {
  background: url(./imgs/star-left.svg) no-repeat center;
  background-size: contain;
}
.plv-iar-seat-table__welcome__star--right {
  background: url(./imgs/star-right.svg) no-repeat center;
  background-size: contain;
}
</style>
