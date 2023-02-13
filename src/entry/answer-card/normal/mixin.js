import commonMixin from '../common-mixin';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
const AllStatus = {
  isShowQuestion: 'isShowQuestion',
  isShowResult: 'isShowResult',
  isShowAnswer: 'isShowAnswer',
};

export default {
  mixins: [commonMixin],

  props: {
    answerCardSdk: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      // 当前显示哪种弹窗
      status: null,
      // 所有状态
      AllStatus,
      // 答题结果
      questionResult: null,
      // 答题剩余时间
      leftTime: null,
      // 限时题目定时器
      localLeftTimer: null,
      // 服务端时间同步定时器
      serverLeftTimer: null,
    };
  },

  computed: {
    isLimitTimeQuestion() {
      return !!this.question.duration;
    },
  },

  watch: {
    status() {
      this.$emit('status-changed', this.status);
    },
  },

  [BEFORE_DESTROY]() {
    this.clearDurationTimer();
  },

  methods: {
    bindAppEvents() {
      const answerCardSdk = this.answerCardSdk;
      if (!answerCardSdk) { return; }
      answerCardSdk.on(answerCardSdk.events.GET_TEST_QUESTION_CONTENT, this.onQuestionContent);
      answerCardSdk.on(answerCardSdk.events.STOP_TEST_QUESTION, this.onStopQuestion);
      answerCardSdk.on(answerCardSdk.events.GET_TEST_QUESTION_RESULT, this.onQuestionResult);
    },

    unbindAppEvents() {
      const answerCardSdk = this.answerCardSdk;
      if (!answerCardSdk) { return; }
      answerCardSdk.off(answerCardSdk.events.GET_TEST_QUESTION_CONTENT, this.onQuestionContent);
      answerCardSdk.off(answerCardSdk.events.STOP_TEST_QUESTION, this.onStopQuestion);
      answerCardSdk.off(answerCardSdk.events.GET_TEST_QUESTION_RESULT, this.onQuestionResult);
    },

    // 收到答题开始消息
    async onQuestionContent(msg) {
      if (msg.itemType !== this.answerCardSdk.questionItemTypes.Normal) {
        // 快速答题不在此处理
        return;
      }

      // 限时题目，先开始计时。但是显示上进行主动延迟。
      if (msg.duration) {
        this.leftTime = msg.duration;
        this.setDurationTimer();
      }

      try {
        await this.delay();
      } catch (e) {
        return;
      }

      this.clear();
      this.question = msg;
      this.status = this.AllStatus.isShowQuestion;
      this.$emit('to-show', msg);
    },

    // 收到答题结束消息
    async onStopQuestion(msg) {
      if (msg.itemType !== this.answerCardSdk.questionItemTypes.Normal) {
        // 快速答题不在此处理
        return;
      }
      this.rejectDelay();

      this.clear();
      if (msg.duration) {
        this.clearDurationTimer();
      }
      this.$emit('to-hide');
    },

    // 收到答题结果消息
    async onQuestionResult(msg) {
      try {
        await this.delay();
      } catch (e) {}

      this.status = this.AllStatus.isShowResult;
      this.questionResult = msg;
      this.$emit('to-show', msg);
    },

    async onClickSubmit(selectedOptions) {
      this.selectedOptions = selectedOptions;
      await this.toAnswerQuestion();
      this.clearDurationTimer();
    },

    // 设置答题倒计时
    setDurationTimer() {
      this.localLeftTimer = setInterval(this.updateLocalTime, 1000);
      this.serverLeftTimer = setInterval(this.synchronizeServerTime, 5000);
    },

    // 清除答题倒计时
    clearDurationTimer() {
      clearInterval(this.localLeftTimer);
      this.localLeftTimer = null;
      clearInterval(this.serverLeftTimer);
      this.serverLeftTimer = null;
    },

    updateLocalTime() {
      if (this.leftTime >= 1) {
        this.leftTime -= 1;
      } else {
        this.clearDurationTimer();
        this.$emit('to-hide');
      }
    },

    // 同步服务端倒计时
    async synchronizeServerTime() {
      try {
        const data = await this.answerCardSdk.getServerTime();
        this.leftTime = data.time;
      } catch (e) {
        console.warn(e);
      }
    },

    onClose() {
      this.$emit('to-hide');
    },
  },
};
