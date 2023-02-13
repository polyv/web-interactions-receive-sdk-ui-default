<!-- @file 移动端中奖结束组件 -->

<template>
  <div class="plv-lottery-end-default">
    <div v-show="status === AllStatus.isShowLotteryEnd">
      <!-- 中奖 -->
      <template v-if="isWinner">
        <div class="plv-lottery-end-default__winner">
          <img src="./imgs/icon-winner.png" />
          <p class="plv-lottery-end-default__winner__tips">{{ iarTrans('lottery.congratulationsWinner') }}“{{ prize }}”</p>
          <p v-if="hasCollect && showWinnerCode" class="plv-lottery-end-default__winner__code">{{ iarTrans('lottery.redeemCode') }}：<span>{{ winnerCode }}</span></p>
          <div v-if="!hideResult">
            <button
              v-if="showWinners"
              class="plv-lottery-end-default__list-btn pws-font-theme-color"
              @click="onClickShowWinner"
            >
              {{ iarTrans('lottery.checkList') }}
            </button>
          </div>
          <div class="plv-lottery-end-default__winner__info-btn">
            <button v-if="collectInfo.length > 0" class="pws-btn-bg-color" @click="onClickShowSubmitInfo">
              {{ iarTrans('lottery.submitInfomation') }}
            </button>
            <button v-else class="pws-btn-bg-color" @click="onClickKnow">
              {{ iarTrans('lottery.gotIt') }}
            </button>
          </div>
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
              class="plv-lottery-end-default__list-btn pws-font-theme-color"
              @click="onClickShowWinner"
            >
              {{ iarTrans('lottery.checkList') }}
            </button>
          </div>
          <div class="plv-lottery-end-default__not-winner__btn-known">
            <iar-button @click="$emit('to-hide')">
              {{ iarTrans('lottery.know') }}
            </iar-button>
          </div>
        </div>
      </template>
    </div>

    <!-- 中奖名单 -->
    <div v-if="status === AllStatus.isShowWinnerList">
      <winner-list
        :lottery-id="lotteryId"
        :lottery-sdk="lotterySdk"
        @back="onClickBack"
      />
    </div>

    <!-- 填写中奖人信息 -->
    <div v-if="status === AllStatus.isShowSubmitInfo" class="plv-lottery-end-default__submit-info">
      <div v-if="!socketConnected" class="plv-iar-mobile-lottery-tip--error">{{ iarTrans('lottery.netError') }}</div>
      <submit-info
        :collect-info="collectInfo"
        :received="received"
        :deadline="deadline"
        :is-web-view="isWebView"
        @check-winners="onClickShowWinner"
        @submit="onClickSubmit"
        @know="onClickKnow"
      />
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import WinnerList from '../../../components/lottery/winner-list/MobileWinnerList';
import IarButton from '../../../components/common/button/MobileButton';
import SubmitInfo from '../../../components/lottery/submit-info/MobileSubmitInfo';

export default {
  components: {
    WinnerList,
    IarButton,
    SubmitInfo,
  },

  mixins: [mixin],

  methods: {
    onClickShowSubmitInfo() {
      this.status = this.AllStatus.isShowSubmitInfo;
    },
  },
};
</script>

<style lang="scss">
.plv-lottery-end-default__winner {
  padding: 25px 0 24px;
  text-align: center;
  color: #333333;

  img {
    width: 60px;
    height: 60px;
  }
  p {
    margin: 0;
  }
  .plv-lottery-end-default__winner__tips {
    margin-top: 23px;
    font-size: 16px;
  }
  .plv-lottery-end-default__winner__code {
    font-size: 14px;
    margin-top: 8px;
    span {
      color: #FF5722;
    }
  }
  .plv-lottery-end-default__list-btn {
    margin: 22px auto 0;
  }
}
.plv-lottery-end-default__list-btn {
  background: none;
  border: none;
  margin: 0 auto;
  color: #3082FE;
  font-size: 16px;
}
.plv-lottery-end-default__winner__info-btn {
  margin-top: 26px;
  padding: 0 24px;
  button {
    height: 48px;
    line-height: 48px;
    width: 100%;
    background: #FF5722;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;
    border-radius: 25px;
  }
}

.plv-lottery-end-default__not-winner {
  padding: 25px 0 23px;
  text-align: center;
  color: #333333;

  img {
    width: 60px;
    height: 60px;
  }
  p {
    margin: 0;
  }
  .plv-lottery-end-default__not-winner__tips {
    color: #333333;
    margin-top: 24px;
  }
  .plv-lottery-end-default__list-btn {
    margin: 24px auto 0;
  }
  .plv-lottery-end-default__not-winner__btn-known {
    margin-top: 24px;
    padding: 0 24px;
  }
}
.plv-lottery-end-default__submit-info {
  position: relative;
}
.plv-iar-mobile-lottery-tip--error {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  line-height: 28px;
  background-color: #fb7272;
  color: white;
  text-align: center;
}
</style>
