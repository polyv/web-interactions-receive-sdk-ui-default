<!-- @file 移动端问卷 -->

<template>
  <div v-if="questionnaire" class="plv-iar-questionnaire-default">
    <evaluation-landing
      v-if="evaluationStatus === AllStatus.isShowLanding"
      :is-force-start="isForceStart"
      @re-test="reTest"
    />
    <evaluation-question
      v-if="evaluationStatus === AllStatus.isShowQuestion"
      :questionnaire="questionnaire"
      :submit-disabled="isSubmitting"
      :is-web-view="isWebView"
      @submit="onClickSubmit"
    />
    <evaluation-answer
      v-if="evaluationStatus === AllStatus.isShowAnswer"
      :answer-result="evaluationAnswerResult"
      @re-test="reTest"
      @close="$emit('to-hide')"
    />
  </div>
</template>

<script>
import EvaluationQuestion from '../../components/evaluation-questionnaire/question/MobileEvaluationQuestion';
import EvaluationAnswer from '../../components/evaluation-questionnaire/answer/MobileEvaluationResult';
import EvaluationLanding from '../../components/evaluation-questionnaire/landing/MobileEvaluationLanding';

import mixin from '../questionnarie/mixin';
import evaluationMixin from './mixin';

export default {
  components: {
    EvaluationQuestion,
    EvaluationAnswer,
    EvaluationLanding
  },

  mixins: [mixin, evaluationMixin],
};
</script>
<style lang="scss" scoped>
.plv-iar-questionnaire-default {
  height: 100%;
}
</style>
