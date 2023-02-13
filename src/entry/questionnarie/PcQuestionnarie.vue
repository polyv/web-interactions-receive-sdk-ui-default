<!-- @file PC端问卷 -->

<template>
  <div class="plv-iar-questionnaire-default">
    <questionnaire-list
      v-if="status === AllStatus.isShowQuestionnaireList"
      :list="qnList"
      @choose-questionnaire="chooseQuestionnaire"
    />
    <!-- 问卷内容 -->
    <div v-else-if="questionnaire || status === AllStatus.isShowResultRank">
      <div
        v-if="status !== AllStatus.isShowCountdownEnd && status !== AllStatus.isShowResultRank"
        class="plv-iar-questionnaire-title"
        :class="{'plv-iar-questionnaire-title--desc': questionnaire.desc}"
      >
        {{ questionnaire.questionnaireTitle }}
      </div>
      <p v-if="questionnaire && questionnaire.desc && status !== AllStatus.isShowResultRank && status !== AllStatus.isShowCountdownEnd" class="plv-iar-questionnaire-desc">{{ questionnaire.desc }}</p>
      <p v-if="isExam && (status === AllStatus.isShowQuestion || status === AllStatus.isShowAnswer)" class="plv-iar-questionnaire-score">{{ iarTrans('questionnaire.totalScoreLabel') }}：<span>{{ totalScore }}</span> {{ iarTrans('questionnaire.scoreUnit') }}</p>
      <question
        v-if="status === AllStatus.isShowQuestion"
        ref="question"
        :questionnaire="questionnaire"
        :submit-disabled="isSubmitting"
        :socket-connected="socketConnected"
        @submit="onClickSubmit"
        @link-to="$emit('link-to', $event)"
        @countdown-finish="countdownFinish"
        @back="showList"
      />
      <answer
        v-if="status === AllStatus.isShowAnswer"
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
import Question from '../../components/questionnaire/question/PcQuestion';
import Answer from '../../components/questionnaire/answer/PcAnswer';
import CountdownEnd from '../../components/questionnaire/countdown-end/PcCountdownEnd';
import ResultRank from '../../components/questionnaire/result-rank/PcResultRank';
import StatusIcon from '../../components/questionnaire/status-icon/PcStatusIcon';
import QuestionnaireList from '../../components/questionnaire/questionnaire-list/PcQuestionnaireList';

import mixin from './mixin';

export default {
  components: {
    QuestionnaireList,
    Question,
    Answer,
    ResultRank,
    CountdownEnd,
    StatusIcon
  },

  mixins: [mixin],
};
</script>
<style lang="scss" scoped>
.plv-iar-questionnaire-default {
  position: relative;
}
.plv-iar-questionnaire-title {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 22px;
  margin-top: 28px;
  margin-bottom: 24px;
}
.plv-iar-questionnaire-title--desc {
  margin-bottom: 12px;
}
.plv-iar-questionnaire-desc {
  text-align: center;
  font-size: 14px;
  color: #757575;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 12px;
  padding: 0 24px;
}
.plv-iar-questionnaire-score {
  text-align: center;
  font-size: 12px;
  color: #757575;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 12px;
  padding: 0 24px;
  span {
    font-size: 14px;
    color: #366BEE;
  }
}
</style>
