<!-- @file 中奖名单组件 -->

<template>
  <div class="plv-lottery-list-FC">
    <div class="plv-lottery-list-FC__main">
      <ul
        class="plv-lottery-list-FC__main__list"
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
      <div class="plv-lottery-list-FC__footer">
        <iar-button :btn-style="{width: '90px', height: '32px', 'line-height': '32px', 'font-size':'14px', padding: 0, background: '#C6A67A'}" @click="onClickBack">
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
.plv-lottery-list-FC__main__list {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 192px;
  overflow: auto;
  li {
    height: 48px;
    line-height: 48px;
    span {
      width: 33.3%;
      padding: 0 14px;
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      color: rgb(255 255 255 / 80%);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }
  li:nth-child(2n) {
    background: rgb(255 255 255 / 0.05);
  }
}

.plv-lottery-list-FC__footer {
  text-align: center;
  padding: 24px;
}
</style>
