<!-- 奖品信息组件 -->
<template>
  <div class="plv-iar-welfare-lottery__gift">
    <img v-if="prize.thumbnail" class="plv-iar-welfare-lottery__gift__pic" :src="prize.thumbnail" />
    <div class="plv-iar-welfare-lottery__gift__detail">
      <h2 class="plv-iar-welfare-lottery__gift__name" :class="{'plv-iar-welfare-lottery__gift__name--no_img': !prize.thumbnail }"><span>{{ prize.prizeName }}</span></h2>
      <div class="plv-iar-welfare-lottery__gift__detail__more">
        <div v-if="prize.realPrice || prize.price" class="plv-iar-welfare-lottery__gift__price">
          <span v-if="prize.realPrice" class="plv-iar-welfare-lottery__gift__price--present">¥{{ prize.realPrice }}</span>
          <span v-if="prize.price" class="plv-iar-welfare-lottery__gift__price--original">¥{{ prize.price }}</span>
        </div>
        <div class="plv-iar-welfare-lottery__gift__numbers">
          <span class="plv-iar-welfare-lottery__gift__numbers__text">{{ iarTrans('welfareLottery.numberOfPrizes1') }}<span>{{ prize.amount }}</span>{{ iarTrans('welfareLottery.numberOfPrizes2') }}</span>
          <span v-if="prize.inviteType === 'poster' || prize.lotteryCondition === 'question'" class="plv-iar-welfare-lottery__participants">{{ (prize.viewerSize || 0) + iarTrans('welfareLottery.joinCounts') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    prize: {
      type: Object,
      default: () => ({})
    },
  }
};
</script>

<style lang="scss">
@import '../font.scss';

.plv-iar-welfare-lottery__gift {
  position: relative;
  height: 122px;
  padding: 16px 13px 16px 16px;
  background-color: #FFF8EB;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
}
.plv-iar-welfare-lottery__gift__pic {
  width: 90px;
  height: 90px;
  border-radius: 8px;
  margin-right: 12px;
}
.plv-iar-welfare-lottery__gift__detail {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.plv-iar-welfare-lottery__gift__name {
  font-size: 18px;
  color: #333;
  font-weight: 500;
  margin: 0;
  flex: 1;
}
.plv-iar-welfare-lottery__gift__name--no_img {
  display: flex;
  align-items: center;
  line-height: 24px;
}
.plv-iar-welfare-lottery__gift__detail__more {
  width: 100%;
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
}
.plv-iar-welfare-lottery__gift__price {
  display: flex;
  align-items: flex-end;
}
.plv-iar-welfare-lottery__gift__price--present {
  color: #FE3F52;
  font-size: 22px;
  font-weight: 600;
  font-family: DINProFont;
}
.plv-iar-welfare-lottery__gift__price--original {
  display: inline-block;
  vertical-align: middle;
  margin-top: -5px;
  text-decoration: line-through;
}
.plv-iar-welfare-lottery__gift__numbers {
  vertical-align: middle;
  margin-top: 9px;
}
.plv-iar-welfare-lottery__gift__numbers__text {
  color: #666;
  >span {
    color: #FE3F52;
  }
}
.plv-iar-welfare-lottery__participants {
  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 14px;
    vertical-align: middle;
    margin-right: 4px;
    margin-top: -1px;
    opacity: 0.2;
    background-color: #999;
  }
}
</style>
