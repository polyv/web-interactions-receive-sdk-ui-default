<template>
  <div class="plv-iar-mobile-questionnaire-question-default">
    <div v-if="!socketConnected" class="plv-iar-mobile-questionnaire-tip--error">{{ iarTrans('questionnaire.netError') }}</div>
    <div v-if="showRequiredTip" class="plv-iar-mobile-questionnaire-tip--error">{{ requiredNotFill[0] !== 'privacy' ? iarTrans('questionnaire.requiredTip') : iarTrans('questionnaire.privacyTip') }}</div>
    <div class="plv-iar-mobile-questionnaire-question-default__wrap">
      <div
        class="plv-iar-mobile-questionnaire-question-default__title"
        :class="{'plv-iar-mobile-questionnaire-question-default__title--desc': questionnaire.desc}"
      >
        {{ questionnaire.questionnaireTitle }}
      </div>
      <p v-if="questionnaire.desc" class="plv-iar-mobile-questionnaire-question-default__desc">{{ questionnaire.desc }}</p>
      <p v-if="isExam" class="plv-iar-mobile-questionnaire-question-default__total-score">{{ iarTrans('questionnaire.totalScoreLabel') }}：<span>{{ totalScore }}</span> {{ iarTrans('questionnaire.scoreUnit') }}</p>
      <div v-for="(questionItem, questionIndex) of questions" :key="questionItem.questionId">
        <question-item
          :ref="`questionItem-${questionItem.questionId}`"
          :question="questionItem"
          :index="questionIndex"
          :is-web-view="isWebView"
          @select="onSelectOption"
        />
      </div>

      <PrivacyCheckBox
        v-if="showPrivacy"
        ref="privacyBox"
        v-model="privacyEnable"
        :content="questionnaire.privacy.content"
        :is-web-view="isWebView"
        class="plv-iar-questionnaire-question-default__privacy"
        @to-link="toLink"
      />
    </div>
    <div
      class="plv-iar-mobile-questionnaire-question-default__btn__wrap plv-iar-mobile-questionnaire-line"
      :style="{
        paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
      }"
    >
      <div v-if="countDownTime > -1" class="plv-iar-mobile-questionnaire-delay-time">
        <img src="../imgs/icon-time.svg" />
        <Countdown
          ref="countdown"
          v-slot="{ countdown }"
          class="plv-iar-mobile-questionnaire-delay-time-msg"
          :time="countDownTime"
          @countdown-finish="countdownFinish"
        >
          <CountDownText :countdown="countdown" />
        </Countdown>
      </div>
      <iar-button
        :disabled="submitDisabled"
        @click="() => onSubmitAnswer()"
      >
        {{ iarTrans('questionnaire.submit') }}
      </iar-button>
    </div>
  </div>
</template>

<script>
import mixin from './mixin/question';

import IarButton from '../../../components/common/button/MobileButton';
import QuestionItem from './MobileQuestionItem';
import { isIPhoneXSeries } from '../../../assets/utils/browser';
import PrivacyCheckBox from '../../common/privacy-checkbox';
import Countdown from '../../../components/common/count-down/Countdown';
import CountDownText from './CountDownText';

export default {
  components: {
    CountDownText,
    IarButton,
    QuestionItem,
    PrivacyCheckBox,
    Countdown
  },
  mixins: [mixin],
  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
};
</script>

<style lang="scss" >
.plv-iar-mobile-questionnaire-question-default {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.plv-iar-mobile-questionnaire-tip--error {
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
.plv-iar-mobile-questionnaire-question-default__btn__wrap {
  text-align: center;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
}
.plv-iar-mobile-questionnaire-line:before {
  position: absolute;
  left: 0;
  top: 0;
  content: ' ';
  width: 100%;
  height: 1px;
  background-color: #ECEFF1;
}
.plv-iar-mobile-questionnaire-question-default__wrap {
  padding: 24px 24px 12px;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}
.plv-iar-mobile-questionnaire-question-default__title {
  margin-bottom: 24px;
  font-weight: 500;
  word-break: break-word;
  text-align: center;
  font-size: 18px;
  color: #333;
  line-height: 22px;
}

.plv-iar-mobile-questionnaire-question-default__title--desc {
  margin-bottom: 12px;
}

.plv-iar-questionnaire-question-default__privacy {
  margin-top: 30px;
}

.plv-iar-mobile-questionnaire-question-default__desc {
  text-align: center;
  font-size: 14px;
  color: #757575;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 12px;
}
.plv-iar-mobile-questionnaire-question-default__total-score {
  text-align: center;
  font-size: 14px;
  color: #757575;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 12px;
  span {
    font-size: 14px;
    color: #366BEE;
  }
}
.plv-iar-mobile-questionnaire-delay-time {
  position: relative;
  font-size: 12px;
  color: #757575;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  .plv-iar-mobile-questionnaire-delay-time-msg {
    display: flex;
    align-items: center;
  }
  p {
    margin: 0 8px;
  }
  img {
    width: 18px;
    height: 18px;
  }
  span {
    font-size: 14px;
    color: #366BEE;
  }
}
</style>
