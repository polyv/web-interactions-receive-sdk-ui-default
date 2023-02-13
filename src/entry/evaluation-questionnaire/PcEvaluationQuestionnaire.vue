<!-- @file PC端问卷 -->

<template>
  <div v-if="questionnaire" class="plv-iar-questionnaire-default">
    <evaluation-landing
      v-if="evaluationStatus === AllStatus.isShowLanding"
      :is-force-start="isForceStart"
      @re-test="reTest"
    />
    <evaluation-question
      v-if="evaluationStatus === AllStatus.isShowQuestion"
      ref="question"
      :questionnaire="questionnaire"
      :submit-disabled="isSubmitting"
      @submit="onClickSubmit"
      @link-to="$emit('link-to', $event)"
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
import EvaluationQuestion from '../../components/evaluation-questionnaire/question/PcEvaluationQuestion';
import EvaluationAnswer from '../../components/evaluation-questionnaire/answer/PcEvaluationResult';
import EvaluationLanding from '../../components/evaluation-questionnaire/landing/PcEvaluationLanding';

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
