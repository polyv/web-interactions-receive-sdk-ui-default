import { QuestionAnswer } from '@polyv/interactions-receive-sdk';

export default {
  data() {
    return {
      questionAnswerSdk: null
    };
  },
  mounted() {
    this.questionAnswerSdk = new QuestionAnswer();
  },
};
