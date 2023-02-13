<template>
  <modal class="plv-iar-welfare-lottery__modal--answer-question plv-iar-welfare-lottery__modal--normal" :data-lang="lang">
    <div class="plv-iar-welfare-lottery__modal__head">
      <slot name="header">
        <div class="plv-iar-welfare-lottery__modal__head-title">{{ iarTrans('welfareLottery.lotteryQuestion') }}</div>
      </slot>
      <span class="plv-iar-welfare-lottery__modal__close" @click="$emit('close')"></span>
    </div>
    <!-- 展示题目-->
    <div v-if="isShowQuestion" class="plv-iar-welfare-lottery__modal-contain">
      <div class="plv-iar-welfare-lottery__modal__main">
        <div class="plv-iar-welfare-lottery__answer-question-msg">
          {{ iarTrans('welfareLottery.questionsProcessTip1', {questionRate: questionRateLabel, }) }}
          <span class="plv-iar-welfare-lottery__answer-question-msg--task">{{ iarTrans('welfareLottery.questionsProcessTip2', { leastCount: leastCount, rightCount: overCorrectCount}) }}</span>
        </div>
        <div class="plv-iar-welfare-lottery__answer-question-title">{{ questionTypeLabel }} {{ currentQuestion.name }}</div>
        <QuestionItem v-if="currentQuestion" :question="currentQuestion" @select="onSelectOption" />
      </div>

      <div class="plv-iar-welfare-lottery__modal--answer-question--submit" @click="submit">
        {{ submitBtnText }}
      </div>
    </div>

    <!-- 展示答题结果-->
    <div v-if="isShowResult" class="plv-iar-welfare-lottery__modal-contain">
      <div class="plv-iar-welfare-lottery__modal__main">
        <div class="plv-iar-welfare-lottery__answer-process">
          <div class="plv-iar-welfare-lottery__answer-process--wrap">
            <div class="plv-iar-welfare-lottery__answer-process--inner" :style="{ width: questionRate * 100 + '%'}"></div>
          </div>
          <div>  {{ iarTrans('welfareLottery.finishQuestionProcess', { questionRate: questionRateLabel }) }}</div>
        </div>

        <!-- 回答正确-->
        <div v-if="isAnswerRight" class="plv-iar-welfare-lottery__modal__main-result">
          <img class="plv-iar-welfare-lottery__modal__main-result--img" src="../imgs/emoji-guzhang.png" />
          <div class="plv-iar-welfare-lottery__modal__main-result-msg">    {{ iarTrans('welfareLottery.answerRightMsg') }}</div>
          <div v-if="moreLeastCount > 0" class="plv-iar-welfare-lottery__modal__main-result-tip">    {{ iarTrans('welfareLottery.answerMoreRight', {count: moreLeastCount}) }}</div>
          <div class="plv-iar-welfare-lottery__modal__main-result-answers">    {{ iarTrans('welfareLottery.answersNumber', {answers: answeredCount, answerRight: rightCount}) }}</div>
        </div>
        <!-- 回答错误-->
        <div v-if="!isAnswerRight" class="plv-iar-welfare-lottery__modal__main-result">
          <img class="plv-iar-welfare-lottery__modal__main-result--img--ku" src="../imgs/emoji-ku.png" />
          <div class="plv-iar-welfare-lottery__modal__main-result-msg">    {{ iarTrans('welfareLottery.answerErrorMsg') }}</div>
          <div v-if="moreLeastCount > 0" class="plv-iar-welfare-lottery__modal__main-result-tip">    {{ iarTrans('welfareLottery.answerMoreRight', {count: moreLeastCount}) }}</div>
          <div class="plv-iar-welfare-lottery__modal__main-result-answers">    {{ iarTrans('welfareLottery.answersNumber', {answers: answeredCount, answerRight: rightCount}) }}</div>

          <div class="plv-iar-welfare-lottery__modal__main-result--correct-answer">
            <div class="plv-iar-welfare-lottery__answer-question-title">
              {{ currentQuestion.name }}
            </div>
            <div v-for="(item, index) in questionRightOption" :key="index" class="plv-iar-welfare-lottery__answer-question-options--right">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isAnswerRight && isShowNextQuestion" class="plv-iar-welfare-lottery__modal--answer-question--submit" @click="readyNextQuestion">
        {{ iarTrans('welfareLottery.nextQuestion') }}
      </div>
      <div v-else-if="!isAnswerRight && isAnswerQuestionOver" class="plv-iar-welfare-lottery__modal--answer-question--submit" @click="nextStep">
        {{ resultBtnText }}
      </div>

      <div v-else class="plv-iar-welfare-lottery__modal-footer-tip">
        {{ footerTip }}
      </div>
    </div>

    <!-- 展示统计-->
    <div v-if="isShowStatistics" class="plv-iar-welfare-lottery__modal-contain">
      <div class="plv-iar-welfare-lottery__modal__main plv-iar-welfare-lottery__modal__main-statistics">
        <!-- 有中奖资格 -->
        <div v-if="isSatisfiesLottery" class="plv-iar-welfare-lottery__modal__main-statistics">
          <img class="plv-iar-welfare-lottery__modal__main-result--img" src="../imgs/emoji-guzhang.png" />
          <div class="plv-iar-welfare-lottery__modal__main-statistics-tip">    {{ iarTrans('welfareLottery.satisfiesLotteryTip', {count: correctCount}) }}</div>
        </div>
        <!-- 无中奖资格 -->
        <div v-else class="plv-iar-welfare-lottery__modal__main-statistics">
          <img class="plv-iar-welfare-lottery__modal__main-result--img" src="../imgs/emoji-ku.png" />
          <div class="plv-iar-welfare-lottery__modal__main-statistics-tip">    {{ iarTrans('welfareLottery.noSatisfiesLotteryTip', {count: correctCount}) }}</div>
        </div>

        <div class="plv-iar-welfare-lottery__modal__main-statistics-table">
          <QuestionStatistics
            v-for="(item, index) in statisticsResult"
            :key="index"
            :is-right="item"
            :index="index + 1"
          />
        </div>
      </div>

      <div class="plv-iar-welfare-lottery__modal--answer-question--submit" @click="readPrize">
        {{ iarTrans('welfareLottery.readPrize') }}
      </div>
    </div>
  </modal>
