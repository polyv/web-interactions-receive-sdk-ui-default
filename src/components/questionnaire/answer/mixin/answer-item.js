import basicMixin from '../../../../assets/mixins/basic';
import { optionChar } from '../../../../assets/utils/utils';
export default {
  mixins: [basicMixin],
  props: {
    index: {
      type: Number,
      required: true
    },
    answer: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      options: [],
      right: []
    };
  },
  computed: {
    isScore() {
      return this.answer.scoreEnabled === 'Y';
    },
    starOrScoreAmount() {
      return this.answer.type === 'X' || this.answer.type === 'S' ? this.answer.answer.charCodeAt() - 64 : 0;
    },
  },
  mounted() {
    this.formatOptions();
  },
  methods: {
    optionChar,
    formatQName(index, question) {
      const name = question.name.replace(/\n/g, '</br>');
      return `${index + 1}.${this.questionType(question)} ${name}`;
    },
    questionType(question) {
      let typeText = '';
      if (question.type === 'R') {
        typeText = this.iarTrans('questionnaire.singleChoice');
      } else if (question.type === 'C') {
        typeText = this.iarTrans('questionnaire.multiChoice');
      } else if (question.type === 'Q') {
        typeText = this.iarTrans('questionnaire.askQuestion');
      } else if (question.type === 'X' || question.type === 'S') {
        typeText = this.iarTrans('questionnaire.evaluate');
      } else if (question.type === 'J') {
        typeText = this.iarTrans('questionnaire.judgement');
      }

      return typeText;
    },
    getOptionClass(isRight, isSelected) {
      let optionCls = '';
      // 非得分题目自己选择是selected or 得分题的正确选项
      if (this.isScore && isRight) {
        optionCls = 'selected';
      }
      if (isSelected) {
        optionCls = !this.isScore ? 'selected' : (isRight ? 'right' : 'wrong');
      }

      return optionCls;
    },
    formatOptions() {
      const { total, answerResult, rightAnswer, answer } = this.answer;

      this.options = this.answer.options.map((item, index) => {
        const selectUserNum = answerResult[index];
        const optionChar = String.fromCharCode(65 + index);
        const isSelected = answer.toLocaleUpperCase().split('').includes(optionChar);
        const isRight = rightAnswer.toLocaleUpperCase().split('').includes(optionChar);
        isRight && this.right.push(optionChar);

        const optionCls = this.getOptionClass(isRight, isSelected);
        return {
          index,
          value: item,
          selectUserNum,
          ratio: total ? (selectUserNum / total * 100).toFixed(2) + '%' : '0.00%',
          isSelected,
          isRight,
          optionCls
        };
      });
    },
  },
};
