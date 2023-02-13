import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/seat-table';
import debounce from 'lodash-es/debounce';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  langs,

  mixins: [entryMixin],

  props: {
    seatTable: Object,
    // 总座位数，特殊座位 + 普通座位
    seatMaxNumber: {
      type: Number,
      default: 220,
    },
    // 特殊座位数
    specialCount: {
      type: Number,
      default: 4,
    },
    // 入座介绍图
    seatBanner: {
      type: String,
      default: '',
    },
    // 用户是否已入座
    viewerSeatEnabled: {
      type: String,
    },
  },

  watch: {
    seatTable: {
      immediate: true,
      handler() {
        this.listenSdkEvent();
      },
    },
    viewerSeatEnabled: {
      immediate: true,
      handler() {
        this.innerViewerSeatEnabled = this.viewerSeatEnabled;
      }
    },
    seatMaxNumber: {
      immediate: true,
      handler() {
        if (typeof this.seatMaxNumber === 'number') {
          this.seatTotal = this.seatMaxNumber;
        }
      }
    }
  },

  data() {
    const defList = [];
    const total = this.seatMaxNumber || this.seatTotal;
    for (let i = 0; i < total; i++) {
      defList.push({});
    }
    return {
      seatList: defList,
      /** 当前是否已入座 */
      innerViewerSeatEnabled: '',
      /** 当前座位 */
      currentSeat: undefined,
      /** 是否显示提示 */
      showTips: false,
      /** 欢迎语队列 */
      welcomeQueue: [],
      welcomeTimer: undefined,
      currentWelcome: undefined,
      // 总座位数，特殊座位 + 普通座位
      seatTotal: 220,
    };
  },

  mounted() {
    // 存在入参情况
    if (this.viewerSeatEnabled && this.viewerSeatEnabled === 'Y') {
      this.refreshSeatList();
    }
    // 没有入参情况
    if (!this.viewerSeatEnabled) {
      this.getUserSeatInfo();
    }
  },

  [BEFORE_DESTROY]() {
    this.destroyWelcomeTimer();
  },

  methods: {
    /** 监听 sdk 事件 */
    listenSdkEvent() {
      if (!this.seatTable) {
        return;
      }
      const { events } = this.seatTable;
      this.seatTable.on(events.ADD_SEATING, this.handleAddSeating);
      this.seatTable.bindSocketIOEvents();
      this.seatTable.on(this.seatTable.socketIOEvents.RECONNECT, () => {
        // 聊天室重连，重新刷新列表
        this.refreshSeatList();
      });
    },

    /** 处理座位新增事件 */
    handleAddSeating(msg) {
      if (msg.userId === this.seatTable?.userInfo.userId) {
        return;
      }
      const site = msg.site;
      if (typeof site === 'number' && site <= this.seatTotal) {
        const seatList = [...this.seatList];
        seatList[site - 1] = {
          viewerId: msg.userId,
          avatar: msg.pic,
          nickName: msg.nick,
        };
        this.seatList = seatList;
      }
      this.welcomeQueue.push(msg.nick);
      this.checkWelcomeTimer();
    },

    /** 检查欢迎定时器 */
    checkWelcomeTimer() {
      if (this.welcomeTimer) {
        return;
      }
      this.shiftWelcome();
      this.welcomeTimer = setInterval(() => {
        this.shiftWelcome();
      }, 2000);
    },

    /** 欢迎队列出队 */
    shiftWelcome() {
      if (this.welcomeQueue.length === 0) {
        this.destroyWelcomeTimer();
        return;
      }
      const nickName = this.welcomeQueue.shift();
      this.currentWelcome = nickName;
    },

    /** 销毁欢迎定时器 */
    destroyWelcomeTimer() {
      clearInterval(this.welcomeTimer);
      this.welcomeTimer = undefined;
      this.currentWelcome = undefined;
    },

    /** 获取当前用户的入座信息 */
    async getUserSeatInfo() {
      const data = await this.seatTable.getUserSeatInfo();
      if (typeof data.seatMaxNumber === 'number' && data.seatMaxNumber) {
        this.seatTotal = data.seatMaxNumber;
        this.resetSeatList();
      }
      if (data.viewerSeatEnabled === 'Y') {
        this.refreshSeatList();
      }
      this.innerViewerSeatEnabled = data.viewerSeatEnabled;
    },

    resetSeatList() {
      const list = this.seatList.slice(0, this.seatTotal);

      if (list.length < this.seatTotal) {
        const len = list.length;
        for (let i = 0; i < this.seatTotal - len; i++) {
          list.push({});
        }
      }

      this.seatList = list;
    },

    /** 刷新座位列表 */
    async refreshSeatList() {
      if (!this.seatTable) {
        return;
      }
      const list = await this.seatTable.getSeatList();
      this.formateSeatList(list);
    },

    /** 格式化座位列表，补充空位 */
    formateSeatList(list = []) {
      const _list = [...this.seatList];
      list.forEach((item, index) => {
        if (item.viewerId === this.seatTable?.userInfo.userId) {
          item.isCurrent = true;
        }
        _list[index] = item;
      });

      this.seatList = _list;
      return _list;
    },

    /** 保存座位 */
    async saveSeat() {
      const seat = await this.seatTable.saveSeat();
      this.currentSeat = seat.seatNumber;
      await this.refreshSeatList();
      this.innerViewerSeatEnabled = 'Y';
      this.showTips = true;
      setTimeout(() => {
        this.toCurrentSeat();
      }, 50);
    },

    /** 前往当前座位 */
    toCurrentSeat() {
      if (!this.$refs.seatList) {
        return;
      }
      const cellRefs = this.$refs.seatList.getCellRefs() || [];
      let currentRef;
      for (let i = 0; i < cellRefs.length; i++) {
        const cellRef = cellRefs[i];
        if (cellRef.isCurrent) {
          currentRef = cellRef;
          break;
        }
      }
      // 找不到自己的座位
      if (!currentRef) {
        return;
      }

      const currentElem = currentRef.$el;
      const currentRect = currentElem.getBoundingClientRect();
      const wrapRect = this.$el.getBoundingClientRect();

      // 是否需要滚动
      if (!(currentRect.top >= wrapRect.top && currentRect.bottom <= wrapRect.bottom)) {
        currentElem.scrollIntoView({
          block: 'center'
        });
      }
      currentRef.showAnimation();
    },

    /** 防抖处理滚动事件 */
    handleScroll: debounce(function() {
      this.checkAvatarLazyLoad();
    }, 200),

    /** 检查座位头像懒加载 */
    checkAvatarLazyLoad(scrollEl) {
      if (!this.$refs.seatList) {
        return;
      }
      const cellRefs = this.$refs.seatList.getCellRefs() || [];
      cellRefs.forEach((cellRef) => {
        cellRef.checkLazyLoad(scrollEl);
      });
    },
  },
};