</template>

<script>
import mixin from './mixin';
import Modal from '../../common/modal/MobileModal.vue';
import QuestionItem from '../../questionnaire/question/MobileQuestionItem';
import QuestionStatistics from '../question-statistics';

export default {
  components: {
    Modal,
    QuestionItem,
    QuestionStatistics
  },
  mixins: [mixin]
};
</script>

<style lang="scss">
@import '../../../assets/styles/basic.scss';
@import '../base.scss';
.plv-iar-welfare-lottery__modal--answer-question {
  .plv-iar-modal__main {
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(135deg, #FFF8EB 0%, #FFEBEB 100%);
    // 覆盖问卷题目样式
    .plv-iar-questionnaire-question__options--table {
      width: 100%;
    }

    .plv-iar-questionnaire-question-mobile .plv-iar-questionnaire-question__option label .plv-iar-questionnaire-question__option__mobile--border {
      border: 1px solid rgb(255 178 153 / 30%);
    }

    .plv-iar-questionnaire-question-mobile .plv-iar-questionnaire-question__option label .plv-iar-questionnaire-question__option__input:checked ~ .plv-iar-questionnaire-question__option__mobile--border {
      border-color: #FFA515;
    }

    .plv-iar-questionnaire-question-mobile .plv-iar-questionnaire-question__option label .plv-iar-questionnaire-question__option__input:checked ~ .plv-iar-questionnaire-question__option__text {
      color: #FFA515;
    }
  }
  .plv-iar-welfare-lottery__modal__head-title {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    color: #333333;
  }

  .plv-iar-welfare-lottery__answer-question-title {
    line-height: 22px;
    font-size: 16px;
    color: #333333;
    margin-bottom: 16px;
    margin-top: 4px;
  }

  .plv-iar-welfare-lottery__answer-question-msg {
    font-size: 12px;
    color: rgb(51 51 51 / 30%);
    margin-bottom: 2px;
  }

  .plv-iar-questionnaire-question__title {
    display: none;
  }

  .plv-iar-welfare-lottery__modal-contain {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
  }
  .plv-iar-welfare-lottery__modal__main {
    padding: 12px 24px;
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    @include scrollbar();
    &::-webkit-scrollbar-track {
      background-color: inherit;
    }
  }

  .plv-iar-welfare-lottery__modal--answer-question--submit {
    margin: 0 24px 24px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-image: linear-gradient(135deg, #FE9668 0%, #FE3F52 46%, #FF5691 100%);
    border-radius: 25px;
    cursor: pointer;
    color: white;
  }
  //答题进度条
  .plv-iar-welfare-lottery__answer-process {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FE3F52FF;
    .plv-iar-welfare-lottery__answer-process--wrap {
      flex: 1;
      height: 8px;
      background-image: linear-gradient(135deg, rgb(254 150 104 / 10%) 0%, rgb(254 63 82 / 10%) 46%, rgb(255 86 145 / 10%) 100%);
      overflow: hidden;
      border-radius: 4px;
      margin-right: 9px;
    }
    .plv-iar-welfare-lottery__answer-process--inner {
      height: 100%;
      background-image: linear-gradient(135deg, rgb(254 150 104) 0%, rgb(254 63 82) 46%, rgb(255 86 145) 100%);
    }
  }
  .plv-iar-welfare-lottery__modal__main-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .plv-iar-welfare-lottery__modal__main-result-msg {
    font-weight: 400;
    font-size: 16px;
    height: 24px;
    line-height: 24px;
    color: #333333;
    margin-top: 6px;
  }
  .plv-iar-welfare-lottery__modal__main-result-tip {
    font-size: 12px;
    color: #666666;
  }
  .plv-iar-welfare-lottery__modal__main-result-answers {
    display: none;
  }
  .plv-iar-welfare-lottery__modal__main-result--img {
    width: 32px;
    height: 32px;
  }
  .plv-iar-welfare-lottery__modal__main-result--img--ku {
    width: 54px;
    height: 54px;
  }

  .plv-iar-welfare-lottery__modal__main-result--correct-answer {
    margin-top: 16px;
    width: 100%;
    background-color: #FFF8F7;
    padding: 16px 24px;
    border-radius: 8px;
  }
  .plv-iar-welfare-lottery__answer-question-options--right + .plv-iar-welfare-lottery__answer-question-options--right {
    margin-top: 12px;
  }
  .plv-iar-welfare-lottery__answer-question-options--right {
    position: relative;
    min-height: 36px;
    line-height: 22px;
    padding: 8px 50px 8px 16px;
    background: rgb(1 180 109 / 10%);
    border-radius: 20px;
    color: #01B46DFF;
    font-weight: 600;
    font-size: 14px;
  }
  .plv-iar-welfare-lottery__answer-question-options--right::after {
    content: ' ';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url('../imgs/icon-answer-right.png');
    background-size: 100% 100%;
  }
  .plv-iar-welfare-lottery__modal-footer-tip {
    font-size: 12px;
    color: #FE3F52;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin-bottom: 24px;
  }
  .plv-iar-welfare-lottery__modal__main-statistics {
    padding: 12px 16px 0;
    margin-bottom: 28px;
  }

  .plv-iar-welfare-lottery__modal__main-statistics {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .plv-iar-welfare-lottery__modal__main-statistics-tip {
    padding: 2px 0;
    margin-left: 2px;
    background-image: linear-gradient(90deg, #FE9067 35%, #FE3F52 80%, #FF5691 100%);
    background-clip: text;
    color: transparent;
  }
  .plv-iar-welfare-lottery__modal__main-statistics-table {
    flex: 1;
    overflow-y: auto;
    width: 85%;
    @include scrollbar();
    &::-webkit-scrollbar {
      width: 6px;
    }
    .plv-iar-welfare-lottery__question-statistics {
      display: inline-block;
    }
  }
  .plv-iar-questionnaire-question__option__inner-wrap {
    padding-bottom: 12px;
  }
}

//横屏状态下
@media screen and (min-aspect-ratio: 4/3) {
  // 只要宽高比大于等于4/3，就会执行
  .plv-iar-welfare-lottery__modal--gift-box {
    .plv-iar-welfare-lottery__modal__head {
      top: 42px !important;
    }
    .plv-iar-modal__main {
      top: 50%;
      left: 50%;
      padding-top: 80px !important;
      transform: translate(-50%, -50%) scale(0.9);
      width: 415px !important;
      height: 340px !important;
    }
  }
  div[lang='en'] {
    .plv-iar-welfare-lottery__modal--gift-box {
      .plv-iar-modal__main {
        height: 360px !important;
      }
    }
    .plv-iar-welfare-lottery__modal--gift-box .plv-iar-welfare-lottery__modal__head {
      top: 50px !important;
    }
  }
  .plv-iar-welfare-lottery__modal__body {
    padding: 0 16px !important;
  }
  .plv-iar-welfare-lottery__task__prize-tabs {
    margin-bottom: 4px !important;
    padding-top: 2px;
  }
  .plv-iar-welfare-lottery__task__prize-tabs .plv-iar-welfare-lottery__task__prize-tabs-item {
    height: 28px;
  }
  .plv-iar-welfare-lottery__gift {
    padding: 8px 13px 8px 16px;
    height: 96px;
  }
  .plv-iar-welfare-lottery__gift__pic {
    width: 80px;
    height: 80px;
  }
  .plv-iar-welfare-lottery__task {
    padding: 5px 16px;
    margin-bottom: 16px;
  }
  .plv-iar-welfare-lottery__btn--lg {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
  }

  // 答题弹窗
  .plv-iar-welfare-lottery__modal--answer-question {
    .plv-iar-modal__main {
      @include full-screen-modal;
    }
  }
  .plv-iar-welfare-lottery__modal--answer-question .plv-iar-welfare-lottery__modal--answer-question--submit {
    height: 36px;
    line-height: 36px;
    margin-bottom: 20px;
  }
}
</style>
