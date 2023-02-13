import { I18n } from '../../../assets/locale/locale';
import langs from '../../../assets/locale/lang/submit-tips';

export default {
  props: {
    // 显示时长
    duration: {
      type: Number,
      default: 3000,
    },
    tipsStyle: {
      type: Object,
      default: null,
    },
    tipsClass: {
      type: String,
      default: '',
    },
    // 提示状态
    submitStatus: {
      type: String,
      default: 'success'
    },
    // 提示文本
    tips: {
      type: String,
      default: ''
    },
    isMobile: {
      type: Boolean,
    },
    // 语言
    locale: {
      type: String,
    },
  },

  created() {
    this.i18n = new I18n(langs);
    this.i18n.updateLocale(this.locale);
  },

  mounted() {
    setTimeout(() => {
      this.hide();
    }, this.duration);
  },

  methods: {
    iarTrans(word, options) {
      return this.i18n && this.i18n.trans(word, options);
    },

    hide() {
      this.$emit('hide');
    },
  },
};
