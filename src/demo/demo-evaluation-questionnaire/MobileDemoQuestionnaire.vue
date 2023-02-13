<template>
  <div>
    <modal
      :title="questionnaireTitle"
      :visible="false"
      @close="onSetQuestionnaireVisible(false)"
    >
      <questionnaire
        :questionnaire-type="'evaluation'"
        :questionnaire-sdk="questionnaireSdk"
        :lang="lang"
        :delay-time="3000"
        :is-web-view="true"
        @status-changed="onStatusChanged"
        @to-show="onSetQuestionnaireVisible(true)"
        @to-hide="onSetQuestionnaireVisible(false)"
        @success-submit="onSuccessSubmit"
        @to-link="toLink"
      />
    </modal>
  </div>
</template>

<script>
import Questionnaire from '../../entry/evaluation-questionnaire/MobileEvaluationQuestionnaire';
import Modal from '../demo-modal/MobileModal';

import mixin from './mixin';

export default {
  components: {
    Questionnaire,
    Modal
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-iar-popup-default {
  border-bottom: 1px solid #333;
}
</style>
