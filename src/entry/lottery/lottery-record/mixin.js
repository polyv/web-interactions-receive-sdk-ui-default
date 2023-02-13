import lotteryMixin from '../lottery-mixin';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  mixins: [lotteryMixin],

  props: {
    lotterySdk: {
      type: Object,
    },
    // 兼容之前版本，抽奖结束后自动获取中奖记录列表
    autoFetchList: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      // 个人中奖记录
      lotteryList: [],
    };
  },

  watch: {
    lotterySdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
        this.$nextTick(() => {
          this.getLotteryRecord();
        });
      }
    }
  },

  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },

  methods: {
    bindAppEvents() {
      const lotterySdk = this.lotterySdk;
      if (!lotterySdk) { return; }
      lotterySdk.on(lotterySdk.events.SubmitInfoSuccess, this.getLotteryRecord);
      lotterySdk.on(lotterySdk.events.LotteryEnd, this.preGetLotteryRecord);
    },

    unbindAppEvents() {
      const lotterySdk = this.lotterySdk;
      if (!lotterySdk) { return; }
      lotterySdk.off(lotterySdk.events.SubmitInfoSuccess, this.getLotteryRecord);
      lotterySdk.off(lotterySdk.events.LotteryEnd, this.preGetLotteryRecord);
    },

    // 判断中奖者才获取中奖记录
    async preGetLotteryRecord(msg = {}) {
      if (!this.autoFetchList) {
        return;
      }
      const { isWinner } = msg;
      if (isWinner) {
        await this.delay(Math.floor(Math.random() * 2000));
        await this.getLotteryRecord();
      }
    },

    async getLotteryRecord() {
      let res;

      try {
        res = await this.lotterySdk.getLotteryRecord();
      } catch (e) {
        console.warn(e);
      }

      if (res) {
        this.lotteryList = res.data;
      }
      if (res?.data?.length) {
        this.$emit('lottery-list', this.lotteryList);
      }
    },

    onClickShowLottery(item) {
      if (item && !item.received) {
        this.$emit('submit-info', item);
      } else {
        this.$emit('check-info', item);
      }
    },
  },
};
