<!-- @file 中奖名单组件 -->

<template>
  <div class="plv-lottery-list-SF">
    <module-container
      ref="container"
      class="plv-lottery-list-SF__container"
      :max-body-height="195"
      @scroll="onScroll"
    >
      <div class="plv-lottery-list-SF__main">
        <ul
          class="plv-lottery-list-SF__main__list"
        >
          <li v-for="(group, index) in winnerGroups" :key="index">
            <span v-for="(user, userIndex) in group" :key="userIndex">
              {{ user.viewerName }}
            </span>
          </li>
        </ul>
      </div>
      <template #footer>
        <div class="plv-lottery-list-SF__footer">
          <button
            @click="onClickBack"
          >
            {{ iarTrans('lottery.back') }}
          </button>
        </div>
      </template>
    </module-container>
  </div>
</template>

<script>
import mixin from './mixin';
import ModuleContainer from '../../common/module-container/PcModuleContainer';

export default {
  components: {
    ModuleContainer,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-lottery-list-SF {
  padding: 1px 0 0;
}

.plv-lottery-list-SF__footer {
  padding: 16px;
  text-align: center;
  button {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    width: 90px;
    background: #C6A67A;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    border-radius: 25px;
  }
}

.plv-lottery-list-SF__container {
  height: 100%;
  .plv-iar-module-container-default__body {
    width: 398px;
  }
}
.plv-lottery-list-SF__main {
  padding: 0 16px;
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
.plv-lottery-list-SF__main__list {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    span {
      width: 33.3%;
      display: inline-block;
      text-align: center;
      color: rgb(255 255 255 / 80%);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  li:nth-child(2n) {
    background: rgb(255 255 255 / 0.05);
  }
}
</style>
