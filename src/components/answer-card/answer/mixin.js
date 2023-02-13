import basicMixin from '../../../assets/mixins/basic';
import questionMixin from '../../../assets/mixins/answer-card/question';

export default {
  mixins: [basicMixin, questionMixin],

  props: {
    questionResult: {
      type: Object,
      default: null,
    },
  },

  computed: {
    question() {
      return this.questionResult.content;
    },

    options() {
      return this.questionResult.content.options;
    },

    answer() {
      return this.questionResult.content.answer;
    },

    selfAnswer() {
      return this.questionResult.result.selfAnswer;
    },
  },

  methods: {
    // 正确答案
    isRightOption(index) {
      const value = this.getOptionChar(index);
      const answerArr = this.answer ? this.answer.split('') : [];

      return answerArr && (answerArr.indexOf(value) !== -1);
    },

    // 选错了的答案
    isWrongChoice(index) {
      const value = this.getOptionChar(index);
      const question = this.question;

      // 自己未提交答案，所以肯定不是错选答案
      if (!this.selfAnswer) {
        return false;
      }

      const rightOptions = question && question.answer && question && question.answer.split('');

      return rightOptions.indexOf(value) === -1 && this.selfAnswer.indexOf(value) !== -1; // 自己选了，但不是正确答案
    },

    // 某选项选择人数
    getOptionSubmitCount(index) {
      return this.questionResult.result.singleResult[index];
    },

    // 人数占总提交人数百分比
    getPercent(index) {
      const num = this.getOptionSubmitCount(index);
      const total = this.questionResult.result.total || 0;
      if (total === 0) { return 0; }
      return (num / total * 100).toFixed(2);
    },
  },
};
