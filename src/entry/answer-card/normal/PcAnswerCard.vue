<!-- @file PC端答题卡-非快速问答。 -->

<template>
  <div>
    <question
      v-if="question && status === AllStatus.isShowQuestion"
      :question="question"
      :left-time="leftTime"
      :submit-disabled="isSubmitting || (isLimitTimeQuestion && !leftTime)"
      @submit="onClickSubmit"
    />
    <result
      v-else-if="status === AllStatus.isShowResult"
      :question-result="questionResult"
      @close="onClose"
    />
  </div>
</template>

<script>
import Question from '../../../components/answer-card/question/PcQuestion';
import Result from '../../../components/answer-card/result/PcResult';
import mixin from './mixin';

export default {
  components: {
    Question,
    Result,
  },

  mixins: [mixin],
};
</script>
