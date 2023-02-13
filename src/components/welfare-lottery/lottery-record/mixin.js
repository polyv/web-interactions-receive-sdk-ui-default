import throttle from 'lodash-es/throttle';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    sdk: null,
    prize: {
      type: Object,
      default: () => ({})
    },
    isShowCustomLottery: null,
    linkSkipEnabled: Boolean,
  },
  data() {
    return {
      list: [],
      // 当前页码
      pageNumber: 1,
      // 总页码
      totalPages: 1,
      // 中奖者分行列表
      winnerGroups: [],
      // 上次滚动scrollTop
      lastScrollTop: null,
      // 是否加载中
      isLoading: false,
      receiveData: {},
      showReceiveModal: false,
      showLoading: false,
      index: 0,
      lotteryId: '',
    };
  },
  computed: {
    inviteType() {
      return this.prize.inviteType || 'poster';
    },
  },
  mounted() {
    this.getLotteryWinList();
  },
  methods: {
    formatDate(time) {
      const temp = new Date(time);
      const a = temp.toLocaleDateString().replace(/\//g, '.');
      const b = temp.toTimeString().slice(0, 5);
      return `${a} ${b}`;
    },
    handleClose() {
      this.$emit('close');
    },
    handleBack() {
      this.$emit('back');
    },
    handleRecordItemClick(item, index) {
      this.index = index;
      this.lotteryId = item.lotteryId;
      this.getLotteryPrize(this.lotteryId, item);
    },
    async getLotteryWinList() {
      if (this.pageNumber > this.totalPages || this.isLoading) {
        return;
      }
      this.isLoading = true;
      const res = await this.sdk.getLotteryWinList({
        pageNumber: this.pageNumber,
      });
      this.isLoading = false;
      if (res && res.code === 200 && res.data) {
        this.pageNumber++;
        this.totalPages = res.data.totalPages;
        this.list = this.list.concat(res.data.contents.map(item => {
          item.formatType = 0;
          if (item.acceptType === 'link' || item.acceptType === 'qrCode' || item.hasObtain) {
            item.formatType = 1;
          }
          return item;
        }));
      }
    },
    async getLotteryPrize(lotteryId) {
      if (!this.sdk) return;
      this.showLoading = true;
      const res = await this.sdk.getLotteryPrize(lotteryId);
      this.showLoading = false;
      if (res && res.code === 200) {
        this.receiveData = { ...res.data };
        this.checkLotteryPrize();
      }
    },
    checkLotteryPrize() {
      const obj = {
        type: this.receiveData.acceptType === 'link' ? 'seeLottery' : 'getLottery',
        data: this.receiveData
      };
      this.$emit('lottery-callback', obj);
      // 是否显示自定义抽奖，如果是的话，将屏蔽sdk自带的流程，
      if (this.isShowCustomLottery) {
        this.handleClose();
      } else {
        if (this.receiveData.acceptType === 'link') {
          // 是否禁用内部跳转
          if (this.linkSkipEnabled) {
            window.location.href = this.receiveData.prizeUrl;
          }
        } else {
          this.showReceiveModal = true;
        }
      }
    },
    hideReceiveModal() {
      this.showReceiveModal = false;
    },
    onScroll: throttle(function(e) {
      const $el = e.target;
      // 下滑
      if (this.lastScrollTop &&
        $el.scrollTop - this.lastScrollTop > 0 &&
        $el.scrollHeight - $el.clientHeight - $el.scrollTop <= 100
      ) {
        this.getLotteryWinList();
      }
      this.lastScrollTop = $el.scrollTop;
    }, 500),
    async handleSubmit(fields) {
      if (!this.sdk) return;
      const data = {
        lotteryId: this.lotteryId,
        winnerCode: this.receiveData.winnerCode,
        receiveInfo: fields,
      };
      this.receiveData.formList = fields;
      const res = await this.sdk.submitInfo(data);
      if (res && res.code === 200) {
        this.$set(this.receiveData, 'hasObtain', true);
        const temp = this.list[this.index];
        temp.hasObtain = true;
        temp.formatType = 1;
        this.list.splice(this.index, 1, temp);
      }
    }
  }
};
