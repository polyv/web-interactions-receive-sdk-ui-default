<template>
  <div class="plv-lottery-record-default">
    <ul class="plv-lottery-record-default__list">
      <li
        v-for="(item, index) in lotteryList"
        :key="index"
        class="plv-lottery-record-default__item"
      >
        <p class="plv-lottery-record-default__content g-singleline">{{ item.prize }}</p>
        <div
          class="plv-lottery-record-default__btn pws-btn-bg-color"
          :class="{
            'plv-lottery-record-default__btn--disabled': item.received,
          }"
          @click="onClickShowLottery(item)"
        >
          {{ item.received ? iarTrans('lottery.hasReceived') : iarTrans('lottery.receive') }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-lottery-record-default {
  height: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  overflow: auto;
}

.plv-lottery-record-default__list {
  height: 286px;
  overflow: auto;
  list-style: none;
  margin: 0;
  padding: 0;
}

.plv-lottery-record-default__item {
  margin: 0;
  line-height: 60px;
  height: 60px;
  border-bottom: 1px solid transparent;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
    font-size: 16px;
    flex: 1;
  }
  input {
    font-size: 14px;
  }
}

.plv-lottery-record-default__btn {
  width: 64px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  background-color: #3082FE;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  outline: none;
  text-align: center;
  &--disabled {
    opacity: 0.5;
  }
}
</style>
