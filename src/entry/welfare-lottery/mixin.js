import langMixin from './langMixin';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
import { local } from '@polyv/utils/src/storage';
import Polling from '@polyv/utils/src/polling';
import { onVisibilityChange, offVisibilityChange } from '../../assets/utils/page-visibility';
import { showToast } from '@/assets/utils/toast';
import { isSafari } from '@/assets/utils/browser';
// 本地存储 问卷题目答案
const LOTTERY_QUESTIONNAIRE_ANSWER = 'LOTTERY_QUESTIONNAIRE_ANSWER_';

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
  mixins: [langMixin],
  data() {
    return {
      // 活动倒计时
      countdownTime: 0,
      // TODO:挂件提示文案
      hint: '福利抽奖即将开始',
      // 抽奖数据
      lotteryData: {},
      // 抽奖状态
      lotteryStatus: 'end',
      // 已邀请人数
      inviteCount: 0,
      showTaskModal: false,
      showResultModal: false,
      showRecordModal: false,
      showWinnerList: false,
      hasWelfareLotteryPendant: false, // 条件抽奖挂件
      isLotteryShowing: false, // 抽奖动画
      watchedTime: 0, // 已观看分数
      polling: null, // 观看时长计时器
      eligible: true, // 是否满足抽奖条件
      hidden: 'hidden',
      lotteryId: undefined, // 当前抽奖ID
      originToRecord: 'task', // 记录从哪个页面进入抽奖记录， task：任务入口页，result：中奖结果页
      // 是否请求了保存观看时长接口
      isRequestSaveTime: false,
      // 是否已经上报
      isSavedTime: false,
      // 等待上报计时器
      saveTimeClock: null,
      // 抽奖入口处倒计时时间校正定时器
      countdownClock: null,

      // 当中奖结果弹窗没关闭情况下，保留lotteryId
      copyLotteryId: null,
      // 当中奖结果弹窗没关闭情况下，保留答题抽奖-子抽奖id
      lastLotteryId: null,
      // 抽奖信息是否更新完毕
      fetchLotteryDetailOver: true,
      isSafari,
    };
  },
  props: {
    /** 竖屏展示横屏（播放器竖屏展示横屏情况，非系统旋转情况）  */
    isFullScreen: Boolean,
    /** 挂件入口图 */
    entranceImg: {
      type: [String, undefined],
      default: undefined
    },
    /** 答题抽奖-答题入口背景图 */
    modalBgImg: [String, undefined],
    welfareLotterySdk: null,
    // 观看链接
    watchUrl: [String, undefined],
    // 邀请榜链接
    inviteUrl: [String, undefined],
    // 是否显示自定义抽奖，如果是的话，将屏蔽sdk自带的流程
    isShowCustomLottery: Boolean,
    // 收到发起抽奖后是否自动弹出抽奖入口
    isAutoPopper: {
      type: Boolean,
      default: false
    },
    // 是否禁用领取奖品
    linkSkipEnabled: {
      type: Boolean,
      default: true
    },
    isAppleMod: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 答题抽奖-答题阶段结束-展示结果页
    isLotteryQuestionnaireOver() {
      return this.isQuestionCondition && this.lotteryData.lastLotteryId;
    },
    // 答题抽奖-答题阶段-是否结束
    isQuestionLotteryOver() {
      return this.lotteryStatus === 'end' || this.lotteryData.lastLotteryId;
    },
    // 入口挂件文案
    entranceWriting() {
      let title = this.iarTrans('welfareLottery.opened');
      const { lotteryData } = this;
      if (this.isQuestionCondition && lotteryData.status === 'start') {
        title = this.iarTrans('welfareLottery.going');
      }
      return title;
    },
    // 答题抽奖
    isQuestionCondition() {
      return this.lotteryData.lotteryCondition === this.welfareLotterySdk.lotteryCondition.QUESTION;
    },
    hintShowTime() {
      return this.countdownTime - 3;
    },
    userId() {
      return this.welfareLotterySdk ? this.welfareLotterySdk.userInfo.userId : '';
    },
    localKey2WatchTime() {
      return `condition_lottery_${this.lotteryId}_${this.userId}`;
    },
    isConditionWatchTime() {
      return this.lotteryData.lotteryCondition === 'duration';
    },
    // 是否显示结果/记录/中奖名单弹窗
    isShowModal() {
      return this.showResultModal || this.showRecordModal || this.showWinnerList;
    }
  },
  watch: {
    isShowModal() {
      if (!this.isShowModal) {
        this.copyLotteryId = '';
        this.lastLotteryId = '';
      } else if (this.isShowModal && !this.copyLotteryId) {
        // 保存当前弹窗打开的抽奖id
        this.copyLotteryId = this.lotteryId;
      }
    },
    welfareLotterySdk: {
      immediate: true,
      async handler(newVal) {
        if (newVal) {
          this.onWelfareLotteryStartHandler = this.onWelfareLotteryStart.bind(this);
          this.onWelfareLotteryEndHandler = this.onWelfareLotteryEnd.bind(this);
          this.onWelfareLotteryQuestionStartHandler = this.onWelfareLotteryQuestionStart.bind(this);
          this.bindEvents();
          this.getPendantList();
        }
      }
    },
    hasWelfareLotteryPendant(nv) {
      this.$emit('entry-visible-changed', nv);
    },
  },
  mounted() {
    this.initModal();
    onVisibilityChange(this.handleVisibilityChange);
  },
  [BEFORE_DESTROY]() {
    if (this.$refs.modalWrap && this.$refs.modalWrap.parentNode) {
      this.$refs.modalWrap.parentNode.removeChild(this.$refs.modalWrap);
    }
    this.unbindEvents();
    offVisibilityChange(this.handleVisibilityChange);
    this.stopPolling();
    this.polling = null;
  },
  methods: {
    bindEvents() {
      const { events } = this.welfareLotterySdk;
      this.welfareLotterySdk
        .on(events.ADD_QUESTION_FOR_LOTTERY, this.onAddQuestionHandler)
        .on(events.START_FOR_QUESTIONNAIRE, this.onWelfareLotteryQuestionPrizeEndHandler)
        .on(events.START_FOR_LOTTERY, this.onWelfareLotteryQuestionStartHandler)
        .on(events.START, this.onWelfareLotteryStartHandler)
        .on(events.END, this.onWelfareLotteryEndHandler);
    },
    unbindEvents() {
      const welfareLotterySdk = this.welfareLotterySdk;
      if (!welfareLotterySdk) return;
      const { events } = welfareLotterySdk;
      welfareLotterySdk
        .off(events.ADD_QUESTION_FOR_LOTTERY, this.onAddQuestionHandler)
        .off(events.START_FOR_QUESTIONNAIRE, this.onWelfareLotteryQuestionPrizeEndHandler)
        .off(events.START_FOR_LOTTERY, this.onWelfareLotteryQuestionStartHandler)
        .off(events.START, this.onWelfareLotteryStartHandler)
        .off(events.END, this.onWelfareLotteryEndHandler);
    },
    async getPendantList() {
      const res = await this.welfareLotterySdk.getPendantList();
      if (res && res.code === 200) {
        const pendant = res.data.list.find(item => item.type === 'condition_lottery');
        if (pendant) {
          this.lotteryId = pendant.pandantId;
          await this.getWelfareLotteryDetail();
          this.hasWelfareLotteryPendant = true;
        }
      }
    },
    async getWelfareLotteryDetail() {
      const res = await this.welfareLotterySdk.getWelfareLotteryDetail();
      if (res && res.code === 200) {
        const data = res.data;
        // TODO:礼盒动画有2秒的动画时间，所以需要加上礼盒的展示时间
        data.endTime += 2000;
        this.lotteryData = data;
        this.lotteryStatus = data.status;
        if (this.lotteryStatus === 'end') {
          this.countdownTime = 0;
          // 结束抽奖，若是观看时长类型的条件，清除对应的记录
          if (this.isConditionWatchTime) {
            local.remove(this.localKey2WatchTime);
          }
        } else {
          this.setCountdownTime();
          // 查看是否存在对应的观看时长记录
          if (this.isConditionWatchTime) {
            this.handleWatchTimeCondition();
          }
        }
      }
    },
    // 答题活动-开奖阶段
    async onWelfareLotteryQuestionPrizeEndHandler() {
      // 清理本地缓存题目答案
      local.remove(LOTTERY_QUESTIONNAIRE_ANSWER + this.lotteryId);
      // 延迟2s获取抽奖数据， 后端有可能没及时更新。
      setTimeout(async () => {
        this.onWelfareLotteryEndHandler();
        await this.getWelfareLotteryDetail();
      }, 2000);
    },
    onAddQuestionHandler() {
      if (!this.showTaskModal && this.fetchLotteryDetailOver) {
        showToast({
          text: this.iarTrans('welfareLottery.hasNewQuestionCome')
        });
        this.clickEntrance();
      }
    },
    // 答题抽奖活动开始
    onWelfareLotteryQuestionStart(msg) {
      this.onWelfareLotteryStart(msg);
    },
    // 活动开始，显示挂件，请求抽奖活动具体内容
    onWelfareLotteryStart(msg) {
      // 等待0-5秒（随机）出现挂件
      const time = Math.ceil((Math.random() / 2) * 10000);
      this.isRequestSaveTime = false;
      this.isSavedTime = false;
      this.fetchLotteryDetailOver = false;

      setTimeout(async () => {
        this.hasWelfareLotteryPendant = true;
        this.lotteryId = msg.lotteryId;
        await this.getWelfareLotteryDetail();
        await this.showFirstTimeTaskModal();
        this.fetchLotteryDetailOver = true;
      }, time);
    },
    // 条件抽奖开始，第一次展示任务弹窗
    async showFirstTimeTaskModal() {
      if (!this.isAutoPopper) return;
      this.showTaskModal = true;
      // 邀请好友 第一次弹窗需要获取个人完成情况
      const { INVITE } = this.welfareLotterySdk.lotteryCondition;
      const array = [INVITE];
      if (array.includes(this.lotteryData.lotteryCondition)) {
        await this.getTaskCondition();
      }
    },
    // 开奖，获取中奖名单
    async onWelfareLotteryEnd() {
      this.clearCountdownClock();
      if (this.isConditionWatchTime) {
        this.clearSaveTimeClock();
        this.stopPolling();
        this.polling = null;
        // 清除对应的观看时长记录
        local.remove(this.localKey2WatchTime);
      }

      // 先展示抽奖动画，后展示中奖结果
      this.$nextTick(async () => {
        // 清除挂件信息
        this.lotteryStatus = 'end';
        this.countdownTime = 0;
        if (this.lotteryData.inviteType !== 'external') {
          this.lotteryAnimation();
        } else {
          // 如果是外部邀请，取消动画，直接展示结果
          this.showResultModal = true;
        }
      });
    },
    async lotteryAnimation() {
      await this.$refs.onLottery.toggleStatus(allLotteryStatus.running)();
      // 等待抽奖动画
      await this.delay(500);
      await this.$refs.onLottery.toggleStatus(allLotteryStatus.over)();
    },
    async clickEntrance() {
      // 抽奖是否结束情况
      if (this.isQuestionCondition && this.isQuestionLotteryOver) {
        this.showResultModal = true;
      } else if (!this.isQuestionCondition && this.lotteryStatus === 'end') {
        this.showResultModal = true;
      } else {
        this.showTaskModal = true;
        this.getTaskCondition();
      }
    },
    // 获取任务完成情况
    async getTaskCondition() {
      // 答题抽奖，不需要请求后getTaskCondition()
      if (this.isQuestionCondition) return;
      const res = await this.welfareLotterySdk.getTaskCondition();
      if (res && res.code === 200) {
        const { inviteCount, viewerSize, hasComment } = res.data;
        this.inviteCount = inviteCount;
        this.lotteryData = Object.assign({}, this.lotteryData, { viewerSize, hasComment });
      }
    },
    commentSuccess(comment) {
      this.showTaskModal = false;
      this.$emit('comment-success', comment);
    },
    closeTaskModal() {
      this.showTaskModal = false;
    },
    closeResultModal() {
      this.showResultModal = false;
    },
    openRecordModal(origin = 'task') {
      this.originToRecord = origin;
      if (this.lotteryStatus === 'end') {
        this.showResultModal = false;
      } else {
        this.showTaskModal = false;
      }
      this.showRecordModal = true;
    },
    onClickRecordModalClose() {
      this.showRecordModal = false;
    },
    onClickRecordModalBack() {
      if (this.lotteryStatus === 'end') {
        this.showResultModal = true;
      } else if (this.originToRecord !== 'result') {
        this.showTaskModal = true;
      }
      this.showRecordModal = false;
    },
    openWinnerList(lastLotteryId) {
      this.lastLotteryId = lastLotteryId;
      this.showWinnerList = true;
      this.showResultModal = false;
    },
    onClickWinnerListClose() {
      this.showWinnerList = false;
    },
    onClickWinnerListBack() {
      this.showWinnerList = false;
      this.showResultModal = true;
    },
    onLotteryStatusChange(status) {
      this.showTaskModal = false;
      if (status === allLotteryStatus.running) {
        this.isLotteryShowing = true;
      } else if (status === allLotteryStatus.over) {
        this.isLotteryShowing = false;
        // 记录/中奖名单弹窗显示中，则结果弹窗无需展示
        if (this.isShowModal) return;
        this.showResultModal = true;
      }
    },
    onLotteryShowChange(isShowing) {
      this.isLotteryShowing = isShowing;
    },
    initModal() {
      // 解决祖先容器有transform的情况下，fixed定位失效问题
      // 但是必须在beforeDestroy移除
      const target = this.$refs.modalWrap;
      if (!this.isAppend) {
        this.isAppend = true;
        document.body.appendChild(target);
      }
    },
    lotteryCallback(data) {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('lotteryCallback', data);
    },
    handleWatchTimeCondition() {
      const totalTime = this.lotteryData.duration * 60;
      this.watchedTime = Number(local.get(this.localKey2WatchTime));
      const leftTime = totalTime - this.watchedTime;
      this.eligible = leftTime <= this.countdownTime;
      // 剩余时长为0也可以表示已经上报了观看时长
      // 剩余需要观看的时间需要小于开奖时间
      if (leftTime > 0 && this.eligible) {
        this.initPolling(totalTime);
      }
    },
    initPolling(time) {
      this.stopPolling();
      const polling = this.polling = new Polling(() => {
        if (this.watchedTime >= time) {
          this.stopPolling();
          this.polling = null;
        } else {
          this.watchedTime++;
          // 已经上报，不需要再更新本地记录
          if (!this.isSavedTime) {
            local.set(this.localKey2WatchTime, this.watchedTime);
          }
          // 提前一分钟进入上报流程
          // 继续倒计时是为了保证当打开弹窗时，倒计时界面能正确显示
          if (this.watchedTime >= time - 60 && !this.isRequestSaveTime) {
            this.addToLotteryList();
          }
        }
      }, {
        interval: 1000
      });
      polling.start();
    },
    stopPolling() {
      this.polling && this.polling.stop();
    },
    addToLotteryList() {
      this.isRequestSaveTime = true;
      // 解决刷新页面后，等待上报的时间加上已观看时长超过需要观看时长问题
      const leftTime = this.lotteryData.duration * 60 - this.watchedTime;
      const delay = Math.floor(Math.random() * leftTime) * 1000;
      this.saveTimeClock = setTimeout(async () => {
        this.clearSaveTimeClock();
        try {
          await this.welfareLotterySdk.saveWatchTime({
            duration: Math.floor(this.watchedTime / 60)
          });
          // 上报成功，刷新进入页面直接显示任务已完成
          this.isSavedTime = true;
          local.set(this.localKey2WatchTime, this.lotteryData.duration * 60);
        } catch (error) {
          console.warn('[条件抽奖]调用保存观看时长接口失败：', error);
        }
      }, delay);
    },
    clearSaveTimeClock() {
      if (this.saveTimeClock) {
        clearTimeout(this.saveTimeClock);
        this.saveTimeClock = null;
      }
    },
    handleVisibilityChange(hidden) {
      if (hidden) {
        this.stopPolling();
      } else {
        this.polling && this.polling.start();
      }
    },
    setCountdownTime() {
      // 答题抽奖没有倒计时
      if (this.isQuestionCondition) {
        this.countdownTime = 0;
        return;
      }
      this.clearCountdownClock();
      this.countdownTime = Math.round((this.lotteryData.endTime - Date.now()) / 1000);
      // 定时同步下挂件倒计时，防止时间不一致
      this.countdownClock = setTimeout(() => {
        this.setCountdownTime();
      }, 10000);
    },
    clearCountdownClock() {
      clearTimeout(this.countdownClock);
      this.countdownClock = null;
    },
  }
};
