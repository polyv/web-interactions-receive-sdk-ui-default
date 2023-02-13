import { RedEnvelope } from '@polyv/interactions-receive-sdk';
import redEnvelopeLangConfig from './langs/red-envelope';

export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    },
    redpackBar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const imgUrl = 'https://s0.2mdn.net/simgad/576977854144812168';
    return {
      redEnvelopeLangConfig,
      customImgConfig: {
        // 消息封面图
        normalEntranceImg: imgUrl,
        passwordEntranceImg: imgUrl,
        rainEntranceImg: imgUrl,

        // 挂件图
        normalPendantImg: imgUrl,
        passwordPendantImg: imgUrl,
        rainPendantImg: imgUrl,

        // 普通红包和口令红包-弹出封面图
        redpackCoverImg: imgUrl,

        // 红包雨-弹出层顶部背景图
        rainModalTopBgImg: imgUrl,
        // 红包雨-弹出层右侧挂件图
        rainModalRightPendantImg: 'https://liveimages.videocc.net/uploaded/images/2022/08/gcgnw0prx5.png',

        // 红包雨开始倒计时图
        redpackBeginingBgImg: 'https://s0.2mdn.net/simgad/5769778541448121689',

        // 红包雨动画-底部背景图
        rainThemeBottomBgImg: 'https://liveimages.videocc.net/uploaded/images/2022/08/gcgnw53p23.png',
        // 红包雨动画-飘落图 (随机选择数组图片)
        rainThemeBollImgArray: ['https://liveimages.videocc.net/uploaded/images/2022/08/gcgnw0prx5.png'],
      },
      // 红包 SDK 实例
      redEnvelopeSdk: null,
      // 入口（即聊天区域红包）数据
      redEnvelopeEntranceData: [],
      // 红包弹窗数据
      redEnvelopeData: null,
      openId: 'ovtl9t2rFdDVTBbVzmmBOwDrLj7k',
      coverImg: '',
      // coverImg: 'https://demo2.polyv.net/linxiaoru/2021101405.jpeg',
      showRedEnvelope: false,
      showPendant: false,
      redEnvelopeDelayData: null,
      getNewestRequestEnd: true,
      autoToggle: true,
    };
  },
  computed: {
    isFullScreen() {
      return false;
    },
  },

  created() {
    this.redEnvelopeSdk = new RedEnvelope();
    // this.redEnvelopeSdk.onMsg(JSON.stringify({
    //   EVENT: 'REDPAPER_FOR_DELAY',
    //   delayTime: 5940,
    //   blessing: '恭喜发财，大吉大利',
    //   nick: '主讲',
    //   pic: '//livestatic.videocc.net/assets/wimages/missing_face.png',
    //   type: 'official_normal'
    // }));
  },

  mounted() {
    this.redEnvelopeEntranceData.push(
      {
        user: {
          nick: '主讲',
          openId: 'ovtl9t2rFdDVTBbVzmmBOwDrLj7k',
          pic: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoibM43WGgK7WmmhbzDFY8OKiaV9uPI6Y8qw2GtLibLG4LiaMicVm8iakwViazgsIyUXUQsaIa2OkOInSBgw/132',
          // roomId: '2627035',
          roomId: '1362678',
        },
        // accountId: '386927deb9',
        accountId: 'e9x6efh6qq',
        // content: '啊啊啊',
        content: '恭喜发财,大吉大利',
        // id: '0689c2d0-4130-11ec-abcd-3906a37f9600',
        id: '8a9331d0-fb5f-11ec-ab34-2ba8b91a6b4d',
        // content: '啊啊啊',
        msgSource: 'redpaper',
        // msgType: 'REDPAPER', // socket没有
        number: 2,
        // redCacheId: 'bac9370a',
        redCacheId: '993311b8',
        // redpackId: '2aeedaa966d64d099bad5282f67f0bee',
        redpackId: '032b6114eb0c45ac8c9d7b011df69705',
        totalAmount: 2,
        // type: 'score_official_normal', // socket type
        // type: 'password', // socket type
        type: 'alipay_password_official_normal', // socket type
        // redPackType: 'normal', // api type
        // redPackType: 'SCORE_RAIN', // api type
        timestamp: 1666063147377,
        // time: '1636439850226',
        // scoreUnit: '波豆'
      },
      {
        EVENT: 'REDPAPER',
        content: '恭喜发财，大吉大利',
        msgSource: 'redpaper',
        number: 1,
        redCacheId: 'bc4163f0',
        redpackId: '83bf16ffe75d46b3a7c23025373c5ab2',
        timestamp: 1666064668607,
        type: 'score_official_normal',
        user: {
          nick: 'lins',
          openId: '1362678',
          pic: 'https://s1.videocc.net/default-img/avatar/viewer.png',
          roomId: '1362678',
        },
      }
    );
    if (!this.autoToggle) {
      // 是否有延时红包
      this.getNewest();
      this.handleVisibilitychange();
    }
  },

  watch: {
    redEnvelopeSdk: {
      immediate: true,
      handler() {
        this.handleRedPaper = this.handleRedPaperEvent.bind(this);
        this.handleRedPaperDelay = this.handleRedPaperDelayEvent.bind(this);
        this.bindAppEvents();
      }
    },
  },

  methods: {
    handleClickEntrance(id) {
      this.redEnvelopeData = this.redEnvelopeEntranceData.find(item => item.id === id);
      // this.showRedEnvelope = true;
    },
    handleCloseRedEnvelope() {
      // this.showRedEnvelope = false;
      this.redEnvelopeData = null;
    },
    handleStatusChange(redpackId, status) {
      console.info('>>>handleStatusChange', {
        redpackId,
        status
      });
      // this.$refs.entrance.updateStatus(status);
    },
    // 是否有延时红包
    async getNewest() {
      this.getNewestRequestEnd = false;
      const result = await this.redEnvelopeSdk.getNewest();
      // const result = {
      //   code: 200,
      //   message: '',
      //   error: null,
      //   status: 'success',
      //   data: {
      //     // redpackId: '97aa6d129b7e4c6991542fdcd5e73777',
      //     // redCacheId: '061d0694',
      //     // greeting: '恭喜发财，大吉大利',
      //     // avatar: '//liveimages.videocc.net/uploaded/images/2019/07/fef0esbefi.jpg',
      //     // nickname: '讲师',
      //     // timeEnabled: 'Y',
      //     // serverTime: 1651112145029,
      //     // sendTime: 1651116307000,
      //     // redpackType: 'OFFICIAL_NORMAL',
      //     // TODO:支付宝口令红包
      //     redpackId: 'c10d61e3ed0b47898d321e08deee9727',
      //     redCacheId: 'ea71218d',
      //     greeting: '恭喜发财，大吉大利',
      //     avatar: 'https://s1.videocc.net/default-img/avatar/viewer.png',
      //     nickname: 'lins',
      //     timeEnabled: 'Y',
      //     serverTime: 1666086557918,
      //     sendTime: 1666087672000,
      //     redpackType: 'ALIPAY_PASSWORD_OFFICIAL_NORMAL',
      //   }
      // };
      const { code, data } = result;
      const delayTime = data ? Math.round((data.sendTime - data.serverTime) / 1000) : 0;
      if (code === 200 && data && data.timeEnabled === 'Y' && delayTime > 0) {
        this.redEnvelopeDelayData = {
          ...data,
          pic: data.avatar,
          type: data.redpackType,
          delayTime
        };
        this.showPendant = true;
      }
      this.getNewestRequestEnd = true;
    },
    // 监听红包相关事件
    bindAppEvents() {
      const redEnvelopeSdk = this.redEnvelopeSdk;
      if (!redEnvelopeSdk) { return; }
      redEnvelopeSdk
        .on(redEnvelopeSdk.events.REDPAPER, this.handleRedPaper)
        .on(redEnvelopeSdk.events.REDPAPER_FOR_DELAY, this.handleRedPaperDelay);
    },
    // 取消监听红包相关事件
    unbindAppEvents() {
      const redEnvelopeSdk = this.redEnvelopeSdk;
      if (!redEnvelopeSdk) { return; }
      redEnvelopeSdk
        .off(redEnvelopeSdk.events.REDPAPER, this.handleRedPaper)
        .off(redEnvelopeSdk.events.REDPAPER_FOR_DELAY, this.handleRedPaperDelay);
    },
    handleRedPaperEvent(data) {
      // this.redEnvelopeData = data;
      this.redEnvelopeEntranceData.push(data);
      this.showPendant = false;
    },
    handleRedPaperDelayEvent(data) {
      this.redEnvelopeDelayData = data;
      this.showPendant = true;
    },
    handleCountDownEnd() {
      this.showPendant = false;
      this.redEnvelopeSdk.onMsg(JSON.stringify({
        EVENT: 'REDPAPER',
        content: '恭喜发财，大吉大利',
        msgSource: 'redpaper',
        number: 1,
        redCacheId: '66c91ff8',
        redpackId: '4887b882e2414a15a013f91aea4f0b52',
        timestamp: '1636008928144',
        totalAmount: 0.98,
        type: 'password',
        user: {
          nick: '主讲',
          openId: 'ovtl9t2rFdDVTBbVzmmBOwDrLj7k',
          pic: '//livestatic.videocc.net/assets/wimages/missing_face.png',
          roomId: '2627035'
        }
      }));
    },
    handleClickWidthdraw() {
      this.showRedEnvelope = false;
    },
    handleClickPoint() {
      this.showRedEnvelope = false;
      console.log('handleClickPointRecord');
    },
    handleOpenRainPacket() {
      const data = {
        amount: 200,
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/qMBibZkU4JTnnXePGK7Ly0Zn9Hibe06HZcvyVVECTiaYcTeTjCnvo21cbu5mK4W72ibNap71teZhfVcgXWU2hkjHog/132',
        channelSessionId: '',
        logId: '',
        nickname: '小梁老师',
        openId: '',
        redpackSendId: '',
        unionId: '',
        user: {
          nick: 'aaa',
          pic: 'asd'
        }
      };
      console.log(this.$refs.readpackRainEntrance.$refs.rainRedpack);
      this.$refs.readpackRainEntrance.$refs.rainRedpack.showRedpackRain({
        data,
        source: 'msg'
      });
    },
    test2SocketRedEnvelope() {
      this.redEnvelopeSdk.onRedPaper({
        EVENT: 'REDPAPER',
        content: '恭喜发财，大吉大利',
        msgSource: 'redpaper',
        number: 1,
        redCacheId: 'aa30cfd8',
        redpackId: 'd78500d7876c48a488bc587bad633c1a',
        timestamp: Date.now(),
        totalAmount: 0.98,
        type: 'official_normal',
        user: {
          nick: '讲师',
          openId: 'ovtl9t2rFdDVTBbVzmmBOwDrLj7k',
          pic: '//liveimages.videocc.net/uploaded/images/2019/07/fef0esbefi.jpg',
          roomId: '1362678',
        }
      });
    },
    handleRedEnvelopePendantVisibleChanged(show) {
      console.info('>>>red envelope pendant visible:', show);
    },
    handleVisibilitychange() {
      // 页面最近一次隐藏的时间
      let latestTime = Date.now();
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.getNewestRequestEnd && (Date.now() - latestTime) > 1000) {
          this.getNewest();
        }
        if (document.visibilityState === 'hidden') {
          latestTime = Date.now();
        }
      });
    }
  },
};
