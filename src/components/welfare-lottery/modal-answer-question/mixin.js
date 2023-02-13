
import mixin from '@/components/welfare-lottery/mixin';
import { showToast } from '@/assets/utils/toast';

export default {
  name: 'AnswerQuestion',
  mixins: [mixin],
  props: {
    welfareLotterySdk: {
      type: Object,
    },
    lotteryQuestionStatus: {
      type: [Object, null]
    },
    prize: {
      type: Object,
    },
    remainingTime: {
      type: Number,
      default: 0
    }

  },
  data() {
    return {
      answers: [],
      // 展示题目
      isShowQuestion: true,
      // 展示答题结果
      isShowResult: false,
      // 展示统计结果
      isShowStatistics: false,
      // 回答题目是否正确
      isAnswerRight: false,
      // 当前题目正确答案
      rightAnswer: '',
      // 当前题目回答人数
      answeredCount: '',
      // 当前题目回答正确人数
      rightCount: '',
      // 统计结果
      statisticsResult: [],
      // 防重复提交
      isSubmit: false,
    };
  },
  watch: {
    remainingTime: {
      handler(newVal, oldVal) {
        // 倒计时结束，自动提交。
        if (newVal === 0 && oldVal > 0 && this.isShowQuestion) {
          this.submit(false);
        }
      }
    }
  },
  computed: {
    questionRightOption() {
      const options = this.questions[this.currentQuestionIndex].options;

      const arr = [];
      options.forEach(item => {
        if (this.rightAnswer.includes(item.key)) {
          arr.push({
            label: `${item.key}.${item.value}`,
          });
        }
      });
      return arr;
    },
    questionCount() {
      return this.prize.questionCount;
    },
    questions() {
      return this.lotteryQuestionStatus.questionnaireContent ? this.lotteryQuestionStatus.questionnaireContent.questions : [];
    },
    // 当前第几题（数组下标）
    currentQuestionIndex() {
      const answeringQuestionId = this.lotteryQuestionStatus?.answeringQuestionId;
      if (this.questions.length === 0 || !answeringQuestionId) return -1;
      return this.questions.findIndex(item => item.questionId === answeringQuestionId);
    },
    // 当前题目
    currentQuestion() {
      if (this.questions.length === 0) return;
      const item = this.questions[this.currentQuestionIndex];
      return this.formatQuestion(item);
    },
    questionRate() {
      return Math.floor(((this.currentQuestionIndex + 1) / this.questionCount) * 100) / 100;
    },
    // 答题进度
    questionRateLabel() {
      return `${this.currentQuestionIndex + 1}/${this.questionCount}`;
    },
    // 最少答对 X 题，参与抽奖
    leastCount() {
      return this.prize.minQuestionCount;
    },
    // 继续答对 X 题，参与抽奖
    moreLeastCount() {
      return this.leastCount - this.lotteryQuestionStatus.rightCount;
    },
    time() {
      return this.remainingTime ? this.remainingTime : 0;
    },
    submitBtnText() {
      return this.iarTrans('welfareLottery.answerSubmit') + `(${this.time}s)`;
    },
    resultBtnText() {
      return this.iarTrans('welfareLottery.readResultTotal');
    },
    // 是否回答完所有题目
    isAnswerQuestionOver() {
      return this.currentQuestionIndex + 1 === this.questionCount;
    },
    // 是否展示下一題
    isShowNextQuestion() {
      return this.currentQuestionIndex + 1 < this.questions.length;
    },
    // 底部提示文案
    footerTip() {
      if (this.isAnswerQuestionOver) {
        return this.iarTrans('welfareLottery.findAllQuestion');
      } else if (this.isShowNextQuestion) {
        return this.iarTrans('welfareLottery.readyNextQuestion');
      } else {
        return this.iarTrans('welfareLottery.waitSendQuestion');
      }
    },
    // 满足抽奖条件, 已回答的正确题数 >= 最小需要正确题数
    isSatisfiesLottery() {
      return this.lotteryQuestionStatus.rightCount >= this.leastCount;
    },
    // 回答正确题数
    correctCount() {
      return this.lotteryQuestionStatus.rightCount;
    },
    // 已回答正确题数
    overCorrectCount() {
      return this.lotteryQuestionStatus.rightCount;
    },
    questionTypeLabel() {
      const type = this.currentQuestion.type;
      let typeText = '';
      if (type === 'R') {
        typeText = this.iarTrans('welfareLottery.singleChoice');
      } else if (type === 'C') {
        typeText = this.iarTrans('welfareLottery.multiChoice');
      } else if (type === 'Q') {
        typeText = this.iarTrans('welfareLottery.askQuestion');
      } else if (type === 'X' || type === 'S') {
        typeText = this.iarTrans('welfareLottery.evaluate');
      } else if (type === 'J') {
        typeText = this.iarTrans('welfareLottery.judgement');
      }

      return typeText;
    }
  },
  methods: {
    formatQuestion(item) {
      if (!item) return null;
      return {
        questionId: item.questionId,
        status: 'undefined',
        name: item.name,
        type: item.type,
        answer: '',
        score: 0,
        required: 'Y',
        scoreEnabled: 'N',
        options: item.options.map(item => {
          return item.value;
        }),
        tips: [],
        answerResult: 'undefined',
        total: 'undefined',
        rightAnswer: 'undefined',
        desc: ''
      };
    },
    async readQuestionResult() {
      const res = await this.welfareLotterySdk.getLastAnsweredResult();
      this.isAnswerRight = res.data.result;
      this.rightAnswer = res.data.rightAnswer || '';
      this.answeredCount = res.data.answeredCount;
      this.rightCount = res.data.rightCount;
      this.isShowQuestion = false;
      this.isShowResult = true;
    },
    // normal 是否强制提交答案
    async submit(normal = true) {
      let answer = '';
      this.answers.forEach(item => {
        answer += item.answer.toLowerCase();
      });
      if (answer.length === 0 && normal) {
        showToast({
          text: this.iarTrans('welfareLottery.selectAnswerTip')
        });
        return;
      }
      if (this.isSubmit) {
        return;
      }
      this.isSubmit = true;
      try {
        const res = await this.welfareLotterySdk.sendQuestionAnswer({ answer, questionId: this.currentQuestion.questionId });

        this.isAnswerRight = res.data.result;
        this.rightAnswer = res.data.rightAnswer || '';
        this.answeredCount = res.data.answeredCount;
        this.rightCount = res.data.rightCount;
        this.isShowQuestion = false;
        this.isShowResult = true;
        // this.setLocalAnswer(this.isAnswerRight, this.questionRightOption);
        this.$emit('send-answer', this.isAnswerRight);
        // 最后一题回答
        if (res.data.allQuestionResult) {
          this.isShowQuestion = false;
          this.isShowResult = true;
          // 回答正确，2s自动跳转统计页面
          if (this.isAnswerRight) {
            setTimeout(() => {
              this.isShowResult = false;
              this.isShowStatistics = true;
            }, 2000);
          }
          this.statisticsResult = res.data.allQuestionResult.map(item => item === 'Y');
          return;
        }

        // 答对题目，5秒后自动跳转下一题
        if (this.isAnswerRight && this.isShowNextQuestion) {
          setTimeout(() => {
            this.readyNextQuestion();
          }, 3000);
        }
      } catch (e) {

      } finally {
        this.isSubmit = false;
      }
    },
    // getLocalAnswer() {
    //   const { lotteryId } = this.lotteryQuestionStatus;
    //   return local.getAsJSON(LOTTERY_QUESTIONNAIRE_ANSWER + lotteryId) || {};
    // },
    // setLocalAnswer(result, array) {
    //   const { lotteryId, answeringQuestionId } = this.lotteryQuestionStatus;
    //   const originData = local.getAsJSON(LOTTERY_QUESTIONNAIRE_ANSWER + lotteryId) || {};
    //   const data = {};
    //   data[answeringQuestionId] = { result, array };
    //   local.setAsJSON(LOTTERY_QUESTIONNAIRE_ANSWER + lotteryId, Object.assign(originData, data));
    // },
    // 准备跳转下一题
    readyNextQuestion() {
      this.$emit('next-question');
    },
    showQuestion() {
      this.isShowQuestion = true;
      this.isShowResult = false;
    },
    nextStep() {
      // 答题错误--点击下一题
      if (!this.rightAnswer) {
        this.$emit('next-question');
        this.isShowQuestion = true;
        this.isShowResult = false;
        this.isShowStatistics = false;
        return;
      }
      this.isShowQuestion = false;
      this.isShowResult = false;
      this.isShowStatistics = true;
    },
    readPrize() {
      this.$emit('read-prize');
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
    }
  }
};
