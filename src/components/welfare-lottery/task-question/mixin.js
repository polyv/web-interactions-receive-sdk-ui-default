import mixin from '../mixin';
import { showToast } from '../../../assets/utils/toast';
import { ynToBool } from '@polyv/utils/src/boolean';
import Countdown from '@polyv/utils/src/countdown';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
import { randomSecond } from '@/assets/utils/utils';

const STEPS = {
  READY: 'ready',
  ANSWER: 'answer'
};
export default {
  mixins: [mixin],
  data() {
    return {
      STEPS,
      tabIndex: 0,
      currentStep: STEPS.READY,
      lotteryQuestionStatus: {},
      remainingTime: 0,
      countDownTimer: null,
    };
  },
  props: {
    isAppleMod: {
      type: Boolean,
      default: false
    },
    modalBgImg: {
      type: String,
      default: ''
    },
    welfareLotterySdk: {
      type: Object,
      required: true,
    },
    prize: {
      type: Object,
      default: () => ({})
    },
    // 已观看分钟数
    watchedTime: {
      type: Number,
      default: 0
    },
    // 是否能进行抽奖任务
    eligible: {
      type: Boolean,
      default: true,
    },
    isQuestionCondition: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lotteryPrize() {
      const item = Object.assign({}, this.prize.lotterys[this.tabIndex]);
      item.viewerSize = this.lotteryQuestionStatus.joinCount;
      item.lotteryCondition = this.prize.lotteryCondition;
      return item;
    },
    isCompleted() {
      return this.lotteryQuestionStatus?.answeredCount === this.prize.questionCount || !this.isQuestionnaireRunning;
    },
    // 聊天室问卷是否进行中
    isQuestionnaireRunning() {
      return ynToBool(this.lotteryQuestionStatus?.questionnaireRunning || 'N');
    },
    btnText() {
      let text = 'welfareLottery.starQuestion';
      const { currentTime, answeredCount } = this.lotteryQuestionStatus;
      if (this.lotteryQuestionStatus?.answeredCount === this.prize.questionCount) {
        text = 'welfareLottery.finishQuestion';
      } else if (answeredCount !== 0 || currentTime) {
        // 继续答题
        text = 'welfareLottery.continueQuestion';
      }
      return text;
    },
    // 有没有下一题
    hasNexQuestion() {
      return this.lotteryQuestionStatus.answeredCount < this.lotteryQuestionStatus.questionnaireContent?.questions?.length;
    }
  },
  async mounted() {
    this.initScrollHandle();
    this.bindEvents();
    this.getLotteryQuestionStatus();
  },
  [BEFORE_DESTROY]() {
    this.clearCountdownTime();
    this.unbindEvents();
  },
  methods: {
    bindEvents() {
      const { events } = this.welfareLotterySdk;
      this.welfareLotterySdk
        .on(events.ADD_QUESTION_FOR_LOTTERY, this.addQuestionHandler);
    },
    unbindEvents() {
      const { events } = this.welfareLotterySdk;
      this.welfareLotterySdk
        .off(events.ADD_QUESTION_FOR_LOTTERY, this.addQuestionHandler);
    },
    async getLotteryQuestionStatus() {
      const res = await this.welfareLotterySdk.getLotteryQuestionStatus();
      this.lotteryQuestionStatus = res.data;
      this.remainingTime = Math.floor(this.lotteryQuestionStatus.currentTime / 1000) || 0;
      this.initCountdownTimer();
    },
    initCountdownTimer() {
      const questionId = this.lotteryQuestionStatus.answeringQuestionId;
      if (!questionId) return;
      this.countDownTimer = new Countdown(this.remainingTime, this.getRemainingTime);
      this.countDownTimer.start();
    },
    getRemainingTime(obj) {
      this.remainingTime = Math.round(obj.totalMsecs / 1000);
      if (this.remainingTime === 0) {
        this.clearCountdownTime();
      }
    },
    clearCountdownTime() {
      this.countDownTimer && this.countDownTimer.stop();
      this.countDownTimer = null;
    },
    // 提交答案后
    sendAnswerOver(isRight) {
      this.clearCountdownTime();
      this.lotteryQuestionStatus.answeredCount++;
      if (isRight) {
        this.lotteryQuestionStatus.rightCount++;
      }
    },
    // PC端点击-奖品tab居中
    initScrollHandle() {
      if (!this.$refs.prizeTab) return;
      this.$refs.prizeTab.addEventListener('click', (e) => {
        e.target.scrollIntoView({ inline: 'center' });
      });
    },
    async startQuestion() {
      if (this.isCompleted) return;
      if (!this.hasNexQuestion) {
        const { answeredCount } = this.lotteryQuestionStatus;
        if (answeredCount !== 0) {
          const questions = this.lotteryQuestionStatus.questionnaireContent.questions;
          this.lotteryQuestionStatus.answeringQuestionId = questions[answeredCount - 1].questionId;
          this.$nextTick(async () => {
            await this.$refs.answerQuestion.readQuestionResult();
            this.currentStep = this.STEPS.ANSWER;
          });
        }
        return;
      }
      const res = await this.welfareLotterySdk.startQuestion();
      if (res?.data?.questionId) {
        this.lotteryQuestionStatus.answeringQuestionId = res.data.questionId;
        const time = this.lotteryQuestionStatus.questionnaireContent.questions[0].time;
        this.remainingTime = Math.floor(time / 1000) || 0;
      }
      this.initCountdownTimer();
      this.$nextTick(() => {
        this.currentStep = this.STEPS.ANSWER;
        this.$refs.answerQuestion && this.$refs.answerQuestion.showQuestion();
      });
    },
    addQuestionHandler(msg) {
      this.lotteryQuestionStatus.questionnaireContent.questions.push({
        name: msg.name,
        options: msg.options,
        questionId: msg.questionId,
        type: msg.type
      });
      setTimeout(() => {
        this.nextQuestion();
      }, randomSecond(0, 2) * 1000);
    },
    handleClose() {
      this.$emit('close');
    },
    handleRecord() {
      this.$emit('record');
    },
    readPrize() {
      this.currentStep = this.STEPS.READY;
      this.clearCountdownTime();
      this.getLotteryQuestionStatus();
    },
    finishAllQuestion() {
      this.lotteryQuestionStatus.rightCount++;
    },
    nextQuestion() {
      if (this.currentStep === this.STEPS.READY) {
        showToast({
          text: this.iarTrans('welfareLottery.hasNewQuestionCome')
        });
        return;
      }
      if (!this.countDownTimer) {
        this.startQuestion();
      }
    }
  }
};
