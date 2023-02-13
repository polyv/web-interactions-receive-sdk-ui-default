<template>
  <div class="plv-demo-question-answer">
    <QuestionAnswer :question-answer-sdk="questionAnswerSdk" />
  </div>
</template>

<script>
import mixin from './mixin';
import QuestionAnswer from '../../entry/question-answer/MobileQuestionAnswer';
export default {
  components: {
    QuestionAnswer
  },

  mixins: [mixin],

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss">
.plv-demo-question-answer {
  width: auto;
  position: relative;
  height: 400px;
  overflow: auto;
}

</style>
