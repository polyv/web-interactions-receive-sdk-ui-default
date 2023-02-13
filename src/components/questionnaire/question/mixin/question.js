import basicMixin from '../../../../assets/mixins/basic';
import { optionChar } from '../../../../assets/utils/utils';
import { showToast } from '@/assets/utils/toast';

const QuestionType = ['C', 'J', 'Q', 'R', 'S', 'X', 'D'];

export default {
  mixins: [basicMixin],
  props: {
    questionnaire: {
      type: Object,
      default: () => {}
    },
    submitDisabled: {
      type: Boolean,
      default: false,
    },
    isWebView: {
      type: Boolean,
      default: false
    },
    socketConnected: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    questionnaire: {
      deep: true,
      immediate: true,
      handler(val) {
        // 调研类型不显示倒计时
        if (val.questionnaireType === 'survey' || val.keepTime === 0) {
          this.countDownTime = -1;
        } else if (val.keepTime > 0) {
          this.countDownTime = val.keepTime;
          // this.countDownTime = 10 * 1000;
        }
      }
    },
    requiredNotFill(val) {
      if (val.length === 0) this.showRequiredTip = false;
    }
  },
  computed: {
    totalScore({ questionnaire }) {
      return questionnaire?.questions.reduce((total, item) => {
        if (item.scoreEnabled === 'Y' && item.score) {
          return total + item.score;
        }
        return total;
      }, 0) ?? 0;
    },

    isExam({ questionnaire }) {
      return questionnaire?.questionnaireType === 'exam';
    },

    requiredNotFill() {
      // 判断必填是否已经选择
      const requiredNotFill = [];
      this.questionnaire?.questions.forEach(question => {
        if (question.required === 'Y') {
          requiredNotFill.push(question.questionId);
          this.answers.some(answer => {
            if (answer.questionId === question.questionId) {
              answer.answer && requiredNotFill.pop();
              return true;
            }
            return false;
          });
        }
      });

      if (this.showPrivacy) {
        requiredNotFill.push('privacy');

        this.privacyEnable && requiredNotFill.pop();
      }

      return requiredNotFill;
    },

    // 是否显示隐私checkbox
    showPrivacy() {
      const privacy = this.questionnaire?.privacy;
      if (privacy) {
        return privacy.required === 'Y' && privacy.content;
      }

      return false;
    },

    questions() {
      return this.questionnaire?.questions.filter(item => QuestionType.includes(item.type));
    },

    QuestionnaireType() {
      return this.$parent.QuestionnaireType;
    }
  },
  data() {
    return {
      answers: [],
      countDownTime: -1,
      showRequiredTip: false,
      curQuestionIndex: 0,
      privacyEnable: false, // 是否同意隐私协议
      cantSelect: false, // 是否可点击选项
      showConfirm: false
    };
  },
  methods: {
    optionChar,
    clear() {
      this.answers = [];
      this.privacyEnable = false;
      this.countDownTime = -1;
      if (this.$refs.countdown) {
        this.$refs.countdown.clearTimer();
      }
    },

    onSubmitAnswer(forceSubmit = false) {
      if (!(this.requiredNotFill.length === 0 || forceSubmit)) {
        this.checkQuestionRequired();
        return;
      }
      if ((this.questionnaire.type === this.QuestionnaireType.EVALUATION) &&
          this.questionnaire.questions.length !== this.answers.length) {
        showToast({
          text: this.iarTrans('questionnaire.finishAnswerThenSubmit'),
          duration: 2000,
          mountNode: '.plv-iar-questionnaire-default'
        });
        return;
      }
      this.$emit('submit', this.answers);
      this.$nextTick(() => {
        this.clear();
      });
    },

    checkQuestionRequired() {
      if (this.requiredNotFill.length === 0) return;
      const item = this.requiredNotFill[0];
      this.showRequiredTip = true;
      if (item !== 'privacy') {
        this.$refs['questionItem-' + item][0].$el.scrollIntoView();
      } else {
        this.$refs.privacyBox.$el.scrollIntoView();
      }
    },

    onSelectOption(answer) {
      let index = -1;
      this.answers.some((item, _index) => {
        if (item.questionId === answer.questionId) {
          index = _index;
          return true;
        }
        return false;
      });
      if (index < 0) {
        this.answers.push(answer);
      } else {
        this.answers.splice(index, 1, answer);
      }
    },
    onEvaluationSelectOption(answer) {
      if (this.cantSelect) return;
      this.cantSelect = true;
      if (this.answers.length === 0 || !this.answers[this.curQuestionIndex]) {
        this.answers.push(answer);
      } else {
        this.answers.splice(this.curQuestionIndex, 1, answer);
      }
      setTimeout(() => {
        if (this.curQuestionIndex < this.questionnaire.questions.length - 1) {
          this.curQuestionIndex += 1;
        }
        this.cantSelect = false;
      }, 300);
    },
    toLink(linkObj) {
      this.$emit('to-link', linkObj);
    },
    countdownFinish() {
      this.$emit('countdown-finish');
    },
    changeTitleIndex(index) {
      if (this.cantSelect) return;
      const length = this.questionnaire.questions.length;
      if (index === 1 && !this.answers[this.curQuestionIndex]) {
        showToast({
          text: this.iarTrans('questionnaire.mustChooseOne'),
          duration: 2000,
          mountNode: '.plv-iar-questionnaire-default'
        });
        return;
      }
      if (this.curQuestionIndex + index > length - 1 || this.curQuestionIndex + index < 0) return;
      this.curQuestionIndex += index;
    },
    goBackBefore() {
      this.showConfirm = true;
    },
    goBack() {
      this.$emit('back');
    }
  }
};
