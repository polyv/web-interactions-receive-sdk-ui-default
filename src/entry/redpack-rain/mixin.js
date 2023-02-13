import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/redpack-rain';
import { preloadImages } from '../../assets/utils/utils';
import { isWorkWeixin, isWeixin, isMobile } from '@polyv/utils/src/browser';
import { append } from '@polyv/utils/src/querystring';
import { showTip } from '../red-envelope/showTip';
import { local } from '@polyv/utils/src/storage';

const STATUS_STORAGE_KEY = 'red_envelope_status_';

// 红包雨过程状态
export const allStatus = {
  begining: 'begining', // 显示开场动画中
  onGoing: 'onGoing', // 点击红包进行中
  showSummary: 'showSummary', // 显示整场红包雨总结数据
  showFinish: 'showFinish', // 显示红包雨结束弹窗(红包被领完)
  showNotWechat: 'showNotWechat', // 显示在微信打开弹窗
};
export default {
  langs,

  mixins: [entryMixin],

  props: {
    redpackRain: {
      type: Object,
      default: () => null,
    },
    // 红包提现入口
    withDrawEnabled: {
      type: Boolean,
      default: true
    },
    redirectUrl: {
      type: String,
      default: ''
    },
    // 频道设置积分单位
    unit: {
      type: String,
      default: ''
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  provide() {
    return {
      redpackRainVm: this,
      customImgConfig: this.customImgConfig
    };
  },

  data() {
    return {
      redPackReceive: {},
      redpackRainData: {},
      // 红包雨组件是否显示
      isRedpackRainVisible: false,
      // 当前进行中的标识数据
      redCacheId: '',
      redpackId: '',
      // 祝福语
      greeting: '',
      // 持续时间
      duration: 15,
      // 发起者昵称
      nickname: '',
      // 发起者头像
      avatar: '',
      // 频道号
      channelId: '',
      // 红包雨进行状态集合
      allStatus: {
        ...allStatus
      },
      // 红包雨进行状态
      status: '',
      // 开红包当次结果
      grabResult: null,
      // 实际抢红包领取金额
      realGrabAmount: null,
    };
  },

  watch: {
    redpackRain: {
      immediate: true,
      handler() {
        this.listenSdkEvent();
        if (this.redpackRain) {
          this.channelId = this.redpackRain.channelInfo.channelId;
        }
      },
    },
    customImgConfig: {
      immediate: true,
      handler(val) {
        if (val?.rainThemeBottomBgImg || val?.rainThemeBollImgArray) {
          this.preloadImages(val);
        }
      }
    },
    isRedpackRainVisible() {
      this.$emit('visible-change', this.isRedpackRainVisible);
    }
  },

  computed: {
    channelQRCode() {
      return append('https://live.polyv.net/qrcode', { url: this.watchUrl });
    },

    watchUrl() {
      return `${location.origin}/watch/${this.channelId}`;
    },
    customUrl() {
      return append('https://live.polyv.net/qrcode', { url: this.redirectUrl });
    },
    codeUrl() {
      return this.redirectUrl ? this.customUrl : this.channelQRCode;
    }
  },

  methods: {
    // 图片预加载
    async preloadImages(val) {
      const images = [];
      val.rainThemeBottomBgImg !== '' && images.push(val.rainThemeBottomBgImg);
      val.rainThemeBollImgArray && images.push(...val.rainThemeBollImgArray);
      preloadImages(images);
    },

    /**
     * 测试代码，模拟一次发起红包雨的socket
     */
    testCallback() {
      const data = {
        EVENT: 'REDPAPER',
        content: '恭喜发财，大吉大利',
        msgSource: 'redpaper',
        msgType: 'REDPAPER',
        number: 1,
        redCacheId: '02e589e6',
        redpackId: 'a61385233c43445cb0c634ac1c05382f',
        timestamp: 1635306935530,
        totalAmount: 0.98,
        type: 'score_rain',
        user: {
          nick: '讲师7272',
          pic: '//s1.videocc.net/default-img/avatar/teacher.png',
        },
      };
      this.handleRedpaperEvent(data);
    },

    setData(newData) {
      Object.keys(newData).forEach(key => {
        this[key] = newData[key];
      });
    },

    /** 监听 sdk 事件 */
    listenSdkEvent() {
      if (!this.redpackRain) {
        return;
      }
      const { events } = this.redpackRain;
      this.redpackRain.on(events.REDPAPER_RAIN, this.handleRedpaperEvent);
      // this.testCallback();
    },

    /** 处理红包消息 */
    handleRedpaperEvent(msg) {
      // 非红包雨，不处理
      if (!msg.type.includes('rain')) {
        return;
      }
      // 上一场红包雨还在进行中，不处理
      if (this.status || this.isRedpackRainVisible) {
        return;
      }
      const { content, redCacheId, redpackId, nickname, avatar, user = {}, blessing, greeting, type } = msg;
      this.redpackRainData = msg;
      this.nickname = nickname || user.nick;
      this.avatar = avatar || user.pic;

      // 微信环境，准备调用接口参与红包雨
      this.showRedpackRain({
        redCacheId,
        redpackId,
        source: 'socket',
        nickname: user.nick,
        avatar: user.pic,
        greeting: content || blessing || greeting,
        type
      });
    },

    /**
     * 展示红包雨
     * @param {string} optinos.source 触发展示红包雨的行为来源，socket(socket事件自动触发)、msg(点击聊天消息触发)或widget(点击挂件触发)
     * @param {string} options.nickname 发起人昵称
     * @param {string} options.avatar 发起人头像地址
     */
    showRedpackRain({ redCacheId, redpackId, source, nickname, avatar, greeting, type, user } = {}) {
      this.nickname = nickname || user.nick;
      this.avatar = avatar || user.pic;
      this.greeting = greeting;
      // TODO 积分红包在移动端展示
      if (!(isMobile() && type.includes('score')) && (!isWeixin() || isWorkWeixin())) {
        // 非微信环境，显示提示
        this.showNotWechatModal();
        return;
      }
      this.setData({
        redCacheId,
        redpackId,
        grabResult: null,
        realGrabAmount: null,
      });
      if (this.redpackRain) {
        try {
          this.redpackRain.joinRedpackRain({
            redCacheId,
            redpackId,
            source,
            success: (data) => {
              this.handleJoinedSuccess(data);
            },
            error: (res) => {
              this.handleJoinedError(res);
            },
          });
        } catch (e) {
          console.error(e);
        }
      }
    },

    /**
     * 回调红包状态
     * 抢光了：none_redpack
     * 过期：expired
     * 抢到了：received
     * 未领取：noReceive
     */
    emitStateChange(state, redpackId = this.redpackId) {
      local.set(STATUS_STORAGE_KEY + this.redpackId, state);
      this.$emit('state-change', {
        redpackId,
        state,
      });
    },

    /**
     * 处理加入红包雨成功
     */
    handleJoinedSuccess(data) {
      if (this.redpackRain) {
        const { RedpackRainReceiveStatus } = this.redpackRain;
        const { receiveStatus, receiveData = {} } = data;
        const newData = {
          isRedpackRainVisible: true,
        };
        switch (receiveStatus) {
          case RedpackRainReceiveStatus.NonReceived: {
            this.emitStateChange('received');
            // 红包抢过，抢失败
            newData.status = allStatus.showSummary;
            newData.realGrabAmount = 0;
            break;
          }
          case RedpackRainReceiveStatus.Received: {
            this.redPackReceive = receiveData;
            this.emitStateChange('received');
            const { amount } = receiveData;
            // 红包抢过，抢到
            newData.status = allStatus.showSummary;
            newData.realGrabAmount = amount;
            break;
          }
          case RedpackRainReceiveStatus.Joined: {
            // 还有红包金额，且未领取过，可以参与
            newData.status = allStatus.begining;
            this.emitStateChange('received');
            break;
          }
          default: {
            this.emitStateChange('none_redpack');
            // 红包已抢完
            newData.status = allStatus.showFinish;
          }
        }
        this.setData(newData);
      }
    },

    /**
     * 处理加入红包失败
     */
    handleJoinedError(res = {}) {
      const { error = {} } = res;
      const { code } = error;
      switch (code) {
        case 8050:
        case 5570: {
          // 非微信打开
          this.showNotWechatModal();
          break;
        }
        case 5571: {
          this.emitStateChange('none_redpack');
          // 红包已抢光
          this.showFinish();
          break;
        }
        case 5572: {
          this.emitStateChange('expired');
          // 红包过期
          this.showFinish();
          break;
        }
        default: {
          const error = res.data.error;
          showTip(error.desc);
        }
      }
    },

    /**
     * 显示红包雨完成
     */
    showFinish() {
      this.setData({
        isRedpackRainVisible: true,
        status: allStatus.showFinish,
      });
    },

    /**
     * 显示非微信提示(用于外部调用)
     */
    showNotWechatModal() {
      this.status = allStatus.showNotWechat;
      this.isRedpackRainVisible = true;
    },

    /** 确认关闭红包雨 */
    handleClose() {
      this.status = '';
      this.isRedpackRainVisible = null;
      this.grabResult = null;
      this.realGrabAmount = null;
    },
  },
};
