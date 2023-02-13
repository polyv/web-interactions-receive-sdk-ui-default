import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/feed-back';
import { isPhoneNO } from '@polyv/utils/src/validate';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  langs,

  mixins: [entryMixin],

  props: {
    isShowFeedBack: {
      type: Boolean
    },
    feedBackSdk: {
      type: Object,
      default: null,
    },
    // 提示语的自定义 classname
    tipsClass: {
      type: String,
      default: '',
    },
    mountNode: {
      type: String
    }
  },

  data() {
    return {
      selValue: '', // 投诉类型
      selectData: [], // 投诉类型数据
      radioValue: '', // 反馈类型
      radioData: [],
      suggestionData: [], // 反馈类型数据
      complaintData: [], // 投诉类型数据
      feedBackContent: '', // 反馈的额外内容
      captchaValue: '', // 验证码
      contact: '', // 联系方式
      captchaObj: {}, // 生成的验证码对象（地址，ID）
      btnIsChenked: true,
      files: null, // 上传的文件
      showalertInfo: false,
      showalertText: '',
      isScrollBottom: false, // 是否滚动到元素底部
    };
  },
  beforeMount() {
    // 初始化下拉框
    this.selValue = 'suggestion';
    this.initOptions();
    this.initFeedbackData();
    this.radioData = this.suggestionData;
  },
  computed: {
    isDisabled() {
      return !(this.selValue && this.radioValue && this.captchaValue && this.btnIsChenked);
    }
  },

  watch: {
    isShowFeedBack: {
      immediate: true,
      handler(val) {
        if (val) {
          this.btnIsChenked = true;
          this.resetFrom();
          this.onGetcode();
        }
      },
    },
    feedBackSdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
      },
    },
    _useLang() {
      this.initOptions();
      this.initFeedbackData();
      this.initcomplaintData();
      if (this.selValue === 'suggestion') {
        this.radioData = this.suggestionData;
      } else {
        this.radioData = this.complaintData;
      }
    },
  },

  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },

  methods: {
    getScroll(event) {
      // 滚动条距离底部的距离scrollBottom
      const scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
      if (scrollBottom <= 0) {
        this.isScrollBottom = true;
      } else {
        this.isScrollBottom = false;
      }
    },
    initOptions() { // 初始化投诉类型select选项中英文 文案
      this.selectData = [
        {
          name: this.iarTrans('feedBack.feedTypeOption1'),
          value: 'suggestion'
        },
        {
          name: this.iarTrans('feedBack.feedTypeOption2'),
          value: 'complaint'
        },
      ];
    },
    initFeedbackData() { // 初始所属分类-意见反馈，中英文 文案
      this.suggestionData = [
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.stuck'),
          value: 'stuck'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.blackScreen'),
          value: 'black-screen'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.slowAccess'),
          value: 'slow-access'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.poorExperience'),
          value: 'poor-experience'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.playSuggestion'),
          value: 'play-suggestion'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.otherFeedback'),
          value: 'other-feedback'
        },
      ];
    },
    initcomplaintData() { // 初始所属分类-投诉，中英文 文案
      this.complaintData = [
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.porn'),
          value: 'porn'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.politics'),
          value: 'politics'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.drug'),
          value: 'drug'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.bloody'),
          value: 'bloody'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.scam'),
          value: 'scam'
        },
        {
          name: 'backRadio',
          text: this.iarTrans('feedBack.otherViolations'),
          value: 'other-violations'
        },
      ];
    },
    getValue(name, value) { // 获取select 投诉类型的值
      if (value !== this.selValue) {
        this.radioValue = '';
      }
      this.selValue = value;
      if (value === 'suggestion') {
        this.radioData = this.suggestionData;
      } else {
        this.initcomplaintData();
        this.radioData = this.complaintData;
      }
    },
    resetFrom() { // 重置表单数据
      this.initOptions();
      this.initFeedbackData();
      this.radioData = this.suggestionData;
      this.selValue = 'suggestion';
      this.radioValue = '';
      this.feedBackContent = '';
      this.contact = '';
      this.captchaValue = '';
      this.$refs.uploaderDom.files = [];
      this.files = null;
    },
    bindAppEvents() {
      const feedBackSdk = this.feedBackSdk;
      if (!feedBackSdk) { return; }
      feedBackSdk.on(feedBackSdk.events.SUBMIT, this.onSubmit);
    },

    unbindAppEvents() {
      const feedBackSdk = this.feedBackSdk;
      if (!feedBackSdk) { return; }
      feedBackSdk.off(feedBackSdk.events.SUBMIT, this.onSubmit);
    },
    getFile(file) {
      file && file.length >= 1 ? this.files = file : this.files = null;
    },
    doesFiles() { // 取.file才是真正的文件
      if (this.files && this.files.length >= 1) {
        return this.files.map(item => item.file);
      } else {
        return '';
      }
    },
    async feedBackHand() { // 提交反馈
      if (this.contact !== '' && !isPhoneNO(this.contact)) {
        // 输入框聚焦
        this.$refs?.phoneRef.focus();
        this.showalertText = this.iarTrans('feedBack.errorPhone');
        this.showalertInfo = true;
        return;
      }
      this.btnIsChenked = false;
      const obj = {
        type: this.selValue,
        label: this.radioValue,
        content: this.feedBackContent,
        captchaId: this.captchaObj.captchaId,
        captchaValue: this.captchaValue,
        contact: this.contact,
        imageFiles: this.doesFiles()
      };
      let data;
      try {
        data = await this.feedBackSdk.feedbackSave(obj);
      } catch (e) {
        this.btnIsChenked = true;
        // 提示 接口返回的错误信息或接口超时。
        this.showalertText = `${(e.data && e.data.error && e.data.error.desc) || e.toString()}`;
        this.showalertInfo = true;
      }
      if (data.code === 200) {
        if (data.status === 'error') {
          setTimeout(() => {
            this.btnIsChenked = true;
          }, 1000);
          this.showalertText = `${data.error.desc}`;
          this.showalertInfo = true;
          this.onGetcode();
        } else {
          this.onSubmitSuccess();
        }
      } else {
        this.btnIsChenked = true;
        this.showalertText = `${data.error.desc}`;
        this.showalertInfo = true;
      }
    },
    async onGetcode() {
      const obj = await this.feedBackSdk?.getcode();
      if (obj.data) {
        this.captchaObj = obj.data;
      }
    },
    handleToastHidden() {
      this.showalertInfo = false;
    },
    // 提交成功
    onSubmitSuccess() {
      this.btnIsChenked = true;
      this.$emit('to-hide');
      this.showSubmitTips({
        tipsClass: this.tipsClass,
        mountNode: this.mountNode
      });
      this.$nextTick(() => {
        this.resetFrom();
      });
    },
    // 处理反馈提交消息
    onSubmit() {
      this.$emit('to-hide');
    },

  },
};
