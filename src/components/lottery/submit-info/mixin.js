import basicMixin from '../../../assets/mixins/basic';
import { keyboardFix } from '../../../assets/utils/utils';
import { formatDate } from '@polyv/utils/src/date';
export default {
  mixins: [basicMixin],

  props: {
    // 中奖人信息字段
    collectInfo: {
      type: Array,
      default: () => []
    },

    // 是否已填写信息
    received: {
      type: Boolean,
    },
    isWebView: {
      type: Boolean,
      default: false
    },
    // 截止时间 时间戳
    deadline: {
      type: [String, Number],
      default: ''
    },
    showWinners: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      // 姓名输入错误
      isShowNameErr: false,
      // 手机号输入错误
      isShowPhoneErr: false,
      // 检测必填选项,是否为空
      isOptionsErr: false,
      formData: [],
    };
  },
  watch: {
    collectInfo: {
      handler(array) {
        this.formData = [];
        for (const key in array) {
          const item = Object.assign({ value: '' }, array[key]);
          this.formData.push(item);
        }
        this.$nextTick(() => {
          this.checkOptions();
        });
      },
      immediate: true
    },
    formData: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.checkOptions();
        });
      }
    }
  },
  computed: {
    isShowDeadLine() {
      return !this.received && this.deadline && new Date(this.deadline) < new Date();
    },
    submitEnable() {
      return !this.isShowNameErr &&
        !this.isShowPhoneErr &&
        this.isOptionsErr;
    },
    deadlineLabel() {
      return formatDate(new Date(this.deadline), 'YYYY.MM.DD hh:mm');
    }
  },

  methods: {
    keyboardFix,
    // 判断姓名和手机号是否填写, 自定义必填想是否填写
    checkOptions() {
      let status = true;
      const { formData } = this;
      for (const key in formData) {
        const item = formData[key];
        const isNameOrPhone = this.checkOptionsFiled('userName', item) || this.checkOptionsFiled('userPhone', item);
        // 当required为true时,判断是否填写。 兼容required为undefined时,默认为需要填写。
        if (isNameOrPhone && (item.required || item.required === undefined ? !item.value : false)) {
          status = false;
          break;
        }
        // 检查自定义必填项
        if (item.required && !item.value) {
          status = false;
          break;
        }
      }
      this.isOptionsErr = status;
    },
    fieldLabel(field) {
      if (this.checkOptionsFiled('userName', field)) {
        return this.iarTrans(`${this.langName}.name`);
      } else if (this.checkOptionsFiled('userPhone', field)) {
        return this.iarTrans(`${this.langName}.phone`);
      }
      return field.field;
    },

    fieldPlaceholder(field) {
      if (this.checkOptionsFiled('userName', field)) {
        return this.iarTrans(`${this.langName}.realName`);
      } else if (this.checkOptionsFiled('userPhone', field)) {
        return this.iarTrans(`${this.langName}.enterPhone`);
      }
      return field.tips;
    },

    requiredText(field) {
      return field.required ? this.iarTrans(`${this.langName}.requiredText`) : '';
    },

    fieldErr(field) {
      if (this.checkOptionsFiled('userName', field)) {
        return this.isShowNameErr;
      } else if (this.checkOptionsFiled('userPhone', field)) {
        return this.isShowPhoneErr;
      }
      return false;
    },

    fieldErrTips(field) {
      if (this.checkOptionsFiled('userName', field)) {
        return this.iarTrans(`${this.langName}.wrongName`);
      } else if (this.checkOptionsFiled('userPhone', field)) {
        return this.iarTrans(`${this.langName}.wrongPhone`);
      }
      return false;
    },

    onBlur(e, field) {
      const value = e.target.value;
      if (this.checkOptionsFiled('userName', field) && (field.required || field.required === undefined)) {
        this.isShowNameErr = !value;
      } else if (this.checkOptionsFiled('userPhone', field) && (field.required || field.required === undefined)) {
        this.isShowPhoneErr = !this.isPhone(value);
      }
      // webview下兼容ios12问题
      if (this.isWebView) {
        this.keyboardFix();
      }
    },
    // 判断姓名，手机; type: userName || userPhone
    checkOptionsFiled(type, item) {
      if (item.type === type) return true;
      if (type === 'userName') {
        return /^(姓名|Name)[:：]?$/.test(item.field);
      }
      if (type === 'userPhone') {
        return /^(手机|Phone number)[:：]?$/.test(item.field);
      }
    },

    onClickInput(field) {
      if (this.checkOptionsFiled('userName', field)) {
        this.isShowNameErr = false;
      }
      // else if (this.checkOptionsFiled('userPhone', field)) {
      //   this.isShowPhoneErr = false;
      // }
    },

    onInputKeyup(e, field, index) {
      if (this.checkOptionsFiled('userPhone', field)) {
        const value = this.onlyNumber(e.target.value);
        e.target.value = value;
        this.formData[index].value = value;
        if (!value && value.length === 11) {
          this.isShowPhoneErr = !this.isPhone(value);
        } else {
          this.isShowPhoneErr = false;
        }
      }
      this.checkOptions();
    },

    onlyNumber(value = '') {
      value = value.replace(/[^0-9.]/g, '');
      if (value.length > 11) value = value.substr(0, 11);
      return value;
    },

    isPhone(value) {
      return /^1[3-9]\d{9}$/.test(value);
    },

    cleanValue(item) {
      item.value = '';
    },

    onClickSubmit() {
      let errorStatus = false;
      this.formData.forEach(item => {
        if (this.checkOptionsFiled('userPhone', item)) {
          this.isShowPhoneErr = !(item.required || item.required === undefined) && !!item.value && !this.isPhone(item.value);
          errorStatus = !(item.required || item.required === undefined) && !!item.value && !this.isPhone(item.value);
        }
      });
      if (errorStatus) {
        return;
      }
      this.$emit('submit', this.formData);
    },
    onClickKnow() {
      this.$emit('know');
    },

    onClickCheckWinner() {
      this.$emit('check-winners');
    },
  },
};
