<!-- @file 移动端中奖结束组件 -->

<template>
  <div class="plv-lottery-end-SF">
    <div v-show="status === AllStatus.isShowLotteryEnd">
      <!-- 中奖 -->
      <template v-if="isWinner">
        <div class="plv-lottery-end-SF__winner">
          <img src="./imgs/SF-logo.png" alt="LOGO" />
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
      <winner-list
        :lottery-id="lotteryId"
        :lottery-sdk="lotterySdk"
        @back="onClickBack"
      />
    </div>

    <!-- 填写中奖人信息 -->
    <div v-if="status === AllStatus.isShowSubmitInfo">
      <submit-info
        :collect-info="collectInfo"
        :received="received"
        @check-winners="onClickShowWinner"
        @submit="onClickSubmit"
      />
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import WinnerList from '../../../components/lottery/winner-list/SFMobileWinnerList';
import SubmitInfo from '../../../components/lottery/submit-info/MobileSubmitInfo';

export default {
  components: {
    WinnerList,
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
.plv-lottery-end-SF__winner {
  padding: 16px 32px 24px;
  text-align: center;
  color: #333333;

  img {
    width: 68px;
    height: 68px;
  }
  p {
    margin: 0;
  }
  .plv-lottery-end-SF__winner__tips {
    font-size: 18px;
    color: #F2EDE6;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    line-height: 28px;
    span {
      color: #f4722c;
    }
  }
  .plv-lottery-end-SF__winner__winner-list {
    color: #FBDAAE;
    margin-top: 24px;
    font-size: 14px;
  }
  .plv-lottery-end-SF__winner__msg {
    color: rgb(242 237 230 / 60%);
    padding: 8px 2px 32px 5px;
    text-align: left;
    font-size: 16px;
    display: inline-block;
  }
  .plv-lottery-end-SF__winner__code {
    font-size: 14px;
    margin-top: 8px;
    span {
      color: #FF5722;
    }
  }
}
.plv-lottery-end-SF__list-btn {
  background: none;
  border: none;
  color: #FBDAAE;
  font-size: 14px;
  cursor: pointer;
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

.plv-lottery-end-SF__not-winner {
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
  .plv-lottery-end-SF__not-winner__tips {
    color: rgb(242 237 230 / 60%);
    padding: 19px 33px 50px 50px;
    text-align: left;
    display: inline-block;
  }
  .plv-lottery-end-SF__list-btn {
    margin: 24px auto 0;
  }
  .plv-lottery-end-SF__not-winner__btn-known {
    padding: 0 24px;
  }
}
</style>
