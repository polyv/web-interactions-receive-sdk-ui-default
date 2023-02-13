
import langs from '../../assets/locale/lang/enroll-lottery';
import entryMixin from '../../assets/mixins/entry';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

// 抽奖进行状态
const allLotteryStatus = {
  // 计时中
  timing: 'timing',
  // 抽奖中
  running: 'running',
  // 开奖中
  over: 'over',
  // 已结束
  end: 'end',
};

export default {
  langs,
  mixins: [entryMixin],
  props: {
    enrollLotterySdk: {
      type: Object,
      default: null
    },
    // 是否无限极频道
    isInfinitus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      enrollStatus: '',
      enrollLotteryVisible: true,
      isLotteryShowing: false,
      lotteryData: {
        endTime: '',
        lotteryId: '',
        name: '',
        times: ''
      }
    };
  },

  async created() {
    this.enrollLotterySdk.on(this.enrollLotterySdk.events.UpdateLotteryDetail, this.updateLotteryData);
    this.enrollLotterySdk.on(this.enrollLotterySdk.events.StartLotteryForSignUp, this.startLotteryForSignUpHandle);
    this.enrollLotterySdk.on(this.enrollLotterySdk.events.EndLotteryForSignUp, this.endLotteryForSignUpHandle);
  },

  [BEFORE_DESTROY]() {
    this.enrollLotterySdk.off(this.enrollLotterySdk.events.UpdateLotteryDetail, this.updateLotteryData);
    this.enrollLotterySdk.off(this.enrollLotterySdk.events.StartLotteryForSignUp, this.startLotteryForSignUpHandle);
    this.enrollLotterySdk.on(this.enrollLotterySdk.events.EndLotteryForSignUp, this.endLotteryForSignUpHandle);
  },

  methods: {
    async lotteryAnimationStart() {
      this.$emit('to-hide');
      this.isLotteryShowing = true;
      this.$refs.onLottery.toggleStatus(allLotteryStatus.running)();

    },
    async lotteryAnimationEnd() {
      await this.$refs.onLottery.toggleStatus(allLotteryStatus.over)();
      this.isLotteryShowing = false;
      this.enrollStatus = 'result';
      this.$emit('to-show');

    },
    onLotteryShowChange(isShowing) {
      this.isLotteryShowing = isShowing;
    },
    startLotteryForSignUpHandle(msg) {
      this.lotteryData = Object.assign(this.lotteryData, msg);
      this.enrollStatus = 'start';
      this.lotteryAnimationStart();
    },
    endLotteryForSignUpHandle(msg) {
      this.lotteryData = Object.assign(this.lotteryData, msg);
      this.lotteryAnimationEnd();
    },
    closeModal() {
      this.enrollStatus = '';
      this.$emit('to-hide');
    },
    // 更新报名抽奖信息
    updateLotteryData(data = {}) {
      if (!data) {
        this.isLotteryShowing = false;
        this.closeModal();
        return;
      }

      const { serverTime, startTime, endTime } = data;
      const isEnrollTime = serverTime >= startTime && serverTime <= endTime;
      if (isEnrollTime) {
        this.enrollStatus = 'addMsg';
      }
      this.lotteryData = data;
      // 非报名模式，且在抽奖中展示抽奖动画
      if (data.status === 'normal' && !data.sourceRange.includes('enroll')) {
        this.lotteryAnimationStart();
      }
    }
  }
};
