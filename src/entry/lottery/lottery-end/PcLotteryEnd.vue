<!-- @file PC 端中奖结束组件 -->

<template>
  <div class="plv-lottery-end-default">
    <div v-show="status === AllStatus.isShowLotteryEnd" class="plv-lottery-end-default__result">
      <!-- 中奖 -->
      <template v-if="isWinner">
        <div class="plv-lottery-end-default__winner">
          <img src="./imgs/icon-winner.png" />
          <p class="plv-lottery-end-default__winner__tips">{{ iarTrans('lottery.congratulationsWinner') }}“{{ prize }}”</p>
          <p v-if="showWinnerCode" class="plv-lottery-end-default__winner__code">{{ iarTrans('lottery.redeemCode') }}：<span>{{ winnerCode }}</span></p>
          <!-- 没有用户收集信息展示在按钮上方-->
          <div v-if="!hideResult && showWinners" class="plv-lottery-check-winner">
            <button
              v-show="collectInfo.length === 0"
              class="plv-lottery-check-winner-btn"
              @click="onClickShowWinner"
            >
              {{ iarTrans('lottery.checkList') }}
            </button>
          </div>
        </div>
        <!-- 填写抽奖信息 -->
        <div>
          <submit-info
            :collect-info="collectInfo"
            :received="received"
            :deadline="deadline"
            :show-winners="showWinners"
            @check-winners="onClickShowWinner"
            @submit="onClickSubmit"
            @know="onClickKnow"
          />
        </div>
      </template>

      <!-- 未中奖 -->
      <template v-else>
        <div class="plv-lottery-end-default__not-winner">
          <img src="./imgs/icon-not-win.png" />
          <p class="plv-lottery-end-default__not-winner__tips">{{ iarTrans('lottery.participation') }}</p>
          <div v-if="!hideResult">
            <button
              v-if="showWinners"
              class="plv-lottery-end-default__not-winner__list-btn pws-font-theme-color"
              @click="onClickShowWinner"
            >
              {{ iarTrans('lottery.checkList') }}
            </button>
          </div>
          <iar-button @click="$emit('to-hide')">
            {{ iarTrans('lottery.gotIt') }}
          </iar-button>
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
import WinnerList from '../../../components/lottery/winner-list/PcWinnerList';
import IarButton from '../../../components/common/button/PcButton';
import SubmitInfo from '../../../components/lottery/submit-info/PcSubmitInfo';

export default {
  components: {
    WinnerList,
    IarButton,
    SubmitInfo,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-lottery-end-default__result {
  padding: 0 24px;
  p {
    margin: 0;
  }
}

.plv-lottery-end-default__winner {
  padding: 30px 0 20px;
  text-align: center;
  font-size: 14px;
  color: #333333;

  img {
    width: 60px;
    height: 60px;
  }

  .plv-lottery-end-default__winner__tips {
    margin: 14px auto 8px;
  }
  .plv-lottery-end-default__winner__code {
    color: #757575;
    span {
      color: #FF5722;
    }
  }
}

.plv-lottery-end-default__not-winner {
  padding: 60px 0 108px;
  text-align: center;
  img {
    width: 60px;
    height: 60px;
  }
  p {
    font-size: 14px;
    color: #333333;
  }
  .plv-lottery-end-default__not-winner__tips {
    margin: 20px auto;
  }
}

.plv-lottery-end-default__not-winner__list-btn {
  background: none;
  border: none;
  margin: 0 auto 24px;
  color: #2196F3;
  font-size: 14px;
  cursor: pointer;
}
.plv-lottery-check-winner {
  text-align: center;
  margin-top: 18px;
  .plv-lottery-check-winner-btn {
    margin: auto;
    background: none;
    border: none;
    color: #2196F3;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
