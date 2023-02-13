<template>
  <div
    class="plv-iar-welfare-lottery__result__content"
    :class="{'plv-iar-welfare-lottery__result__content--winning': isWinner}"
  >
    <div class="plv-iar-welfare-lottery__result__content__body">
      <h2 v-if="!lotteryData.thumbnail && isWinner" class="plv-iar-welfare-lottery__result__content__title--no-img">
        <img src="../imgs/emoji-guzhang.png" />
        {{ title }}
        <img src="../imgs/emoji-guzhang.png" style="transform: rotateY(180deg);" />
      </h2>
      <h2 v-else class="plv-iar-welfare-lottery__result__content__title">{{ title }}</h2>
      <template v-if="isWinner">
        <div v-if="lotteryData.thumbnail" class="plv-iar-welfare-lottery__result__prize__pic">
          <img :src="lotteryData.thumbnail" />
        </div>
        <div v-if="!lotteryData.thumbnail" class="plv-iar-welfare-lottery__result__prize__name--no-img"><span>{{ lotteryData.prizeName }}</span></div>
        <!--      <h2 v-if="!lotteryData.thumbnail" class="plv-iar-welfare-lottery__result__content__title">{{ lotteryData.prizeName }}</h2>-->
        <div v-else class="plv-iar-welfare-lottery__result__prize__name">{{ lotteryData.prizeName }}</div>
        <div class="plv-iar-welfare-lottery__result__exchange-code">{{ iarTrans('welfareLottery.redemptionCode') + '：' + winnerCode }}</div>
      </template>
      <template v-else>
        <div class="plv-iar-welfare-lottery__result__tip">{{ iarTrans('welfareLottery.resultTip1') }}</div>
        <div class="plv-iar-welfare-lottery__result__icon"></div>
      </template>
    </div>
    <div class="plv-iar-welfare-lottery__result__content__btn-group">
      <div class="plv-iar-welfare-lottery__result__participants">
        <span
          @click="$emit('winner-list')"
        >{{ (lotteryData.viewerSize || 0) + iarTrans('welfareLottery.joinCounts') }}，<span class="plv-iar-welfare-lottery__result__win-nums">{{ winnerCount }}</span>{{ iarTrans('welfareLottery.winCounts') }}</span>
      </div>
      <welfare-lottery-btn
        v-if="isWinner"
        type="deep"
        @click="$emit('receive')"
      >
        {{ iarTrans('welfareLottery.receivePrizes') }}
      </welfare-lottery-btn>
      <welfare-lottery-btn
        v-else
        type="deep"
        @click="$emit('got-it')"
      >
        {{ iarTrans('welfareLottery.ok') }}
      </welfare-lottery-btn>
    </div>
  </div>
</template>

<script>
import WelfareLotteryBtn from '../btn.vue';
import mixin from '../mixin';

export default {
  components: {
    WelfareLotteryBtn,
  },
  mixins: [mixin],
  props: {
    lotteryData: {
      type: Object,
      default: () => ({})
    },
    isWinner: Boolean,
    winnerCode: {
      type: String,
      required: true
    },
    isAppleMod: Boolean,
    isQuestionCondition: Boolean
  },
  computed: {
    title() {
      if (this.isQuestionCondition) {
        return this.iarTrans(this.isWinner ? 'welfareLottery.questionWinTitle' : 'welfareLottery.notWinTitle', { prize: this.lotteryData.prizeItem });
      } else {

        return this.iarTrans(this.isWinner ? 'welfareLottery.winTitle' : 'welfareLottery.notWinTitle');
      }
    },
    winnerCount() {
      return this.lotteryData.winnerIds ? this.lotteryData.winnerIds.length : 0;
    },
  },
};
</script>

<style lang="scss">
@import './base.scss';

.plv-iar-welfare-lottery__result__content {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  .plv-iar-welfare-lottery__result__content__body {
    flex: 1;
    overflow: auto;
  }
}
.plv-iar-welfare-lottery__result__content__title {
  margin: 0;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  background-image: linear-gradient(90deg, #FE9067 35%, #FE3F52 80%, #FF5691 100%);
  background-clip: text;
  color: transparent;
  margin-bottom: 4px;
}
.plv-iar-welfare-lottery__result__content--winning {
  .plv-iar-welfare-lottery__result__content__title {
    margin-bottom: 12px;
  }
}
.plv-iar-welfare-lottery__result__prize__pic {
  margin-bottom: 8px;
  >img {
    width: 114px;
    height: 114px;
    border-radius: 8px;
  }
}
.plv-iar-welfare-lottery__result__prize__name {
  font-size: 16px;
  line-height: 22px;
  color: #333;
  margin-bottom: 4px;
}
@media screen and (max-width: 320px) {
  .plv-iar-welfare-lottery__result__prize__name {
    font-size: 14px;
  }
}
.plv-iar-welfare-lottery__result__exchange-code {
  font-size: 12px;
  color: #757575;
  line-height: 17px;
}
.plv-iar-welfare-lottery__result__tip {
  font-size: 12px;
  color: #666;
  line-height: 17px;
  margin-bottom: 20px;
}
.plv-iar-welfare-lottery__result__icon {
  width: 140px;
  height: 140px;
  margin: 0 auto 24px;
  background-image: url(./gift-box.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.plv-iar-welfare-lottery__result__participants {
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
  .plv-iar-welfare-lottery__result__win-nums {
    color: #FE3F52;
  }
  >span {
    cursor: pointer;
    @include arrow-right-black;
  }
}
.plv-iar-welfare-lottery__result__content__title--no-img {
  font-size: 16px;
  color: #333333;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin: 0 4px;
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
}
.plv-iar-welfare-lottery__result__prize__name--no-img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 12px;
  height: 60px;
  overflow: hidden;
  padding: 0 16px;
  span {
    @extend .plv-iar-welfare-lottery__result__content__title;
    margin: 0 !important;
  }
}
@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-welfare-lottery__result__content {
    padding-top: 24px;
    padding-bottom: 34px;
  }
}
</style>
