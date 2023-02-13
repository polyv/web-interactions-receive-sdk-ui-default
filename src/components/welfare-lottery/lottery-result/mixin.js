import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    sdk: null,
    isShowCustomLottery: null,
    linkSkipEnabled: Boolean,
    lotteryId: String,
    isAppleMod: Boolean,
    isQuestionCondition: Boolean
  },
  data() {
    return {
      showReceiveModal: false,
      lotteryData: {},
      receiveData: {},
      isWinner: false,
      winnerCode: '',
      showLoading: true,
      lastLotteryId: ''
    };
  },
  computed: {
    userId() {
      return this.sdk ? this.sdk.userInfo.userId : '';
    },
  },
  watch: {
    isWinner(nv) {
      if (nv) {
        this.getLotteryPrize();
      }
    }
  },
  mounted() {
    this.getWelfareLotteryDetail();
  },
  methods: {
    async getWelfareLotteryDetail() {
      if (!this.sdk) return;
      const res = await this.sdk.getWelfareLotteryDetail(this.lotteryId);
      if (res && res.code === 200) {
        let data = res.data || { winnerIds: [] };
        // 答题抽奖结果-从最后一次子抽奖中获取中奖结果
        if (data.lotteryCondition === this.sdk.lotteryCondition.QUESTION && data.lastLotteryId) {
          this.lastLotteryId = data.lastLotteryId;
          const result = await this.sdk.getWelfareLotteryDetail(`${this.lotteryId}/${data.lastLotteryId}`);
          data = result.data || { winnerIds: [] };
        }
        this.lotteryData = { ...data };
        this.isWinner = this.binarySearch(data.winnerIds, this.userId) !== -1;
      }
      this.showLoading = false;
    },
    async getLotteryPrize() {
      if (!this.sdk) return;
      const lotteryId = this.lastLotteryId || this.lotteryId;
      const res = await this.sdk.getLotteryPrize(lotteryId);
      if (res && res.code === 200) {
        this.receiveData = { ...res.data };
        this.winnerCode = res.data.winnerCode;
      }
    },
    binarySearch(arr = [], target) {
      let left = 0;
      let right = arr.length - 1;
      while (left <= right) {
        const mid = Math.floor((right + left) / 2);
        if (arr[mid] === target) {
          return mid;
        } else if (arr[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return -1;
    },
    handleClose() {
      this.$emit('close');
    },
    handleWinnerList() {
      this.$emit('winner-list', this.lastLotteryId);
    },
    handleRecord() {
      this.$emit('record');
    },
    handleReceive() {
      // 如果是外部邀请
      // if (this.lotteryData.inviteType === 'external')

      const obj = {
        type: 'getLottery',
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
    async handleSubmit(fields) {
      if (!this.sdk) return;
      const data = {
        lotteryId: this.receiveData.lotteryId,
        winnerCode: this.winnerCode,
        receiveInfo: fields,
      };
      this.receiveData.formList = fields;
      const res = await this.sdk.submitInfo(data);
      if (res && res.code === 200) {
        this.$set(this.receiveData, 'hasObtain', true);
      }
    }
  }
};
