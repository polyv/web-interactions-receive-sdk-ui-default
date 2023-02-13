import { Questionnaire } from '@polyv/interactions-receive-sdk';
import { I18n } from '../../assets/locale/locale';
import langs from '../../assets/locale/lang/questionnaire';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
// import api from '../../assets/api/api';

const AllStatus = {
  isShowQuestion: 'isShowQuestion',
  isShowResult: 'isShowResult',
  isShowAnswer: 'isShowAnswer',
  isShowResultRank: 'isShowResultRank'
};

export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },
  data() {
    return {
      i18n: null,
      // 问卷 SDK 实例
      questionnaireSdk: null,
      // 标题
      questionnaireTitle: '问卷',
      // 是否展示问卷
      isShowQuestionnaire: false,
      // 是否展示问卷列表按钮
      showQnListBtn: false,
      // 弹窗展示返回按钮
      hasBackBtn: false,
    };
  },
  created() {
    this.questionnaireSdk = new Questionnaire();
    this.i18n = new I18n(langs);
    this.i18n.updateLocale(() => this.lang);
  },
  [BEFORE_DESTROY]() {
    this.questionnaireSdk?.destroy();
    this.questionnaireSdk = null;
  },
  methods: {
    showList() {
      this.$refs.questionnaire.showList();
    },
    onModalReturn() {
      this.hasBackBtn = false;
      this.showList();
    },
    onStatusChanged(status) {
      this.status = status;
      if (status === AllStatus.isShowQuestion) {
        this.hasBackBtn = true;
        this.questionnaireTitle = this.i18n.trans('questionnaire.title');
      } else if (status === AllStatus.isShowResult) {
        this.questionnaireTitle = this.i18n.trans('questionnaire.result.title');
        this.hasBackBtn = false;
      } else if (status === AllStatus.isShowAnswer) {
        this.questionnaireTitle = this.i18n.trans('questionnaire.result.title');
        this.hasBackBtn = false;
      } else if (status === AllStatus.isShowQuestionnaireList) {
        this.questionnaireTitle = this.i18n.trans('questionnaire.list');
        this.hasBackBtn = false;
      }
    },

    onSetQuestionnaireVisible(visible) {
      this.isShowQuestionnaire = visible;
      console.log('onSetQuestionnaireVisible', visible);
    },
    // 提交成功
    onSuccessSubmit() {
      console.log('提交成功');
      this.isShowQuestionnaire = false;
    },

    // webview 自定义跳转
    toLink(linkObj) {
      console.log('toLink', linkObj);
    },
    hasQuestionnaire(val) {
      this.showQnListBtn = val;
    }
  }
};
