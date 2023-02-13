<!-- @file 移动端问卷 -->

<template>
  <div class="plv-iar-questionnaire-default">
    <questionnaire-list
      v-if="status === AllStatus.isShowQuestionnaireList"
      :list="qnList"
      @choose-questionnaire="chooseQuestionnaire"
    />
    <div v-else-if="questionnaire || rankQuestionnaireId" class="plv-iar-questionnaire-default">
      <question
        v-if="status === AllStatus.isShowQuestion"
        ref="question"
        :questionnaire="questionnaire"
        :socket-connected="socketConnected"
        :submit-disabled="isSubmitting"
        :is-web-view="isWebView"
        @submit="onClickSubmit"
        @to-link="$emit('to-link', $event)"
        @countdown-finish="countdownFinish"
      />
      <answer
        v-else-if="status === AllStatus.isShowAnswer"
        :question-result="questionResult"
        @close="$emit('to-hide')"
      />
      <countdown-end
        v-else-if="status === AllStatus.isShowCountdownEnd"
        :question-result="questionResult"
        @click-know="$emit('to-hide')"
        @close="$emit('to-hide')"
      />
      <result-rank
        v-else-if="status === AllStatus.isShowResultRank"
        :question-rank="questionRank"
        :user-rank="userRankInfo"
        @click-know="$emit('to-hide')"
        @close="$emit('to-hide')"
      />
      <status-icon
        :status="status"
        :all-status="AllStatus"
        :result="questionResult"
        :rank="questionRank"
        :first-show="isFirstShowIcon"
        @change-status="onClickStatusIcon"
      />
    </div>
  </div>
</template>

<script>
import Question from '../../components/questionnaire/question/MobileQuestion';
import Answer from '../../components/questionnaire/answer/MobileAnswer';
import ResultRank from '../../components/questionnaire/result-rank/MobileResultRank';
import StatusIcon from '../../components/questionnaire/status-icon/PcStatusIcon';
import CountdownEnd from '../../components/questionnaire/countdown-end/MobileCountdownEnd';
import QuestionnaireList from '../../components/questionnaire/questionnaire-list/MobileQuestionnaireList';

import mixin from './mixin';

export default {
  components: {
    QuestionnaireList,
    Question,
    Answer,
    StatusIcon,
    ResultRank,
    CountdownEnd
  },

  mixins: [mixin],
};
</script>
<style lang="scss" scoped>
.plv-iar-questionnaire-default {
  height: 100%;
}
</style>
