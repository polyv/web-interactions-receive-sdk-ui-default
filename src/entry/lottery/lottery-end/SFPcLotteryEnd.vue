<!-- @file PC 端中奖结束组件 -->

<template>
  <div class="plv-lottery-end-SF">
    <div v-show="status === AllStatus.isShowLotteryEnd" class="plv-lottery-end-SF__result">
      <!-- 中奖 -->
      <template v-if="isWinner">
        <div class="plv-lottery-end-SF__winner">
          <img src="./imgs/SF-logo.png" />
          <p class="plv-lottery-end-SF__winner__tips">{{ iarTrans('lottery.congratulationsWinner') }}“ <span>{{ prize }}</span> ”</p>
          <p class="plv-lottery-end-SF__winner__msg">{{ iarTrans('lottery.SFCongratulationsWinner') }}</p>
          <div class="plv-lottery-end-SF__info-btn">
            <button class="pws-btn-bg-color" @click="onClickKnow">
              {{ iarTrans('lottery.gotIt') }}
            </button>
          </div>
          <div class="plv-lottery-end-SF__winner__winner-list">
            <button
              class="plv-lottery-end-SF__list-btn pws-font-theme-color"
              @click="onClickShowWinner"
            >
              {{ iarTrans('lottery.checkList') }}
            </button>
          </div>
        </div>
      </template>

      <!-- 未中奖 -->
      <template v-else>
        <div class="plv-lottery-end-SF__not-winner">
          <p class="plv-lottery-end-SF__not-winner__tips">{{ iarTrans('lottery.SFParticipation') }}</p>
          <div class="plv-lottery-end-SF__info-btn">
            <button class="pws-btn-bg-color" @click="onClickKnow">
              {{ iarTrans('lottery.gotIt') }}
            </button>
          </div>
          <div>
            <button
              class="plv-lottery-end-SF__list-btn pws-font-theme-color"
              @click="onClickShowWinner"
            >
              {{ iarTrans('lottery.checkList') }}
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- 中奖名单 -->
    <div v-if="status === AllStatus.isShowWinnerList">
      <winner-list :lottery-id="lotteryId" :lottery-sdk="lotterySdk" @back="onClickBack" />
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import WinnerList from '../../../components/lottery/winner-list/SFPcWinnerList';

export default {
  components: {
    WinnerList,
  },

  mixins: [mixin],

};
</script>

<style lang="scss">
.plv-lottery-end-SF__result {
  padding: 0 32px;
  p {
    margin: 0;
  }
}

.plv-lottery-end-SF__winner {
  padding: 24px 0 0;
  text-align: center;
  font-size: 14px;
  color: #333333;

  img {
    width: 68px;
    height: 68px;
    display: block;
    margin: auto;
  }

  .plv-lottery-end-SF__winner__tips {
    font-size: 18px;
    color: #FBDAAE;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    line-height: 28px;
    span {
      color: #f4722c;
    }
  }
  .plv-lottery-end-SF__winner__msg {
    color: #f2ede699;
    padding: 8px 33px 32px 50px;
    text-align: left;
    font-size: 16px;
  }
  .plv-lottery-end-SF__winner__code {
    color: #757575;
    span {
      color: #FF5722;
    }
  }
}

.plv-lottery-end-SF__not-winner {
  text-align: center;
  img {
    width: 60px;
    height: 60px;
  }
  p {
    font-size: 16px;
    color: rgb(242 237 230 / 60%);
  }
  .plv-lottery-end-SF__not-winner__tips {
    margin: 0;
  }
}

.plv-lottery-end-SF__not-winner__list-btn {
  background: none;
  border: none;
  margin: 0 auto 24px;
  color: #2196F3;
  font-size: 14px;
  cursor: pointer;
}

.plv-lottery-end-SF__not-winner__tips {
  color: #8b8986;
  padding: 54px 22px 24px 39px;
  text-align: left;
}
.plv-lottery-end-SF__list-btn {
  background: none;
  border: none;
  color: #FBDAAE;
  font-size: 14px;
  margin: 24px auto 32px;
  cursor: pointer;
}
.plv-lottery-end-SF__not-winner__btn-known {
  padding: 0 24px;
}

.plv-lottery-end-SF__info-btn {
  padding: 0 24px;
  button {
    height: 32px;
    line-height: 32px;
    width: 90px;
    background: #D4AC76;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    border-radius: 25px;
    cursor: pointer;
  }
}

</style>
