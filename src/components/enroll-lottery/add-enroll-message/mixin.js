import Countdown from '@polyv/utils/src/countdown';
// // import md5 from 'jraiser/crypto/1.1/md5';
import basicMixin from '../../../assets/mixins/basic';
import { showToast } from '../../../assets/utils/toast';

export default {
  mixins: [basicMixin],

  props: {
    // 奖品
    prize: {
      type: String,
      default: ''
    },
    // 报名结束时间
    endTime: {
      type: Number,
      required: true
    },
    channelId: {
      type: Number,
      required: true
    },
    // 抽奖ID
    lotteryId: {
      type: String,
      required: true
    },
    enrollLotterySdk: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      disableSubmit: false,
      // 当前报名进度， unenrolled:未报名, success: 报名成功，failed：名额已满，报名失败
      enrollProcess: 'unenrolled',
      wrongTel: false, // 手机格式错误
      wrongName: false, // 姓名是否为空
      errorTips: '', // 错误提示
      name: '', // 报名姓名
      mobile: '', // 报名手机号
      enrolled: false, // 是否已报名
      count: 0, // 倒计时
      enrollLotteryCountdown: null
    };
  },
  //
  computed: {
    // 提交按钮是否可点击
    submitEnabled() {
      const { wrongTel, wrongName, name, mobile } = this;
      return !wrongTel && !wrongName && name && mobile;
    },
  },
  //
  mounted() {
    // 开奖倒计时
    if (this.endTime < Date.now()) return;
    const time = parseInt((this.endTime - Date.now()) / 1000);
    this.removeTimer();
    this.enrollLotteryCountdown = new Countdown(time, (res) => {
      const { seconds, minutes, hours, days } = res;
      const totalHours = days * 24 + hours;
      const count = seconds + minutes * 60 + totalHours * 3600;
      this.count = `${this.transformTime(totalHours)}:${this.transformTime(minutes)}:${this.transformTime(seconds)}`;
      if (count <= 0) this.enrollLotteryCountdown.stop();
    });
    this.enrollLotteryCountdown.start();
  },
  //
  beforeDestroy() {
    this.removeTimer();
  },

  methods: {
    // 姓名输入框失焦检查姓名是否为空
    nameInputBlur() {
      if (!this.name) {
        this.wrongName = true;
        this.errorTips = this.iarTrans('enrollLottery.enterPhoneName');
      } else {
        this.wrongName = false;
      }
    },
    // 手机号失焦校验手机格式
    checkPhone() {
      const isPhone = /^1[3-9]\d{9}$/.test(this.mobile);
      this.enrolled = false;
      if (!isPhone) {
        this.wrongTel = true;
        this.errorTips = this.iarTrans('enrollLottery.wrongPhone');
      }
    },
    // 限制手机号只能输入11位数字
    onlyNumber() {
      let { mobile } = this;
      mobile = mobile.replace(/[^0-9.]/g, '');
      if (mobile.length > 11) mobile = mobile.substr(0, 11);
      this.mobile = mobile;
    },
    // 提交报名信息
    async submitMessage() {
      if (this.disableSubmit) return;
      this.disableSubmit = true;
      const { name, mobile, lotteryId, prize } = this;
      const params = {
        enrollLotteryName: prize,
        lotteryId,
        mobile,
        name,
      };
      try {
        await this.enrollLotterySdk.submitInfo(params);
        this.enrollProcess = 'success';
      } catch (e) {
        const errorMessage = (e.data && e.data.error && e.data.error.desc) || e.toString();
        showToast({
          text: errorMessage
        });
      } finally {
        // 等待toast消失后再恢复按钮状态
        setTimeout(() => {
          this.disableSubmit = false;
        }, 3000);
      }
    },
    // 将个位数变成0*
    transformTime(number) {
      if (number > 9) {
        return number;
      }
      return `0${number}`.slice(-2);
    },

    removeTimer() {
      if (this.enrollLotteryCountdown) {
        this.enrollLotteryCountdown.stop();
        this.enrollLotteryCountdown = null;
      }
    }
  }
};
