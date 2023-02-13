<template>
  <div class="plv-lottery-record-default">
    <ul class="plv-lottery-record-default__list">
      <li
        v-for="(item, index) in lotteryList"
        :key="index"
        class="plv-lottery-record-default__item"
      >
        <p class="plv-lottery-record-default__content pws-interactive-msg__content g-singleline">{{ item.prize }}</p>
        <input
          class="plv-lottery-record-default__btn pws-interactive-msg-btn"
          type="button"
          :value="item.received ? iarTrans('lottery.hasReceived') : iarTrans('lottery.receive')"
          :class="{
            'plv-lottery-record-default__btn--disabled': item.received,
          }"
          @click="onClickShowLottery(item)"
        />
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
// @import '../../../assets/styles/basic.scss';

.plv-lottery-record-default {
  padding: 16px 0;
  background-color: #2B2C35;
  box-sizing: border-box;
}
.plv-lottery-record-default__list {
  margin: 0;
  padding: 0;
  min-height: 148px;
  list-style: none;
  // @include scrollbar();
}
.plv-lottery-record-default__item {
  position: relative;
  padding-right: 94px;
  padding-left: 16px;
  box-sizing: border-box;
  &:not(:nth-child(1)) {
    margin-top: 16px;
  }
}
.plv-lottery-record-default__content {
  font-size: 14px;
  color: #E4E4E4;
  line-height: 32px;
}
.plv-lottery-record-default__btn {
  position: absolute;
  right: 16px;
  top: 0;
  width: 62px;
  height: 32px;
  background-color: #366BEE;
  border-radius: 16px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  border: none;
  &:disabled, &--disabled {
    color: #ADADC0;
    background: #3E3E4E;
  }
}
</style>
