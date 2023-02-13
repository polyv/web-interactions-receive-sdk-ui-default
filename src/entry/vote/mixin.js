import { BEFORE_DESTROY } from '@/assets/utils/compat';
import entryMixin from '@/assets/mixins/entry';
import langs from '@/assets/locale/lang/vote';

if (!window.__isloggerVer2IRSUIDef) {
  window.__isloggerVer2IRSUIDef = true;
  console.info(`[interactions-receive-sdk-ui-default][version] ${APP_VERSION} / ${APP_BUILD_TIME}`);
}

export default {
  langs,
  mixins: [entryMixin],
  data() {
    return {
      list: [], // 投票项列表
      curVotedList: [], // 已投票项列表（投票成功的）
      cacheVotedList: [], // 已投票列表(可能存在投票失败)
      showTip: false, // 是否显示提示
      voteCbMsg: '', // 投票回调信息
      requestEnd: true,
    };
  },
  props: {
    voteSdk: Object,
    votedList: {
      type: Array,
      default: () => []
    },
  },
  watch: {
    voteSdk: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.onVoteStartHandler = this.onVoteStart.bind(this);
          this.onVoteStopHandler = this.onVoteStop.bind(this);
          this.onVoteResultHandler = this.onVoteResult.bind(this);
          this.onVoteDeleteAllHandler = this.onVoteDeleteAll.bind(this);
          this.onVoteDeleteHandler = this.onVoteDelete.bind(this);
          this.onVoteChangeOrderHandler = this.onVoteChangeOrder.bind(this);
          this.bindEvents();
          this.handleSocketConnect();
          this.getVoteList();
        }
      }
    },
    votedList: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.curVotedList.splice(0, this.curVotedList.length, ...newVal);
      }
    },
  },
  mounted() {
    this.curVotedList = this.votedList.slice(0);
  },
  [BEFORE_DESTROY]() {
    this.unbindEvents();
  },
  methods: {
    bindEvents() {
      const { events } = this.voteSdk;
      this.voteSdk
        .on(events.START, this.onVoteStartHandler)
        .on(events.STOP, this.onVoteStopHandler)
        .on(events.VOTE_RESULT, this.onVoteResultHandler)
        .on(events.DELETE_ALL, this.onVoteDeleteAllHandler)
        .on(events.DELETE, this.onVoteDeleteHandler)
        .on(events.UPDATE_VOTE_ORDER, this.onVoteChangeOrderHandler);
    },
    unbindEvents() {
      const voteSdk = this.voteSdk;
      if (!voteSdk) return;
      const { events } = voteSdk;
      voteSdk
        .off(events.START, this.onVoteStartHandler)
        .off(events.STOP, this.onVoteStopHandler)
        .off(events.VOTE_RESULT, this.onVoteResultHandler)
        .off(events.DELETE_ALL, this.onVoteDeleteAllHandler)
        .off(events.DELETE, this.onVoteDeleteHandler)
        .off(events.UPDATE_VOTE_ORDER, this.onVoteChangeOrderHandler);
    },
    /**
     * 根据ID查找投票信息
     * @returns 返回查找到的投票信息和对应的下标
     */
    findVoteById(id) {
      const index = this.list.findIndex((item) => {
        return item.id === id;
      });
      return [index, this.list[index]];
    },
    /**
     * 处理发起投票事件
     */
    onVoteStart(msg) {
      const id = msg.id;
      // 如果是之前发起过的投票，需要先移除
      const voteIndex = this.findVoteById(id)[0];
      if (voteIndex !== -1) {
        this.list.splice(voteIndex, 1);
      }
      const votedIndex = this.curVotedList.findIndex(item => item === id);
      if (votedIndex !== -1) {
        this.curVotedList.splice(votedIndex, 1);
      }
      const cacheIndex = this.cacheVotedList.findIndex(item => item === id);
      if (cacheIndex !== -1) {
        this.cacheVotedList.splice(cacheIndex, 1);
      }
      // 需要根据后台返回的顺序放到对应的位置
      this.list.splice(msg.voteOrder >= 1 ? msg.voteOrder - 1 : 0, 0, msg);
    },
    /**
     * 处理投票结束事件
     */
    onVoteStop(msg) {
      const stopVoteItem = this.findVoteById(msg.id)[1];
      if (stopVoteItem) {
        stopVoteItem.status = 'N';
      }
    },
    /**
     * 处理投票结果事件
     */
    onVoteResult(msg) {
      msg.list.forEach(element => {
        const item = this.findVoteById(element.id)[1];
        item.showVoteCount = true;
        item.voteCount = element.times;
      });
    },
    /**
     * 处理投票清空事件
     */
    onVoteDeleteAll() {
      // 在投票中活动不会被清除
      this.list.splice(0, this.list.length);
    },
    /**
     * 处理投票删除事件
     */
    onVoteDelete(msg) {
      const index = this.findVoteById(msg.id)[0];
      if (index !== -1) {
        this.list.splice(index, 1);
      }
    },
    /**
     * 处理投票更改顺序事件
     */
    onVoteChangeOrder(msg) {
      const index = this.findVoteById(msg.id)[0];
      // 还未发起的投票也可以进行拖拽
      if (index !== -1) {
        const data = this.list[index];
        this.list.splice(index, 1);
        // order的顺序从1开始的
        this.list.splice(msg.newOrder - 1, 0, data);
      }
    },
    /**
     * 获取投票活动列表
     */
    async getVoteList() {
      if (this.requestEnd) {
        this.requestEnd = false;
        const res = await this.voteSdk.getVoteList();
        this.requestEnd = true;
        if (res && res.code === 200) {
          this.list = res.data.list;
        }
      }
    },
    /**
     * 对选项进行投票
     */
    async handleToVote(id) {
      // 防止多次提交
      if (this.cacheVotedList.indexOf(id) === -1) {
        this.cacheVotedList.push(id);
        const res = await this.voteSdk.toVote(id);
        if (res.code === 200) {
          this.curVotedList.push(id);
          this.voteCbMsg = this.iarTrans('vote.tip2');
        } else if (res.message === '你之前已经投过票') {
          this.voteCbMsg = this.iarTrans('vote.tip3');
          this.curVotedList.push(id);
        } else {
          this.voteCbMsg = res.message;
          // 由于等待当前投票返回的时候可能对其他选项进行了投票，所以需要重新获取下标
          const index = this.cacheVotedList.indexOf(id);
          this.cacheVotedList.splice(1, index);
        }
        this.showTip = true;
        setTimeout(() => {
          this.showTip = false;
        }, 2000);
      }
    },
    /**
     * socket重连需要重新请求投票列表
     */
    handleSocketConnect() {
      const target = this.voteSdk.store.chat || this.voteSdk.store.socket;
      if (target) {
        target.on('connect', this.getVoteList);
      }
    },
  },
};
