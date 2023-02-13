<template>
  <div>
    <div v-if="!socketConnected" class="plv-iar-questionnaire-tip--error">{{ iarTrans('questionnaire.netError') }}</div>
    <div v-if="showRequiredTip" class="plv-iar-questionnaire-tip--error">{{ requiredNotFill[0] !== 'privacy' ? iarTrans('questionnaire.requiredTip') : iarTrans('questionnaire.privacyTip') }}</div>
    <module-container>
      <div v-for="(questionItem, questionIndex) of questions" :key="questionItem.questionId">
        <question-item
          :ref="`questionItem-${questionItem.questionId}`"
          :question="questionItem"
          :index="questionIndex"
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

      <template #footer>
        <div class="plv-iar-questionnaire-question-default__footer" :class="{ 'plv-iar-questionnaire-question-default__footer--single' : countDownTime < 0 }">
          <div v-if="countDownTime > -1" class="plv-iar-pc-questionnaire-delay-time">
            <img src="../imgs/icon-time.svg" />
            <Countdown
              ref="countdown"
              v-slot="{ countdown }"
              class="plv-iar-pc-questionnaire-delay-time-msg"
              :time="countDownTime"
              @countdown-finish="countdownFinish"
            >
              <CountDownText :countdown="countdown" />
            </Countdown>
          </div>
          <div class="plv-iar-questionnaire-question__btn-group">
            <iar-button
              style="min-width: 96px;"
              type="cancel"
              :disabled="submitDisabled"
              @click="goBack"
            >
              {{ iarTrans('questionnaire.back') }}
            </iar-button>
            <iar-button
              style="min-width: 96px;"
              :disabled="submitDisabled"
              @click="() => onSubmitAnswer()"
            >
              {{ iarTrans('questionnaire.submit') }}
            </iar-button>
          </div>
        </div>
      </template>

      <!--      <IarConfirm-->
      <!--        v-if="showConfirm"-->
      <!--        :cancel-text="iarTrans('questionnaire.cancel')"-->
      <!--        @cancel="showConfirm = false"-->
      <!--        @confirm="goBack"-->
      <!--      />-->
    </module-container>
  </div>
</template>

<script>
import mixin from './mixin/question';

import IarButton from '../../../components/common/button/PcButton';
// import IarConfirm from '../../../components/common/confirm/PcConfirm';
import ModuleContainer from '../../common/module-container/PcModuleContainer';
import QuestionItem from './PcQuestionItem';
import PrivacyCheckBox from '../../common/privacy-checkbox';
import Countdown from '../../../components/common/count-down/Countdown';
import CountDownText from './CountDownText';

export default {
  components: {
    CountDownText,
    IarButton,
    ModuleContainer,
    QuestionItem,
    PrivacyCheckBox,
    Countdown,
    // IarConfirm
  },
  mixins: [mixin],
};
</script>

<style lang="scss" >
.plv-iar-questionnaire-tip--error {
  position: absolute;
  top: -28px;
  left: 0;
  right: 0;
  height: 28px;
  line-height: 28px;
  background-color: #fb7272;
  color: white;
  text-align: center;
}
.plv-iar-questionnaire-question-default__footer {
  padding: 16px 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ECEFF1;
  &--single {
    justify-content: center;
  }
}

.plv-iar-questionnaire-question__btn-group {
  display: flex;
  align-items: center;
}

.plv-iar-questionnaire-question-default__privacy {
  margin-top: 30px;
  padding: 0 24px;
}
.plv-iar-pc-questionnaire-delay-time {
  position: relative;
  font-size: 12px;
  color: #757575;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  .plv-iar-pc-questionnaire-delay-time-msg {
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
