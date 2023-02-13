import { AnswerCard } from '@polyv/interactions-receive-sdk';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      // 答题卡 SDK 实例
      answerCardSdk: null,
      // 是否展示答题卡
      isShowAnswerCard: false,
      // 答题卡标题
      answerCardTitle: '',
      // 是否展示快速答题
      isQuickShowAnswerCard: false,
      // 快速问答弹窗标题
      quickAnswerCardTitle: '',

      isShowAppAnswerCard: false
    };
  },

  created() {
    this.answerCardSdk = new AnswerCard();
  },

  [BEFORE_DESTROY]() {
    this.destroy();
  },

  methods: {
    onSetAnswerCardVisible(isShowAnswerCard) {
      console.log('status', isShowAnswerCard);
      this.isShowAnswerCard = isShowAnswerCard;
    },

    onSetQuickAnswerCardVisible(isQuickShowAnswerCard, question) {
      this.isQuickShowAnswerCard = isQuickShowAnswerCard;
      if (question) {
        if (question.type === this.answerCardSdk.questionTypes.CheckBox) {
          this.quickAnswerCardTitle = '【多选】';
        } else {
          this.quickAnswerCardTitle = '【单选】';
        }
      }
    },

    onSuccessSubmit() {
      this.isShowAnswerCard = false;
      // console.log('提交成功');
    },
    onShow() {
      console.log('onShow');
      this.isShowAppAnswerCard = true;
    },

    onHide() {
      console.log('onHide');
      this.isShowAppAnswerCard = false;
    },
    closeDialog() {
      this.isShowAppAnswerCard = false;
    },

    destroy() {
      this.answerCardSdk && this.answerCardSdk.destroy();
      this.answerCardSdk = null;
    },
  },
};
