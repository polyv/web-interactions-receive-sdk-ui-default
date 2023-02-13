import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/check-in';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  langs,

  mixins: [entryMixin],

  props: {
    checkInSdk: {
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
      // 签到剩余时长
      leftTime: null,
      // 签到提示消息
      message: '',
      // 是否本次签到已点击提交
      disabled: false,
      socketConnected: true
    };
  },

  computed: {
    btnStyle() {
      return {
        backgroundImage: 'linear-gradient(90deg, #FFC038 0%, #FFA311 100%)',
        borderRadius: '25px',
        padding: 0,
        height: '100%'
      };
    }
  },

  watch: {
    checkInSdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
      },
    }
  },

  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },

  methods: {
    bindAppEvents() {
      const checkInSdk = this.checkInSdk;
      if (!checkInSdk) { return; }
      checkInSdk.bindSocketIOEvents();
      checkInSdk.on(checkInSdk.events.SIGN_IN, this.onSignIn);
      checkInSdk.on(checkInSdk.events.STOP_SIGN_IN, this.onStopSignIn);
      checkInSdk.on(checkInSdk.events.SIGN_IN_TIME_UPDATED, this.onTimeUpdate);
      checkInSdk.on(checkInSdk.events.SIGN_IN_SUCCESS, this.onCheckInSuccess);
      checkInSdk.on(checkInSdk.events.SIGN_IN_FAIL, this.onCheckInFail);
      checkInSdk.on(checkInSdk.events.SIGN_IN_FINISH, this.onStopSignIn);
      checkInSdk.on(checkInSdk.socketIOEvents.DISCONNECT, () => {
        this.socketConnected = false;
      })
        .on(checkInSdk.socketIOEvents.CONNECT, () => {
          this.socketConnected = true;
          this.disabled = false;
        });
    },

    unbindAppEvents() {
      const checkInSdk = this.checkInSdk;
      if (!checkInSdk) { return; }
      checkInSdk.off(checkInSdk.events.SIGN_IN, this.onSignIn);
      checkInSdk.off(checkInSdk.events.STOP_SIGN_IN, this.onStopSignIn);
      checkInSdk.off(checkInSdk.events.SIGN_IN_TIME_UPDATED, this.onTimeUpdate);
      checkInSdk.off(checkInSdk.events.SIGN_IN_SUCCESS, this.onCheckInSuccess);
      checkInSdk.off(checkInSdk.events.SIGN_IN_FINISH, this.onStopSignIn);
    },

    // 处理开始签到消息
    onSignIn(msg) {
      this.playSoundEffects();
      this.message = msg.data.message;
      this.$emit('to-show');
    },

    // 处理结束签到消息
    onStopSignIn() {
      this.$emit('to-hide');
      this.clear();
    },

    // 点击签到
    signIn() {
      // 防重复点击
      if (this.disabled) { return; }
      // TODO 防 js 脚本模拟点击
      // const signBtn = e.target;
      // const signBtnRange = {
      //   x1: signBtn.getBoundingClientRect().left,
      //   x2: signBtn.getBoundingClientRect().left + signBtn.clientWidth,
      //   y1: signBtn.getBoundingClientRect().top,
      //   y2: signBtn.getBoundingClientRect().top + signBtn.clientHeight,
      // };
      // const inXRange = e.clientX >= signBtnRange.x1 && e.clientX <= signBtnRange.x2;
      // const inYRange = e.clientY >= signBtnRange.y1 && e.clientY <= signBtnRange.y2;
      // if (
      //   e.pageX === null ||
      //   e.pageY === null ||
      //   !inXRange ||
      //   !inYRange
      // ) {
      //   return;
      // }
      this.disabled = true;
      this.checkInSdk.toCheckIn();
    },

    // 清除数据
    clear() {
      this.message = '';
      this.leftTime = null;
      this.disabled = false;
    },

    // 签到剩余时长更新
    onTimeUpdate({ totalMsecs }) {
      // 毫秒转秒
      this.leftTime = Math.ceil(totalMsecs / 1000);
    },

    // 签到成功
    onCheckInSuccess() {
      this.$emit('to-hide');
      this.showSubmitTips({
        tipsClass: this.tipsClass,
        mountNode: this.mountNode
      });
      // 恢复下次签到可点击
      this.$nextTick(() => {
        this.clear();
      });
    },
    onCheckInFail() {
      this.$emit('to-hide');
      this.showSubmitTips({
        tips: this.iarTrans('checkIn.submitEndFail'),
        duration: 2000,
        submitStatus: 'fail',
        mountNode: this.mountNode
      });
      // 恢复下次签到可点击
      this.$nextTick(() => {
        this.clear();
      });
    }
  },
};
