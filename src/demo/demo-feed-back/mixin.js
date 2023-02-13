import { FeedBack } from '@polyv/interactions-receive-sdk';
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
      // 反馈 SDK 实例
      feedBackSdk: null,
      // 是否展示反馈
      isShowFeedBack: false,
    };
  },

  created() {
    this.feedBackSdk = new FeedBack();
  },
  [BEFORE_DESTROY]() {
    this.destroy();
  },

  methods: {
    onSetFeedBackVisible(isShowFeedBack) {
      this.isShowFeedBack = isShowFeedBack;
    },

    destroy() {
      this.feedBackSdk && this.feedBackSdk.destroy();
      this.feedBackSdk = null;
    },
  },
};
