<template>
  <div class="plv-iar-mobile-questionnaire-evaluation-question-default">
    <div class="plv-iar-mobile-questionnaire-evaluation-question-default__wrap">
      <div class="plv-iar-mobile-questionnaire-evaluation-question-default__title-count">
        <span>题目</span>
        <span class="plv-iar-mobile-questionnaire-evaluation-question-default__title-cur-count">
          {{ curQuestionIndex + 1 }}
        </span>
        <span>/</span>
        <span class="plv-iar-mobile-questionnaire-evaluation-question-default__title-total-count">
          {{ questions.length }}
        </span>
      </div>
      <div class="plv-iar-mobile-questionnaire-evaluation-question-default__question">
        <question-item
          :question="questions[curQuestionIndex]"
          :is-web-view="isWebView"
          :answer="answers[curQuestionIndex]"
          @select="onEvaluationSelectOption"
        />
      </div>
      <div class="plv-iar-mobile-questionnaire-evaluation-question-default__wrap-transition"></div>
    </div>
    <div
      class="plv-iar-mobile-questionnaire-evaluation-question-default__btn__wrap"
      :style="{
        paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
      }"
    >
      <div v-if="curQuestionIndex === questions.length - 1" class="plv-iar-mobile-questionnaire-evaluation-question-commit-btn" @click="onSubmitAnswer">提交</div>
      <div v-if="curQuestionIndex < questions.length - 1" class="plv-iar-mobile-questionnaire-evaluation-question-btn" @click="changeTitleIndex(1)">下一题</div>
      <div v-if="curQuestionIndex > 0" class="plv-iar-mobile-questionnaire-evaluation-question-btn" @click="changeTitleIndex(-1)">上一题</div>
    </div>
  </div>
</template>

<script>
import mixin from '../../questionnaire/question/mixin/question';

import QuestionItem from './MobileEvaluationQuestionItem';
import { isIPhoneXSeries } from '../../../assets/utils/browser';

export default {
  components: {
    QuestionItem,
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
.plv-iar-mobile-questionnaire-evaluation-question-default {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.plv-iar-mobile-questionnaire-evaluation-question-default__btn__wrap {
  width: 100%;
  padding: 4px 24px 0;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}

.plv-iar-mobile-questionnaire-evaluation-question-default__wrap {
  height: 420px;
  padding: 24px 24px 8px;
  box-sizing: border-box;
  overflow: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
  }
}

.plv-iar-mobile-questionnaire-evaluation-question-default__title-count {
  font-size: 14px;
  color: #9E9E9E;
}

.plv-iar-mobile-questionnaire-evaluation-question-default__title-cur-count {
  color: #E0C787;
}

.plv-iar-mobile-questionnaire-evaluation-question-default__question {
  margin-top: 8px;
}

.plv-iar-mobile-questionnaire-evaluation-question-default__desc {
  display: flex;
  justify-content: center;
}

.plv-iar-mobile-questionnaire-evaluation-question-btn {
  width: 90px;
  height: 40px;
  font-size: 14px;
  color: #D9BA6C;
  text-align: center;
  line-height: 40px;
}

.plv-iar-mobile-questionnaire-evaluation-question-commit-btn {
  width: 180px;
  height: 40px;
  border-radius: 50px;
  background: #D9BA6C;
  box-sizing: border-box;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
}

.plv-iar-mobile-questionnaire-evaluation-question-default__wrap-transition {
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  top: 402px;
  background: linear-gradient(to top, #fff 0%, rgba(255, 255, 255, 0) 100%),;
}
</style>
