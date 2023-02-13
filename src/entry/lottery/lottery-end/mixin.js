import lotteryMixin from '../lottery-mixin';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
const AllStatus = {
  isShowLotteryEnd: 'isShowLotteryEnd',
  isShowWinnerList: 'isShowWinnerList',
  isShowSubmitInfo: 'isShowSubmitInfo',
};

export default {
  mixins: [lotteryMixin],

  props: {
    // 抽奖SDK
    lotterySdk: {
      type: Object,
      default: null,
    },
    // 已中奖列表
    lotteryList: {
      type: Array,
      default: () => { return []; },
    },
    isWebView: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      AllStatus,
      status: AllStatus.isShowLotteryEnd,
      // 是否为中奖用户
      isWinner: false,
      // 抽奖所属场次ID
      sessionId: '',
      // 奖品名称
      prize: '',
      // 抽奖ID
      lotteryId: '',
      // 兑换码
      winnerCode: '',
      // 中奖人信息字段
      collectInfo: [],
      // 是否已填写信息
      received: false,
      // 是否收集用户信息
      hasCollect: true,
      // 显示中奖码
      showWinnerCode: true,
      // 是否隐藏中奖名单入口
      hideResult: false,
      // 展示中奖名单
      showWinners: true,
      socketConnected: true,
      // 截止时间
      deadline: ''
    };
  },

  watch: {
    lotterySdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
        // this.getResult();
      },
    },
    status() {
      this.$emit('status-changed', this.status);
    },
  },

  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
    this.clear();
  },

  methods: {
    // // 确认当前场次抽奖的个人中奖情况
    // async getResult() {
    //   try {
    //     let res = await this.lotterySdk.getResult();
    //     if (res?.result) {
    //       res = {
    //         isWinner: true,
    //         ...res.data,
    //       };
    //       this.setLottery(res);
    //     }
    //   } catch (e) {
    //     console.warn(e);
    //   }
    // },

    bindAppEvents() {
      const lotterySdk = this.lotterySdk;
      if (!lotterySdk) { return; }
      this.lotterySdk.bindSocketIOEvents();
      lotterySdk
        .on(lotterySdk.events.LotteryEnd, this.onLotteryEnd)
        .on(lotterySdk.socketIOEvents.DISCONNECT, () => {
          this.socketConnected = false;
        })
        .on(lotterySdk.socketIOEvents.CONNECT, () => {
          this.socketConnected = true;
        });
      // .on(lotterySdk.events.DelayLotteryStart, this.onDelayLotteryStart);
    },

    unbindAppEvents() {
      const lotterySdk = this.lotterySdk;
      if (!lotterySdk) { return; }
      lotterySdk
        .off(lotterySdk.events.LotteryEnd, this.onLotteryEnd);
      // .off(lotterySdk.events.DelayLotteryStart, this.onDelayLotteryStart);
    },

    clear() {
      this.status = this.AllStatus.isShowLotteryEnd;
      this.prize = '';
      this.isWinner = false;
      this.sessionId = '';
      this.lotteryId = '';
      this.winnerCode = '';
      this.collectInfo = [];
      this.receiveInfo = false;
    },

    /**
     * 当收到抽奖开始时
     * 先清除上一次的抽奖记录
     */
    onDelayLotteryStart() {
      this.clear();
    },

    async onLotteryEnd(msg = {}) {
      this.setLottery(msg);
      try {
        // 判断是否隐藏信息收集
        this.hasCollect = msg.hasCollect === 'Y';
        // 判断是否隐藏中间名单入口--(无限极)
        this.hideResult = msg.hideResult === 'Y';
        await this.delay();
      } catch (e) {}
      this.status = this.AllStatus.isShowLotteryEnd;
      this.$emit('to-show');
    },

    onClickBack() {
      this.status = AllStatus.isShowLotteryEnd;
    },

    onClickShowWinner() {
      this.status = AllStatus.isShowWinnerList;
    },

    toBack() {
      this.status = this.AllStatus.isShowLotteryEnd;
    },

    async onClickSubmit(fields) {
      const data = {
        sessionId: this.sessionId,
        lotteryId: this.lotteryId,
        winnerCode: this.winnerCode,
        receiveInfo: fields,
      };
      try {
        await this.lotterySdk.submitInfo(data);
        this.showSubmitTips();
        this.$emit('to-hide');
        this.status = this.AllStatus.isShowLotteryEnd;
      } catch (e) {
        this.showSubmitTips({
          submitStatus: 'fail',
          tips: e.data?.message || e.message
        });
      }
    },

    onClickKnow() {
      this.$emit('to-hide');
      this.status = this.AllStatus.isShowLotteryEnd;
    },

    setLottery(lotteryInfo = {}) {
      const { isWinner, prize, lotteryId, collectInfo, winnerCode, sessionId, received, overTime, showWinnerCode, showWinners } = lotteryInfo;
      this.isWinner = isWinner;
      this.lotteryId = lotteryId;
      this.sessionId = sessionId;
      this.received = received;
      this.deadline = new Date(overTime).getTime();
      collectInfo.forEach((item) => {
        if (!item.required) {
          item.required = false;
        }
      });
      // 显示中奖码
      if (showWinnerCode) {
        this.showWinnerCode = showWinnerCode === 'Y';
      }
      // 判断是否展示中间名单入口--（sass平台）
      if (showWinners) {
        this.showWinners = showWinners === 'Y';
      }
      if (isWinner) {
        this.prize = prize;
        this.collectInfo = collectInfo;
        this.winnerCode = winnerCode;
      }
    },
  },
};
