<!-- @file 移动端答题卡-非快速问答。 -->

<template>
  <div class="plv-iar-answer-card-default">
    <question
      v-if="question && status === AllStatus.isShowQuestion"
      :question="question"
      :left-time="leftTime"
      :submit-disabled="isSubmitting || (isLimitTimeQuestion && !leftTime)"
      @submit="onClickSubmit"
    />
    <result
      v-else-if="status === AllStatus.isShowResult || status === AllStatus.isShowAnswer"
      :status="status"
      :question-result="questionResult"
      @check-answer="onCheckAnswer"
      @close="onClose"
    />
  </div>
</template>

<script>
import Question from '../../../components/answer-card/question/MobileQuestion';
import Result from '../../../components/answer-card/result/MobileResult';
import mixin from './mixin';

export default {
  components: {
    Question,
    Result,
  },

  mixins: [mixin],

  methods: {
    // 查看答案
    onCheckAnswer() {
      this.status = this.AllStatus.isShowAnswer;
    },

    // 从查看答案返回到查看答题正误情况
    backToResult() {
      this.status = this.AllStatus.isShowResult;
    },
  },
};
</script>

<style lang="scss">
.plv-iar-answer-card-default {
  height: 100%;
}
</style>
