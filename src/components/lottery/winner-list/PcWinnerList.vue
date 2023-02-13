<!-- @file 中奖名单组件 -->

<template>
  <div class="plv-lottery-list-default">
    <module-container
      ref="container"
      class="plv-lottery-list-default__container"
      :max-body-height="265"
      @scroll="onScroll"
    >
      <div class="plv-lottery-list-default__main">
        <h3>{{ iarTrans('lottery.winnerList') }}</h3>
        <ul
          class="plv-lottery-list-default__main__list"
        >
          <li v-for="(group, index) in winnerGroups" :key="index">
            <span v-for="(user, userIndex) in group" :key="userIndex">
              {{ user.viewerName }}
            </span>
          </li>
        </ul>
      </div>
      <template #footer>
        <div class="plv-lottery-list-default__footer">
          <iar-button
            @click="onClickBack"
          >
            {{ iarTrans('lottery.back') }}
          </iar-button>
        </div>
      </template>
    </module-container>
  </div>
</template>

<script>
import mixin from './mixin';
import IarButton from '../../../components/common/button/PcButton';
import ModuleContainer from '../../common/module-container/PcModuleContainer';

export default {
  components: {
    IarButton,
    ModuleContainer,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-lottery-list-default {
  padding: 1px 0 0;
}

.plv-lottery-list-default__footer {
  padding: 24px 0 32px;
  text-align: center;
}

.plv-lottery-list-default__container {
  height: 100%;
}
.plv-lottery-list-default__main {
  padding: 24px 16px 0;
  h3 {
    height: 48px;
    margin: 0;
    padding: 0;
    background-color: #EDF1F7;
    text-align: center;
    color: #333333;
    font-size: 14px;
    font-weight: normal;
    line-height: 48px;
    border-bottom: 1px solid #ECEFF1;
  }
}
.plv-lottery-list-default__main__list {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    background: #ffffff;
    height: 48px;
    line-height: 48px;
    span {
      width: 33.3%;
      display: inline-block;
      text-align: center;
      color: #546e7a;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  li:nth-child(2n) {
    background: #F8F8FB;
  }
}
</style>
