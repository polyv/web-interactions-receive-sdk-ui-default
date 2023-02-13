<!-- 答题卡 pc 端 demo -->

<template>
  <div>
    <!-- 普通答题 -->
    <modal
      draggable
      body-locked
      :title="answerCardTitle"
      :no-bg="true"
      :visible="isShowAnswerCard"
      @close="onSetAnswerCardVisible(false)"
    >
      <answer-card
        :answer-card-sdk="answerCardSdk"
        :lang="lang"
        :enable-sound-effects="true"
        @to-show="onSetAnswerCardVisible(true)"
        @to-hide="onSetAnswerCardVisible(false)"
        @status-changed="onStatusChanged"
        @success-submit="onSuccessSubmit"
      />
    </modal>
    <!-- 快速问答 -->
    <modal
      no-bg
      :visible="isQuickShowAnswerCard"
      :title="quickAnswerCardTitle"
      :draggable="true"
      :modal-style="{
        width: '202px',
        minHeight: 'unset',
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.22)',
        border: 'none',
      }"
      :body-locked="false"
      @close="onSetQuickAnswerCardVisible(false)"
    >
      <quick-answer-card
        :lang="lang"
        :enable-sound-effects="true"
        :answer-card-sdk="answerCardSdk"
        @to-show="(question) => onSetQuickAnswerCardVisible(true, question)"
        @to-hide="(question) => onSetQuickAnswerCardVisible(false, question)"
        @success-submit="onSuccessSubmit"
      />
    </modal>
  </div>
</template>

<script>
import AnswerCard from '../../entry/answer-card/normal/PcAnswerCard';
import QuickAnswerCard from '../../entry/answer-card/quick-answer/PcQuickAnswer';
import Modal from '../demo-modal/PcModal';
import mixin from './mixin';

export default {
  components: {
    Modal,
    AnswerCard,
    QuickAnswerCard,
  },

  mixins: [mixin],

  methods: {
    onStatusChanged(status) {
      if (status === 'isShowQuestion') {
        this.answerCardTitle = '答题卡';
      } else if (status === 'isShowResult') {
        this.answerCardTitle = this.answerCardSdk.curSubmittedAnswer ? '答题结果' : '未作答';
      }
    },
  }
};
</script>
