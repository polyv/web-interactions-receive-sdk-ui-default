<!-- @file 中奖名单组件 -->

<template>
  <div class="plv-lottery-list-default">
    <div class="plv-lottery-list-default__main">
      <ul
        class="plv-lottery-list-default__main__list"
        @scroll="onScroll"
      >
        <li v-for="(group, index) in winnerGroups" :key="index">
          <span v-for="(user, userIndex) in group" :key="userIndex">
            {{ user.viewerName }}
          </span>
        </li>
      </ul>
    </div>
    <div>
      <div class="plv-lottery-list-default__footer">
        <iar-button @click="onClickBack">
          {{ iarTrans('lottery.back') }}
        </iar-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import IarButton from '../../../components/common/button/MobileButton';

export default {
  components: {
    IarButton,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-lottery-list-default__main__list {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 192px;
  overflow: auto;
  li {
    background: #ffffff;
    height: 48px;
    line-height: 48px;
    span {
      width: 33.3%;
      padding: 0 14px;
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      color: #546e7a;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }
  li:nth-child(2n) {
    background: #F8F8FB;
  }
}

.plv-lottery-list-default__footer {
  text-align: center;
  padding: 24px;
}
</style>
