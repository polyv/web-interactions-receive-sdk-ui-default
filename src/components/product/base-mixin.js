import { isWebView } from '@polyv/web-view-bridge/dist/is-webview';
import langs from '../../assets/locale/lang/product';
import entryMixin from '../../assets/mixins/entry';

export default {
  langs,

  mixins: [entryMixin],

  props: {
    /** 商品库 sdk 实例 */
    productSdk: Object,
    /** 获取跳转链接附带参数 */
    getLinkParams: Function,
    /** 获取微信 SDK 对象 */
    getWeixinSdk: Function,
    /**
     * 自定义商品按钮禁用状态
     * (good: ProductData) => unknow
     */
    customProductDisabled: Function,
    /**
     * 自定义点击购买按钮的处理，注意传入该参数后微信小程序跳转原生标签将失效
     * (good: ProductData) => unknow
     */
    customClickButtonHandler: Function,
    /** 获取保利威 SDK 桥接器对象 */
    getPlvWebviewBridge: Function,
    /** 是否为保利威 SDK Webview 环境 */
    isPlvWebview: {
      type: [Boolean, undefined],
      default: undefined,
    },
    /** webview 数据的尺寸信息 */
    plvWebviewDataSize: {
      type: Object,
      default: () => ({ width: 90, height: 160 })
    },
    /** 招聘开关 */
    recruitmentEnabled: {
      type: [String, Boolean],
      default: false,
    },
  },

  watch: {
    isPlvWebview: {
      immediate: true,
      handler() {
        if (typeof this.isPlvWebview === 'boolean') {
          this.innerIsPlvWebview = this.isPlvWebview;
        } else {
          this.innerIsPlvWebview = isWebView();
        }
      }
    }
  },

  provide() {
    return {
      productVm: this,
    };
  },

  data() {
    return {
      // 当前是否为保利威 SDK Webview 环境
      innerIsPlvWebview: false,
    };
  },

  methods: {
    /**
     * 回调点击商品详情
     * @param {Object} good 商品信息
     */
    emitClickGoodDesc(good) {
      this.$emit('click-good-desc', good);
    },

    /**
     * 回调点击商品购买按钮
     * @param {Object} good 商品信息
     */
    emitClickBuy(good) {
      this.$emit('click-buy', good);
    },

    /**
     * 回调点击商品小窗 webview 跳转
     * @param {Object} good 商品信息
     */
    emitClickPlvWebviewJump(good) {
      this.$emit('click-plv-webview-jump', good);
    },
  },
};
