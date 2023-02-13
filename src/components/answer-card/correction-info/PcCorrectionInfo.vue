<!-- @file PC端答题卡-个人答题正误情况。 -->

<template>
  <div class="plv-iar-answer-card-correction-default">
    <template v-if="selfCorrection === 'selfRight'">
      <div class="plv-iar-answer-card-correction-default__icon plv-iar-answer-card-correction-default__icon--right"></div>
      <div class="plv-iar-answer-card-correction-default__text">
        {{ iarTrans('answerCard.rightAnswerWords') }}
      </div>
    </template>
    <template v-else-if="selfCorrection === 'selfWrong'">
      <div class="plv-iar-answer-card-correction-default__icon plv-iar-answer-card-correction-default__icon--wrong"></div>
      <div class="plv-iar-answer-card-correction-default__text">
        {{ iarTrans('answerCard.wrongAnswerWords') }}
      </div>
    </template>
    <template v-else>
      <div class="plv-iar-answer-card-correction-default__icon plv-iar-answer-card-correction-default__icon--not-submitted"></div>
      <p class="plv-iar-answer-card-correction-default__text">{{ iarTrans('answerCard.notSubmittedTips') }}</p>
    </template>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-answer-card-correction-default {
  margin: 0 auto 20px;
  text-align: center;
}

.plv-iar-answer-card-correction-default__text {
  font-size: 14px;
  color: #333;
  text-align: center;
  line-height: 1;
  p {
    display: inline;
  }
  ::v-deep span {
    color: #45ACFF;
    font-size: 18px;
    font-weight: 600;
  }
}

.plv-iar-answer-card-correction-default__icon {
  background-position: center;
  background-size: cover;
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;

  &--right {
    background-image: url(./imgs/icon-tip-right.png);
  }
  &--wrong {
    background-image: url(./imgs/icon-tip-wrong.png);
  }
  &--not-submitted {
    background-image: url(./imgs/icon-tip-not-submit.png);
  }
}
</style>
