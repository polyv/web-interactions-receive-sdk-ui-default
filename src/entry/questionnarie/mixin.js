import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/questionnaire';
import { showToast } from '@/assets/utils/toast';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

const AllStatus = {
  isShowQuestionnaireList: 'isShowQuestionnaireList',
  isShowQuestion: 'isShowQuestion',
  isShowResult: 'isShowResult',
  isShowAnswer: 'isShowAnswer',
  isShowLanding: 'isShowLanding',
  isShowCountdownEnd: 'isShowCountdownEnd',
  isShowResultRank: 'isShowResultRank'
};

const QuestionnaireType = {
  EVALUATION: 'evalution'
};

export default {
  langs,

  mixins: [entryMixin],

  props: {
    // 问卷SDK 实例
    questionnaireSdk: {
      type: Object,
      default: null,
    },
    isWebView: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: null
    }
  },

  data() {
    return {
      // 当前显示哪种弹窗
      status: null,
      // 风险测评弹窗显示状态
      evaluationStatus: null,
      // 所有状态
      AllStatus,
      // 问卷类型
      QuestionnaireType,
      // 答题结果
      questionResult: null,
      // 答题结果排行
      questionRank: null,
      // 问卷
      questionnaire: null,
      // 是否提交中
      isSubmitting: false,
      // 是否已经提交
      hasSubmitted: false,
      // socketConnected
      socketConnected: true,
      // 风险测评问卷提交结果
      evaluationAnswerResult: null,
      // 是否第一次显示切换到排行榜icon
      isFirstShowIcon: true,
      // 排行榜问卷id
      rankQuestionnaireId: null,
      // 用户排名信息
      userRankInfo: null,
      // 问卷列表
      qnList: [],
      // 判断是否有问卷
      hasQuestionnaire: false,
      // 第一次获取问卷列表
      firstGetQnList: false,
    };
  },

  created() {
    this.checkQuestionnaireType();
  },
  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },

  watch: {
    questionnaireSdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
      },
    },
    visible: {
      handler(val) {
        if (!val) {
          this.questionnaire = null;
          this.status = null;
        }
      }
    },
    status(val) {
      this.$emit('status-changed', val);
    },
    qnList(newVal, oldVal) {
      if (newVal.length !== oldVal.length && newVal.length > 0) {
        this.hasQuestionnaire = true;
      } else if (newVal.length === 0) {
        this.hasQuestionnaire = false;
      }
    },
    hasQuestionnaire(val) {
      this.$emit('has-questionnaire', val);
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
  },

  methods: {
    bindAppEvents() {
      const questionnaireSdk = this.questionnaireSdk;
      if (this.questionnaireType === 'evaluation') return;
      if (!questionnaireSdk) { return; }
      this.questionnaireSdk.bindSocketIOEvents();
      questionnaireSdk
        .on(questionnaireSdk.events.START_QUESTIONNAIRE, this.setQuestionContent)
        .on(questionnaireSdk.events.SEND_QUESTIONNAIRE_RESULT, this.setQuestionResult)
        .on(questionnaireSdk.events.QUESTIONNAIRE_ACHIEVEMENT, this.setQuestionAchievement)
        .on(questionnaireSdk.events.STOP_QUESTIONNAIRE, this.stopQuestionAnswer)
        .on(questionnaireSdk.events.QUESTIONNAIRE_RANK, this.setQuestionRank)
        .on(questionnaireSdk.socketIOEvents.DISCONNECT, () => {
          this.socketConnected = false;
        })
        .on(questionnaireSdk.socketIOEvents.CONNECT, () => {
          this.socketConnected = true;
          this.isSubmitting = false;
        });

    },

    unbindAppEvents() {
      const questionnaireSdk = this.questionnaireSdk;
      if (!questionnaireSdk) { return; }
      questionnaireSdk
        .off(questionnaireSdk.events.START_QUESTIONNAIRE, this.setQuestionContent)
        .off(questionnaireSdk.events.SEND_QUESTIONNAIRE_RESULT, this.setQuestionResult)
        .off(questionnaireSdk.events.QUESTIONNAIRE_ACHIEVEMENT, this.setQuestionAchievement)
        .off(questionnaireSdk.events.QUESTIONNAIRE_RANK, this.setQuestionRank)
        .off(questionnaireSdk.events.STOP_QUESTIONNAIRE, this.stopQuestionAnswer);
    },

    async chooseQuestionnaire(item) {
      if (item.ossUrl) {
        item.questions = await this.questionnaireSdk.getOssQuestion(item.ossUrl);
      }
      if (item.questionnaireType === 'exam') {
        const { leftTime } = await this.questionnaireSdk.getQnTimer(item.questionnaireId);
        item.keepTime = leftTime;
      }
      this.questionnaire = item;
      this.status = this.AllStatus.isShowQuestion;

      this.isFirstShowIcon = true;
      this.hasSubmitted = false;
      this.questionRank = [];
    },

    async checkQuestionnaireType() {
      if (this.questionnaireType === 'evaluation') {
        this.questionnaire = {
          type: 'evalution'
        };
        this.evaluationStatus = this.AllStatus.isShowLanding;
      }
    },

    // 收到答题开始消息
    async setQuestionContent(msg) {
      // 当前处于答题中，跳过后面的问卷开始事件
      try {
        await this.delay();
      } catch (e) {
        return;
      }
      // 初次收到问卷消息，获取问卷列表
      if (!this.firstGetQnList) {
        this.qnList = await this.questionnaireSdk.getQuestionnaireList();
        this.updateQnList(this.qnList);
      }
      if (this.questionnaire && this.status === this.AllStatus.isShowQuestion) {
        return;
      }
      this.status = this.AllStatus.isShowQuestion;

      this.isFirstShowIcon = true;
      this.hasSubmitted = false;
      this.questionRank = [];

      this.questionnaire = msg;
      this.hasQuestionnaire = true;
      this.toShow();
    },

    // 收到答题结束消息
    async stopQuestionAnswer(msg) {
      this.rejectDelay();
      if (this.status !== this.AllStatus.isShowQuestion) {
        this.showSubmitTips({
          tips: this.iarTrans('questionnaire.endTips'),
          duration: 3000,
          submitStatus: 'time'
        });
      }
      // 结束问卷ID和答题中的问卷ID不一致，跳过后续操作
      if (this.questionnaire && msg.questionnaireId !== this.questionnaire.questionnaireId) {
        return;
      }
      this.toHide();
      this.qnList = this.questionnaireSdk.questionnaireList;
      this.questionnaire = null;
    },

    // 收到答题结果消息
    async setQuestionResult() {
      try {
        await this.delay();
      } catch (e) {}
    },

    // 收到答题结果消息
    async setQuestionAchievement(msg) {
      try {
        await this.delay();
      } catch (e) {}
      this.questionResult = msg;
      this.questionnaire = {
        questionnaireId: msg.questionnaireId,
        questionnaireTitle: msg.questionnaireTitle,
        questions: msg.questions,
      };
      if (this.rankQuestionnaireId === msg.questionnaireId && this.status === this.AllStatus.isShowResultRank) {
        this.$set(this.questionResult, 'isShowRankIcon', true);
        this.$set(this.questionRank, 'isShowQuestionIcon', true);
      } else {
        this.status = this.AllStatus.isShowAnswer;
        this.$emit('to-show', msg);
      }
    },

    // 提交答案
    async onClickSubmit(selectedOptions) {
      if (this.questionnaire.type === QuestionnaireType.EVALUATION) {
        const res = await this.questionnaireSdk.commitEvaluationAnswer(this.questionnaire, selectedOptions, this.isMock);
        this.handleEvaluationRes(res);
        return;
      }
      // 断网情况下，不提交
      if (!this.socketConnected) {
        this.showFailSubmitTips(this.iarTrans('questionnaire.networkError'));
        return;
      }
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      try {
        const res = await this.questionnaireSdk.answerQuestion(selectedOptions, this.questionnaire.questionnaireId);
        this.handleSubmitRes(res);
      } catch (e) {
        this.handleSubmitRes(e);
      } finally {
        this.$refs.question && this.$refs.question.clear();
        if (!this.hasSubmitted) {
          this.toHide();
        }
        this.hasSubmitted = true;
        this.isSubmitting = false;
        this.qnList = this.questionnaireSdk.questionnaireList;
        this.questionnaire = null;
      }
    },

    handleEvaluationRes(res) {
      if (res.code !== 200) {
        showToast({
          tips: this.iarTrans('questionnaire.submitFail'),
          duration: 2000,
          mountNode: '.plv-iar-questionnaire-default'
        });
        return;
      }
      this.evaluationAnswerResult = res.data;
      this.evaluationStatus = this.AllStatus.isShowAnswer;
      this.$emit('evaluation-result', res.data);
      this.$emit('success-submit');
    },

    handleSubmitRes(res) {
      const answerQuestionResCode = this.questionnaireSdk.answerQuestionResCode;
      switch (res.code) {
        // 答题成功
        case answerQuestionResCode.SubmitSuccess: {
          this.showSubmitTips({
            tips: this.iarTrans('questionnaire.submitSuccess'),
            duration: 2000,
          });
          this.$emit('success-submit');
          break;
        }
        // 问卷结束
        case answerQuestionResCode.Stop: {
          this.showFailSubmitTips(this.iarTrans('questionnaire.endTips'));
          break;
        }
        // 已提交过答案
        case answerQuestionResCode.Submitted: {
          this.showFailSubmitTips(this.iarTrans('questionnaire.submittedTips'));
          break;
        }
        default: {
          this.showFailSubmitTips(this.iarTrans('questionnaire.submitFail'));
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

    async reTest() {
      const res = await this.questionnaireSdk.getEvaluationContent(this.isMock);
      this.questionnaire = res;
      if (!this.questionnaire) {
        showToast({
          tips: '获取风险测评问卷失败',
          duration: 2000,
          mountNode: '.plv-iar-questionnaire-default'
        });
      }
      this.evaluationStatus = this.AllStatus.isShowQuestion;
    },

    countdownFinish() {
      if (!this.hasSubmitted) {
        this.hasSubmitted = true;
        this.$refs.question && this.$refs.question.onSubmitAnswer(true);
        this.toHide();
      }
      console.info('倒计时结束');
    },

    // 收到问卷排行榜结果
    async setQuestionRank(res) {
      const { rankResult, questionnaireId } = res;
      this.questionRank = rankResult;
      this.rankQuestionnaireId = questionnaireId;
      const { data } = await this.questionnaireSdk.setCurrentRankDetail(questionnaireId);
      this.userRankInfo = data;

      try {
        await this.delay();
      } catch (e) {}

      // 当前展示结果页, 且为同一问卷时, 展示切换按钮
      if (this.status === AllStatus.isShowAnswer && this.questionnaire?.questionnaireId === questionnaireId) {
        this.$set(this.questionResult, 'isShowRankIcon', true);
        this.$set(this.questionRank, 'isShowQuestionIcon', true);
      } else {
        this.status = AllStatus.isShowResultRank;
        this.toShow();
      }
    },

    onClickStatusIcon(status) {
      this.isFirstShowIcon = false;
      this.status = status;
    },
    toShow() {
      this.$emit('to-show');
    },
    toHide() {
      this.status = null;
      this.questionnaire = null;
      this.$emit('to-hide');
    },
    // 对外提供打开列表方法
    async showList() {
      this.status = AllStatus.isShowQuestionnaireList;
      this.toShow();
      this.qnList = await this.questionnaireSdk.getQuestionnaireList();
      this.updateQnList(this.qnList);
      // 清空当前问卷内容
      this.questionnaire = null;
    },
    updateQnList(list) {
      this.$emit('update-qn-list', list);
    }
  },
};
