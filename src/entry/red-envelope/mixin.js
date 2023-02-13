
import { isMobile, isWeixin, isWorkWeixin } from '@polyv/utils/src/browser';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

import langMixin from './langMixin';

export default {
  mixins: [langMixin],
  provide() {
    return {
      customImgConfig: this.customImgConfig
    };
  },
  props: {
    // 红包SDK
    redEnvelopeSdk: {
      type: Object,
      default: null,
    },
    // 微信opendId
    openId: {
      type: String,
      default: '',
    },
    // 红包数据
    redEnvelopeData: {
      type: Object,
      default: null,
    },
    // 提现入口
    withDrawEnabled: {
      type: Boolean,
      default: true
    },
    // 二维码自定义重定向url
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
    },
    // 网页全屏， 需要旋转90度适配
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 判断现金还是积分红包
    isPoint() {
      return this.redPackType.includes('score');
    },
    // 判断是否是支付宝红包
    isAlipayPwdRn() {
      return this.redPackType === 'alipay_password_official_normal';
    },
    isMobileWechat() {
      // TEST 模拟微信
      // return true;
      // TODO 积分红包只在移动端展示
      return isMobile() && (this.isAlipayPwdRn || this.isPoint || (isWeixin() && !isWorkWeixin()));
    },
    // 红包类型
    redPackType() {
      const type = this.curRedEnvelopeData ? this.curRedEnvelopeData.type || this.curRedEnvelopeData.redPackType || 'normal' : 'normal';
      return type.toLowerCase();
    },
    // 域名
    watchOrigin() {
      let watchOrigin;
      const { store } = this.redEnvelopeSdk;
      if (store.baseConfig?.apiEnv === 'pre' && !store.baseConfig?.isUseDomainInfo) {
        watchOrigin = store.preDomainInfo.watchOrigin;
      } else {
        watchOrigin = store.domainInfo.watchOrigin;
      }
      return watchOrigin;
    },
    // 房间号
    roomId() {
      return this.redEnvelopeSdk && this.redEnvelopeSdk.channelInfo && this.redEnvelopeSdk.channelInfo.roomId;
    },
    // 红包ID
    redpackId() {
      return this.curRedEnvelopeData && this.curRedEnvelopeData.redpackId;
    },
  },
  data() {
    return {
      status: '', // 当前红包状态
      amount: 0, // 当前领取的红包金额
      curRedEnvelopeData: null, // 当前红包数据
      needCheckStatus: false, // 领取红包时是否需要请求cache接口
    };
  },
  mounted() {
    this.redPaperHandler = this.onRedPaper.bind(this);
    this.bindAppEvents();
  },
  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },
  methods: {
    handleClose() {
      this.curRedEnvelopeData = null;
      this.$emit('close');
    },
    bindAppEvents() {
      const redEnvelopeSdk = this.redEnvelopeSdk;
      if (!redEnvelopeSdk) { return; }
      redEnvelopeSdk.on(redEnvelopeSdk.events.REDPAPER, this.redPaperHandler);
    },
    unbindAppEvents() {
      const redEnvelopeSdk = this.redEnvelopeSdk;
      if (!redEnvelopeSdk) { return; }
      redEnvelopeSdk.off(redEnvelopeSdk.events.REDPAPER, this.redPaperHandler);
    },
    onRedPaper(msg) {
      if (this.curRedEnvelopeData) return;
      // 红包雨消息，不处理
      if (msg.type.includes('rain')) return;
      this.curRedEnvelopeData = msg;
      if (this.isMobileWechat) {
        this.loading = false;
        // 新收到的红包socket消息，立即弹出，等待点击“开”之后再请求状态接口
        this.needCheckStatus = true;
        this.result.status = 'noReceive';
        this.result.amount = null;
      }
    },
  },
  watch: {
    redEnvelopeData(nv) {
      this.curRedEnvelopeData = nv;
      if (nv && this.isMobileWechat) {
        this.needCheckStatus = false;
        this.checkReceiveCache();
      }
    }
  },
};
