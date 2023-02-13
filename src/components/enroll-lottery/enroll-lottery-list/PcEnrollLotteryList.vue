<!-- 中奖列表 -->
<template>
  <div class="plv-iar-enroll-lottery-list">
    <img src="../imgs/icon-winner.png" />
    <p>
      {{ iarTrans("enrollLottery.luckyWinners") }}<span>{{ prize }}</span>
    </p>
    <div class="plv-iar-enroll-list__head">
      {{ iarTrans("enrollLottery.winnerList") }}
      <div v-if="isShowSearch" class="plv-iar-enroll-list__search">
        <input
          v-model="search"
          type="text"
          :placeholder="iarTrans('enrollLottery.enterPhoneName')"
        />
        <i></i>
      </div>
    </div>
    <ul ref="enrollLotteryResultList" class="plv-iar-enroll-list__content">
      <li
        v-for="(item, index) in list"
        :key="item.mobile"
        :class="[
          Math.ceil((index + 1) / 3) % 2 === 0
            ? 'plv-iar-enroll-list__content__li--grey'
            : '',
        ]"
      >
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

<style lang="scss">

.plv-iar-enroll-lottery-list {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  padding: 0 24px;

  > img {
    width: 60px;
    height: 60px;
    display: block;
    margin: 24px auto 15px;
  }

  > span {
    font-size: 16px;
    color: #666;
  }

  > p {
    font-size: 14px;
    color: #333;

    > span {
      color: #ff5722;
    }
  }
}

.plv-iar-enroll-list__content {
  height: 177px;
  margin-bottom: 34px;
  overflow-y: auto;
  text-align: left;

  > li {
    width: 33.33%;
    padding: 10px 0;
    display: inline-block;
    text-align: center;

    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 20px;
      color: #333;
      margin: auto;
    }

    > span {
      font-size: 12px;
      color: #666;
    }
  }
}

.plv-iar-enroll-list__content__li--grey {
  background: #f8f8f8;
}

.plv-iar-enroll-list__head {
  height: 48px;
  margin-top: 20px;
  line-height: 48px;
  background: #edf1f7;
  color: #333;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #cfd8dc;
}

.plv-iar-enroll-list__search {
  position: absolute;
  right: 16px;
  top: 8px;
  height: 32px;
  width: 144px;
  background: #fff;
  display: flex;
  align-items: center;

  > i {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background: url(../imgs/icon-search-mobile.png);
    background-size: cover;
    flex-shrink: 0;
    cursor: pointer;
  }

  > input {
    flex: 1;
    padding-left: 16px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: 14px;
  }
}
</style>
