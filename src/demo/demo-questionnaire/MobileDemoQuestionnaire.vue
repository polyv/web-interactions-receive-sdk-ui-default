<template>
  <div>
    <button v-if="showQnListBtn" @click="showList"> 问卷列表 </button>
    <modal
      :title="questionnaireTitle"
      :visible="isShowQuestionnaire"
      :has-back-btn="hasBackBtn"
      @back="onModalReturn"
      @close="onSetQuestionnaireVisible(false)"
    >
      <questionnaire
        ref="questionnaire"
        :questionnaire-sdk="questionnaireSdk"
        :visible="isShowQuestionnaire"
        :lang="lang"
        :delay-time="3000"
        :is-web-view="true"
        @status-changed="onStatusChanged"
        @to-show="onSetQuestionnaireVisible(true)"
        @to-hide="onSetQuestionnaireVisible(false)"
        @success-submit="onSuccessSubmit"
        @to-link="toLink"
        @has-questionnaire="hasQuestionnaire"
      />
    </modal>
  </div>
</template>

<script>
import Questionnaire from '../../entry/questionnarie/MobileQuestionnarie';
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
