<!-- 答题卡 pc 端 demo -->

<template>
  <div>
    <!-- 普通答题 -->
    <modal
      :title="answerCardTitle"
      :visible="isShowAnswerCard"
      :has-back-btn="status === 'isShowAnswer'"
      @back="onClickBack"
      @close="onSetAnswerCardVisible(false)"
    >
      <answer-card
        ref="answerCard"
        :answer-card-sdk="answerCardSdk"
        :lang="lang"
        :enable-sound-effects="true"
        :delay-time="0"
        @to-show="onSetAnswerCardVisible(true)"
        @to-hide="onSetAnswerCardVisible(false)"
        @status-changed="onStatusChanged"
        @success-submit="onSuccessSubmit"
      />
    </modal>
  </div>
</template>

<script>
import AnswerCard from '../../entry/answer-card/normal/MobileAnswerCard';
import Modal from '../demo-modal/MobileModal';
import mixin from './mixin';

export default {
  components: {
    Modal,
    AnswerCard,
  },

  mixins: [mixin],

  data() {
    return {
      // 答题卡状态
      status: '',
    };
  },

  computed: {
    answerCardComp() {
      return this.$refs.answerCard;
    },
  },

  methods: {
    onStatusChanged(status) {
      this.status = status;
      if (status === 'isShowQuestion') {
        this.answerCardTitle = '答题卡';
      } else if (status === 'isShowResult') {
        this.answerCardTitle = this.answerCardSdk.curSubmittedAnswer ? '答题结果' : '未作答';
      } else if (status === 'isShowAnswer') {
        this.answerCardTitle = this.answerCardSdk.curSubmittedAnswer ? '查看答案' : '未作答';
      }
    },

    onClickBack() {
      const answerCardComp = this.$refs.answerCard;
      answerCardComp && answerCardComp.backToResult();
    },
  }
};
</script>
