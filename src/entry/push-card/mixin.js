// 卡片推送
import { ynToBool } from '@polyv/utils/src/boolean';
import { local } from '@polyv/utils/src/storage';
import { isMobile } from '@polyv/utils/src/browser';
import Polling from '@polyv/utils/src/polling';
import entryMixin from '@/assets/mixins/entry';
import langs from '@/assets/locale/lang/push-card';
import redpackBox from './images/redpack-box.png';
import giftBox from './images/gift-box.png';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  langs,

  mixins: [entryMixin],

  props: {
    pushCardSdk: {
      type: Object,
      default: null,
    },
    // 卡片入口提示文案位置：left/right
    tipPosition: {
      type: String,
      default: 'left'
    },
    // 是否禁用内部跳转
    linkSkipEnabled: {
      type: Boolean,
      default: true
    },
    // 观看倒计时结束后，是否自动打开卡片
    countdownAutoOpen: {
      type: Boolean,
      default: true
    },
    // 是否由内部去统计卡片打开情况
    internal: {
      type: Boolean,
      default: false
    },
    iframeSize: {
      type: Object,
      default: () => {
        return {
          pcW: 720,
          pcH: 540,
          mobW: '100%',
          mobH: 460
        };
      }
    },
  },

  data() {
    return {
      // 房间号
      roomId: '',
      visible: false,
      // 卡片倒计时剩余时长
      remainingTime: 0,
      // 卡片信息
      cardInfo: {},
      // 圆环周长
      len: 0,
      // 上圆环（运动圆环）
      circle: null,
      // 卡片总时长
      totalTime: 0,
      // 卡片(自动关闭)倒计时器
      polling: null,
      // 卡片弹出倒计时器
      popUpPolling: null,
      // 距离卡片弹出剩余时间（秒）
      popUpLeftTime: 0,
      // 距离卡片弹出倒计时文案消息剩余时间（秒）
      countdownMsgHideLeftTime: 3,
      // 卡片是否在推送中
      onPushing: false,
      // 卡片ID
      cardId: '',
      // 获取卡片时间是否已返回
      getResidueTimeEnd: true,
      // 卡片弹窗是否已经插入到页面
      isAppend: false,
      iframeLink: '',
      iframeVisible: false,
      isMobile: isMobile(),
    };
  },
  computed: {
    // 卡片推送入口显示隐藏
    entryVisible() {
      return (this.entranceEnabled || this.popUpLeftTime > 0) && this.onPushing;
    },
    // 卡片样式
    cardStyle() {
      return this.cardInfo.imageType || 'redpack';
    },
    // 卡片标题
    content() {
      return this.cardInfo.title;
    },
    // 点击卡片要跳转的链接
    link() {
      return this.cardInfo.link;
    },
    // 有倒计时
    hasCountDown() {
      return this.cardInfo.duration > 0;
    },
    // 卡片是否立即弹出
    isPushCondition() {
      return this.cardInfo.showCondition === 'PUSH';
    },
    // 倒计时文案
    countdownMsg() {
      return this.cardInfo.countdownMsg;
    },
    // 是否有卡片推送入口
    entranceEnabled() {
      return ynToBool(this.cardInfo.enterEnabled || 'N');
    },
    // 没有入口，立即弹出时倒计时由服务端控制
    isShowByServer() {
      return !this.entranceEnabled && this.isPushCondition;
    },
    // 是否为自定义模板
    isCustomType() {
      return this.cardStyle === 'custom';
    },
    cardImage() {
      return this.cardInfo.cardImage;
    },
    enterImage() {
      return this.cardInfo.enterImage;
    },
    iconUrl() {
      return this.isCustomType ? this.enterImage : this.cardStyle === 'giftbox' ? giftBox : redpackBox;
    },
    isCardpushIframe() {
      return this.cardInfo.redirectType === 'iframe';
    },
    modalWidth() {
      return this.isMobile ? this.iframeSize.mobW : this.iframeSize.pcW;
    },
    modalHeight() {
      return this.isMobile ? this.iframeSize.mobH : this.iframeSize.pcH;
    },
  },

  watch: {
    entryVisible: {
      immediate: true,
      handler(val) {
        this.$emit('entry-visible-changed', val);
      }
    },
    pushCardSdk: {
      immediate: true,
      handler() {
        this.startHandler = this.onStart.bind(this);
        this.cancelHandler = this.onCancel.bind(this);
        this.getResidueTimeHandler = this.onGerResidueTime.bind(this);
        this.bindAppEvents();
      },
    },
    visible(newVal) {
      if (newVal) {
        this.showModal();
        if (this.hasCountDown) {
          this.initPolling();
          this.$nextTick(() => {
            if (this.circle) {
              this.len = 2 * Math.PI * this.circle.getAttribute('r');
            } else if (this.$refs.cardCirclePath) {
              this.circle = this.$refs.cardCirclePath;
              this.len = 2 * Math.PI * this.circle.getAttribute('r');
              this.circle.style.strokeDasharray = this.len;
            }
          });
        }
      } else {
        // 主动关闭卡片弹窗，需要通知聊天室
        this.remainingTime = this.totalTime + 1;
        this.len = 0;
        this.stopPolling();
      }
      this.$emit('visible-changed', newVal);
    },
    // 轮询剩余时长，更新倒计时
    remainingTime(newVal) {
      // 需要倒计时显示到0再隐藏
      if (newVal >= 0) {
        const newValue = this.len - (newVal / this.totalTime) * this.len;
        if (this.circle) {
          this.circle.style.strokeDashoffset = newValue;
        }
      } else {
        // 倒计时结束,停止轮询
        this.stopPolling(false);
        // 如果没有倒计时,则不关闭卡片
        if (!this.hasCountDown) return;
        this.handleClose();
      }
    },
  },

  [BEFORE_DESTROY]() {
    if (this.$refs.cardModal && this.$refs.cardModal.parentNode) {
      this.$refs.cardModal.parentNode.removeChild(this.$refs.cardModal);
    }
    this.unbindAppEvents();
    this.stopPolling();
  },

  methods: {
    bindAppEvents() {
      const pushCardSdk = this.pushCardSdk;
      if (!pushCardSdk) { return; }
      pushCardSdk.on(pushCardSdk.events.START, this.startHandler);
      pushCardSdk.on(pushCardSdk.events.CANCEL, this.cancelHandler);
      pushCardSdk.on(pushCardSdk.events.GET_RESIDUE_TIME, this.getResidueTimeHandler);
    },

    unbindAppEvents() {
      const pushCardSdk = this.pushCardSdk;
      if (!pushCardSdk) { return; }
      pushCardSdk.off(pushCardSdk.events.START, this.startHandler);
      pushCardSdk.off(pushCardSdk.events.CANCEL, this.cancelHandler);
      pushCardSdk.off(pushCardSdk.events.GET_RESIDUE_TIME, this.getResidueTimeHandler);
    },

    onStart(data) {
      this.onPushing = true;
      this.cardId = data.id;
      this.roomId = data.roomId;
      this.handleClose();
      this.stopPolling(false);
      // 有倒计时
      if (data.time >= 0) {
        this.totalTime = data.total;
        // 解决卡片弹出后看到的时间少了一秒
        this.remainingTime = data.time + 1;
      }
      // 获取推送卡片数据
      this.getPushCardData();
    },

    onCancel() {
      this.onPushing = false;
      this.handleClose();
      this.stopPolling(false);
      this.popUpLeftTime = 0;
    },

    /** 监听卡片倒计时剩余时间 */
    onGerResidueTime(msg) {
      // 侦听剩余时长事件
      this.getResidueTimeEnd = true;
      const time = msg.data.time;
      this.remainingTime = time;
      if (time === 0) {
        this.stopPolling(false);
        // 如果没有倒计时,则不关闭卡片
        if (!this.hasCountDown) return;
        this.handleClose();
      }
    },

    // 轮询获取剩余时长
    initPolling() {
      const polling = this.polling = new Polling(() => {
        if (this.isShowByServer) {
          // 防止连续请求
          if (this.getResidueTimeEnd) {
            this.getResidueTimeEnd = false;
            this.pushCardSdk.getResidueTime();
          }
        } else {
          this.remainingTime--;
        }
      }, {
        interval: 1000
      });
      polling.start();
    },

    stopPolling(sendSocket = true) {
      if (this.polling) {
        this.polling.stop();
        this.polling = null;
      }
      // sendSocket=true且没有入口才需要通知
      if (this.pushCardSdk && sendSocket && !this.entranceEnabled) {
        this.pushCardSdk.toClose();
      }
    },

    openLink() {
      if (ynToBool(this.cardInfo.linkEnabled || 'Y') && this.link) {
        const { userInfo } = this.pushCardSdk;
        const { redirectType } = this.cardInfo;
        this.handleClose();
        if ((!redirectType || redirectType === 'tab') && this.linkSkipEnabled) {
          window.open(this.link, '_blank', 'noopener');
        }
        this.handleOpen();
        this.$emit('open', {
          redirectType,
          link: this.link,
          cardId: this.cardId,
          userInfo
        });
      }
    },

    handleOpen() {
      if (!this.internal) return;
      const isObtain = local.get(`isObtain${this.roomId}${this.cardId}`);
      // 领取纪录，已经点击过不再发送纪录
      if (isObtain !== 'true') {
        this.obtainCard();
      }
      if (!this.isCardpushIframe) return;
      this.iframeLink = this.link;
      this.iframeVisible = true;
      this.$nextTick(() => {
        const cardpushIframe = document.getElementById('cardpushIframe');
        cardpushIframe && cardpushIframe.contentWindow.document.body.addEventListener('touchMove', (e) => {
          e.preventDefault();
        });
        cardpushIframe && cardpushIframe.contentWindow.location.reload();
      });
    },

    async obtainCard() {
      try {
        const res = await this.pushCardSdk.obtainCard(this.roomId, this.cardId);
        if (res.code === 200) {
          local.set(`isObtain${this.roomId}${this.cardId}`, 'true');
        }
      } catch (error) {
        console.warn(error);
      }
    },

    handleClose() {
      this.visible = false;
      this.$emit('close');
    },

    // 获取推送卡片数据
    async getPushCardData() {
      const res = await this.pushCardSdk.getPushCardData(this.cardId, this.roomId);
      if (!res) return;
      this.cardInfo = res.data;
      // 当前弹出方式为马上弹出
      if (this.isPushCondition) {
        this.visible = true;
        this.popUpLeftTime = 0;
      } else {
        this.countdownMsgHideLeftTime = 3;
        // 本地需要记录观看时长
        const leftTime = local.get(`plv_push_card_${this.cardId}`);
        this.popUpLeftTime = leftTime ? Number(leftTime) : this.cardInfo.conditionValue / 1000;
      }
    },

    handleCountdown(time) {
      this.countdownMsgHideLeftTime -= 1;
      local.set(`plv_push_card_${this.cardId}`, time);
    },

    handleCountdownEnd() {
      this.popUpLeftTime = 0;
      if (this.countdownAutoOpen) {
        this.visible = true;
      }
    },

    handleEntrance() {
      if (this.popUpLeftTime <= 0) {
        this.visible = true;
        return;
      }
      if (!this.isPushCondition) {
        this.countdownMsgHideLeftTime = 3;
      }
    },

    showModal() {
      // 解决祖先容器有transform的情况下，fixed定位失效问题
      const target = this.$refs.cardModal;
      if (!this.isAppend) {
        this.isAppend = true;
        document.body.appendChild(target);
      }
    },

    handleIframeClose() {
      this.iframeVisible = false;
    },
  }
};
