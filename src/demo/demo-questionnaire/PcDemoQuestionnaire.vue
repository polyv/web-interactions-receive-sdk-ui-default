<template>
  <div>
    <button v-if="showQnListBtn" @click="showList"> 问卷列表 </button>
    <modal
      draggable
      body-locked
      :title="questionnaireTitle"
      :visible="isShowQuestionnaire"
      :close-on-click-modal="false"
      no-bg
      @close="onSetQuestionnaireVisible(false)"
    >
      <questionnaire
        ref="questionnaire"
        :questionnaire-sdk="questionnaireSdk"
        :visible="isShowQuestionnaire"
        :lang="lang"
        :delay-time="3000"
        @status-changed="onStatusChanged"
        @to-show="onSetQuestionnaireVisible(true)"
        @to-hide="onSetQuestionnaireVisible(false)"
        @success-submit="onSuccessSubmit"
        @has-questionnaire="hasQuestionnaire"
      />
    </modal>
  </div>
</template>

<script>
import Questionnaire from '../../entry/questionnarie/PcQuestionnarie';
import Modal from '../demo-modal/PcModal';

import mixin from './mixin';

export default {
  components: {
    Questionnaire,
    Modal
  },
  mixins: [mixin],
};
</script>
