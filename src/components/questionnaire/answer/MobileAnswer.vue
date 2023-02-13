<template>
  <div class="plv-iar-mobile-questionnaire-answer-default">
    <div class="plv-iar-mobile-questionnaire-answer-default__wrap">
      <div
        class="plv-iar-mobile-questionnaire-answer-default__title"
        :class="{'plv-iar-mobile-questionnaire-answer-default__title--desc': questionResult.desc}"
      >
        {{ questionResult.questionnaireTitle }}
      </div>
      <p v-if="questionResult.desc" class="plv-iar-mobile-questionnaire-answer-default__desc">{{ questionResult.desc }}</p>
      <div v-for="(answerItem, answerIndex) of questions" :key="answerItem.questionId">
        <answer-item :answer="answerItem" :index="answerIndex" />
      </div>
    </div>
    <div
      class="plv-iar-mobile-questionnaire-answer-default__btn__wrap"
      :style="{
        paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
      }"
    >
      <iar-button @click="$emit('close')">
        {{ iarTrans('questionnaire.know') }}
      </iar-button>
    </div>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import answerMixin from './mixin/answer-mixin';

import IarButton from '../../../components/common/button/MobileButton';
import AnswerItem from './MobileAnswerItem';
import { isIPhoneXSeries } from '../../../assets/utils/browser';

export default {
  components: {
    IarButton,
    AnswerItem
  },
  mixins: [basicMixin, answerMixin],
  props: {
    questionResult: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
};
</script>

<style lang="scss" >
.plv-iar-mobile-questionnaire-answer-default {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.plv-iar-mobile-questionnaire-answer-default__btn__wrap {
  margin-top: 20px;
  text-align: center;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
}
.plv-iar-mobile-questionnaire-answer-default__wrap {
  padding: 24px 24px 0;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}
.plv-iar-mobile-questionnaire-answer-default__title {
  margin-bottom: 24px;
  font-weight: 600;
  word-break: break-word;
  text-align: center;
  font-size: 16px;
  color: #333;
  line-height: 22px;
}
.plv-iar-mobile-questionnaire-answer-default__title--desc {
  margin-bottom: 12px;
}
.plv-iar-mobile-questionnaire-answer-default__desc {
  text-align: center;
  font-size: 14px;
  color: #757575;
  line-height: 20px;
  margin: 0;
}
</style>
