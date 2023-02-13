import basicMixin from '../../../assets/mixins/basic';
import questionMixin from '../../../assets/mixins/answer-card/question';

export default {
  mixins: [basicMixin, questionMixin],

  props: {
    questionResult: {
      type: Object,
      default: null,
    },
    // 当前显示哪种弹窗
    status: {
      type: String,
    },
  },

  computed: {
    question() {
      return this.questionResult.content;
    },

    result() {
      return this.questionResult.result;
    },
  },

  methods: {
    confirm() {
      this.$emit('close');
    },

    onClickCheckAnswer() {
      this.$emit('check-answer');
    },
  },
};
