import basicMixin from '../basic';

export default {
  mixins: [basicMixin],

  methods: {
    getOptionChar(index) {
      const startCode = 65; // A
      return String.fromCharCode(startCode + index); // 选项值
    },

    getOptionText(question, index) {
      let text = `${this.getOptionChar(index)}. ${question.options[index]}`;
      if (question.tips[index]) {
        text += `（${question.tips[index]}）`;
      }
      return text;
    },

    questionType(question) {
      let typeText = '';
      if (question.type === 'R') {
        typeText = this.iarTrans('answerCard.singleChoice');
      } else if (question.type === 'C') {
        typeText = this.iarTrans('answerCard.multiChoice');
      } else if (question.type === 'S') {
        typeText = this.iarTrans('answerCard.pointsChoice');
      } else if (question.type === 'V') {
        typeText = this.iarTrans('answerCard.voteChoice');
      }

      return typeText;
    }
  },
};
