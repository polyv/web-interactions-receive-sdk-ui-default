import basicMixin from '../../../assets/mixins/basic';
import { optionChar } from '../../../../assets/utils/utils';
export default {
  mixins: [basicMixin],
  methods: {
    optionChar,
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

  },
};
