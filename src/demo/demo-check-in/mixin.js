import { CheckIn } from '@polyv/interactions-receive-sdk';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      // 签到 SDK 实例
      checkInSdk: null,
      // 是否展示签到
      isShowCheckIn: false,
    };
  },

  created() {
    this.checkInSdk = new CheckIn();
  },

  [BEFORE_DESTROY]() {
    this.destroy();
  },

  methods: {
    onSetCheckInVisible(isShowCheckIn) {
      this.isShowCheckIn = isShowCheckIn;
    },

    destroy() {
      this.checkInSdk && this.checkInSdk.destroy();
      this.checkInSdk = null;
    },
    check() {
      this.checkInSdk.toCheckIn();
    }
  },
};
