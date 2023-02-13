import basicMixin from '../../../assets/mixins/basic';
import questionMixin from '../../../assets/mixins/answer-card/question';

export default {
  mixins: [basicMixin, questionMixin],

  props: {
    question: {
      type: Object,
      default: null,
    },
    submitDisabled: {
      type: Boolean,
    },
    leftTime: {
      type: Number,
    }
  },

  data() {
    return {
      selectedOptions: [],
    };
  },

  watch: {
    leftTime() {
      // 倒计时结束，已选题目答案但未提交，自动提交
      if (this.leftTime <= 0 && this.selectedOptions && this.selectedOptions.length) {
        this.submitAnswer();
      }
    },
  },

  methods: {
    submitAnswer() {
      this.$emit('submit', this.selectedOptions);
    },

    handleRadioChange(e) {
      this.selectedOptions = [e.target.value];
    },
  },
};
