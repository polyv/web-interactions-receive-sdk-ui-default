import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/answer-card';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  langs,

  mixins: [entryMixin],

  props: {
    // 答题卡 SDK 实例
    answerCardSdk: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      // 题目数据
      question: null,
      // 已选选项
      selectedOptions: [],
      // 重试提交答案定时器
      retryTimer: null,
      // 重试提交答案次数
      retryTimes: 0,
      // 提交中
      isSubmitting: false,
    };
  },

  watch: {
    answerCardSdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
      },
    },
  },

  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },

  methods: {
    // 清除题目数据
    clear() {
      this.selectedOptions = [];
      this.retryTimes = 0;
      this.question = null;
    },

    // 提交答案
    async toAnswerQuestion() {
      this.isSubmitting = true;
      try {
        this.setRetryTimer();
        const res = this.answerCardSdk && (await this.answerCardSdk.answerQuestion(this.selectedOptions));
        this.clearRetryTimer();
        this.handleSubmitRes(res);
      } catch (e) {
        console.warn(e);
        this.showFailSubmitTips(this.iarTrans('answerCard.submitFailedTips'));
      } finally {
        this.$emit('to-hide', this.question);
        this.isSubmitting = false;
      }
    },

    handleSubmitRes(res) {
      const answerQuestionResCode = this.answerCardSdk.answerQuestionResCode;
      switch (res.code) {
        // 答题成功
        case answerQuestionResCode.SubmitSuccess: {
          this.showSubmitTips({
            tips: this.iarTrans('answerCard.submitSuccessTips'),
            duration: 2000,
          });
          this.$emit('success-submit');
          break;
        }
        // 头像非法，回答被忽略
        case answerQuestionResCode.Ignore: {
          this.showFailSubmitTips(this.iarTrans('answerCard.ignoreTips'));
          break;
        }
        // 提交时答题已结束
        case answerQuestionResCode.End: {
          this.showFailSubmitTips(this.iarTrans('answerCard.endTips'));
          break;
        }
        // 已回答过
        case answerQuestionResCode.Success: {
          this.showFailSubmitTips(this.iarTrans('answerCard.successTips'));
          break;
        }
        default: {
          this.showFailSubmitTips(this.iarTrans('answerCard.submitFailedTips'));
        }
      }
    },

    showFailSubmitTips(tips) {
      this.showSubmitTips({
        tips: tips,
        duration: 2000,
        submitStatus: 'fail',
      });
    },

    // 重试提交答案。5秒一次，重试达3次后显示错误提示并停止重试
    setRetryTimer() {
      this.clearRetryTimer();
      this.retryTimer = setTimeout(() => {
        if (this.retryTimes < 3) {
          this.toAnswerQuestion();
          this.retryTimes += 1;
          this.setRetryTimer();
        } else {
          this.$emit('to-hide', this.question);
          this.showFailSubmitTips(this.iarTrans('answerCard.submitFailedTips'));
        }
      }, 5000);
    },

    // 清除重试定时器
    clearRetryTimer() {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    },
  },
};
