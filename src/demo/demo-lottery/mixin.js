import { Lottery } from '@polyv/interactions-receive-sdk';
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
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      /** 抽奖 SDK 实例 */
      lotterySdk: null,
      /** 抽奖进行状态 */
      lotteryStatus: '',
      allLotteryStatus,
      lotteryPattern: 'default',
      /** 是否展示结果 */
      isShowResult: false,
      lotteryList: [],
      /** 是否展示抽奖盒子 */
      isLotteryShowing: false,
      /** 是否展示抽奖记录 */
      isShowRecord: false,
      /** 是否展示抽奖挂件 */
      isShowWidget: false,
    };
  },

  created() {
    this.lotterySdk = new Lottery();
  },

  [BEFORE_DESTROY]() {
    this.lotterySdk?.destroy();
    this.lotterySdk = null;
  },

  methods: {
    onLotteryStatusChange(status) {
      this.lotteryStatus = status;
      if (status === allLotteryStatus.timing) {
        // TODO 定时抽奖中, 暂时不显示
        // this.lotteryPattern = 'box';
        // this.isLotteryShowing = true;
      } else if (status === allLotteryStatus.running) {
        this.isShowResult = false;
        this.isShowRecord = false;
        this.isLotteryShowing = true;
      } else if (status === allLotteryStatus.over) {
        this.isLotteryShowing = false;
        this.isShowResult = true;
      } else if (status === allLotteryStatus.end) {
        this.isLotteryShowing = false;
      }
    },

    onLotteryShowChange(isShowing) {
      this.isLotteryShowing = isShowing;
    },

    onClickWidget() {
      // 仍在计时/抽奖则展示抽奖盒子
      if ([allLotteryStatus.running, allLotteryStatus.timing].includes(this.lotteryStatus)) {
        this.isLotteryShowing = true;
      } else {
        this.isShowResult = true;
      }
    },

    // 展示抽奖结果
    setLotteryResultShow() {
      // this.isShowResult = true;
    },

    // 隐藏抽奖结果
    setLotteryResultHide() {
      this.isShowResult = false;
      this.$refs.lotteryEnd && this.$refs.lotteryEnd.toBack();
    },

    setLotteryRecordVisible() {
      this.isShowRecord = !this.isShowRecord;
    },

    onLotteryRecord(lotteryList = []) {
      if (lotteryList.length) {
        this.lotteryList = lotteryList;
        this.$emit('lottery-list', lotteryList);
      }
    },
    test() {
      const data = {
        channelId:
          2368954,
        lotteryId:
        'gfa4d6kemd',
        viewerId:
          111,
        winnerCode:
        'ZkoD1gDF',
        sessionId:
        'fycczz5esf',
        receiveInfo:
          [{ value: '123', tips: '请输入您的真实姓名', required: true, field: '姓名：' }, { value: '13333333333', tips: '请输入您的手机号码', required: true, field: '手机：' }]
      };
      this.lotterySdk.submitInfo(data);
    },

    onClickRecord(record = {}) {
      this.isShowRecord = false;
      this.isShowResult = true;
      this.$refs.lotteryEnd.setLottery(Object.assign({ isWinner: true }, record));
    },
  }
};
