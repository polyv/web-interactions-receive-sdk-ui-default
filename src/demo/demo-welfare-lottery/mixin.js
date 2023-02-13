import { WelfareLottery } from '@polyv/interactions-receive-sdk';
import langConfig from './langs/welfare-lottery';
import modalBgImg from './H5.png';
import appleEntrance from './style/apple/apple-entrance.png';

export default {
  data() {
    return {
      // 观看链接：用于扫码
      watchUrl: 'https://live.polyv.cn/watch/1362678',
      // 条件抽奖 SDK 实例
      welfareLotterySdk: null,
      isShowCustomLottery: false, // 是否显示自定义抽奖，如果是的话，将屏蔽sdk自带的流程
      linkSkipEnabled: true, // 是否开启链接跳转
      langConfig,
      comment: '',
      modalBgImg,
      isAppleMod: true,
    };
  },
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },
  computed: {
    entranceImg() {
      return this.isAppleMod ? appleEntrance : '';
    },
    isFullScreen() {
      return false;
    }
  },
  beforeMount() {
    if (this.isAppleMod) {
      import('./style/apple/welfareLottery.scss');
    }
  },
  mounted() {
    this.welfareLotterySdk = new WelfareLottery();
  },
  methods: {
    lotteryCallback(obj) {
      console.log(obj);
    },
    commentSuccess(msg) {
      console.log('commentSuccess', msg);
    },
    async sendComment() {
      const isBoolean = await this.welfareLotterySdk.isBooleanToCommentLottery(this.comment);
      console.log('sendComment', isBoolean);
      if (isBoolean) {
        this.welfareLotterySdk.finishCommentLottery();
      }
    }
  }
};
