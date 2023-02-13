<template>
  <div>
    <modal
      draggable
      body-locked
      :title="questionnaireTitle"
      :visible="visible"
      :close-on-click-modal="false"
      no-bg
      @close="hideEvaluation"
    >
      <evaluation-questionnaire
        :questionnaire-sdk="questionnaireSdk"
        :questionnaire-type="'evaluation'"
        :is-force-start="isForceStart"
        :lang="lang"
        :delay-time="3000"
        @status-changed="onStatusChanged"
        @to-hide="$emit('hideEvaluation')"
      />
    </modal>
  </div>
</template>

<script>
import EvaluationQuestionnaire from '../../entry/evaluation-questionnaire/PcEvaluationQuestionnaire.vue';
import Modal from '../demo-modal/PcModal';

import mixin from './mixin';

export default {
  components: {
    EvaluationQuestionnaire,
    Modal
  },
  mixins: [mixin],
};
</script>
