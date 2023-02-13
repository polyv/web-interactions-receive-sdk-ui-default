<!-- 中奖列表 -->
<template>
  <div ref="enrollLotteryResultList" class="plv-iar-enroll-lottery-list">
    <img src="../imgs/icon-winner.png" />
    <span class="">{{ iarTrans('enrollLottery.luckyWinners') }}</span>
    <p>{{ prize }}</p>
    <div v-if="isShowSearch" class="plv-iar-enroll-list__search">
      <i></i>
      <input v-model="search" type="text" :placeholder="iarTrans('enrollLottery.enterPhoneName')" />
    </div>
    <ul class="plv-iar-enroll-list__content">
      <li v-for="(item, index) in list" :key="index">
        <p>{{ item.name }}</p>
        <span>{{ replacePhone(item.mobile) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin]
};
</script>

<style lang="scss" scoped>
.plv-iar-enroll-lottery-list {
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow-y: auto;
  height: 100%;

  >img {
    width: 60px;
    height: 60px;
    display: block;
    margin: 24px auto 20px;
  }

  >span {
    font-size: 16px;
    color: #666;
  }

  >p {
    margin: 8px 24px 0;
    word-break: break-word;
    font-size: 20px;
    color: #333;
  }
}

.plv-iar-enroll-list__content {
  flex: 1;
  margin: 20px 0 34px;
  padding: 0 24px;
  text-align: left;

  >li {
    width: 33.33%;
    margin-bottom: 20px;
    text-align: left;
    display: inline-block;

    >p {
      font-size: 14px;
      line-height: 20px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: auto;
    }

    >span {
      font-size: 12px;
      color: #666;
    }
  }
}

.plv-iar-enroll-list__search {
  height: 36px;
  margin: 24px 24px 0;
  border-radius: 18px;
  background: #F6F6F6;
  display: flex;
  padding-left: 24px;
  align-items: center;

  >i {
    width: 16px;
    height: 16px;
    background: url(../imgs/icon-search-mobile.png);
    background-size: cover;
    flex-shrink: 0;
  }

  >input {
    height: 36px;
    margin-left: 8px;
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font-size: 14px;
  }
}
</style>
