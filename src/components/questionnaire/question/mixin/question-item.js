import basicMixin from '../../../../assets/mixins/basic';
import { optionChar, keyboardFix } from '../../../../assets/utils/utils';

export default {
  mixins: [basicMixin],
  props: {
    question: {
      type: Object,
      required: true,
    },
    index: {
      type: [Number, String],
      default: 0
    },
    answer: {
      type: String,
      default: ''
    },
    isWebView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      values: null,
      // 五星评分当前选择的下标
      curStarIndex: -1,
      // 10分评分当前选择的下标
      curCircleIndex: -1,
      titleStatus: 'expand',
      isTitleOverflow: false
    };
  },
  watch: {
    values() {
      let selectedAnswer = this.values;
      const type = this.question.type;
      if (type === 'C') {
        selectedAnswer = this.values.join('');
      } else if (type === 'X' || type === 'S') {
        selectedAnswer = this.values > 0 ? String.fromCharCode(64 + this.values) : '';
      }
      this.$emit('select', {
        questionId: this.question.questionId,
        answer: selectedAnswer
      });
    },
    question() {
      if (this.question.type === 'D' && this.isMobile) {
        this.checkTitleHeight();
      }
    },
  },
  mounted() {
    // 当题目为多选题时
    if (this.question.type === 'C') {
      this.values = [];
    }
    if (this.question.type === 'D' && this.isMobile) {
      this.checkTitleHeight();
    }
  },
  methods: {
    optionChar,
    keyboardFix,
    checkTitleHeight() {
      this.$nextTick(() => {
        const lineHeight = 24;
        const titleHeight = this.$refs.questionTitle.offsetHeight;
        if (titleHeight > lineHeight * 3) {
          this.isTitleOverflow = true;
          this.titleStatus = 'contract';
        } else {
          this.isTitleOverflow = false;
          this.titleStatus = 'expand';
        }
      });

    },
    changeTitleStatus() {
      if (this.titleStatus === 'expand') {
        this.titleStatus = 'contract';
      } else {
        this.titleStatus = 'expand';
      }
    },
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
    onBlur() {
      if (this.isWebView) {
        this.keyboardFix();
      }
    },
    slectOption(optionIndex) {
      const answer = optionChar(optionIndex);
      this.$emit('select', answer);
    }
  }
};
