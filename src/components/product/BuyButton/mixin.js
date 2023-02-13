import { escapeHTML } from '@polyv/utils/src/string';
import { append } from '@polyv/utils/src/querystring';
import { getCurrentUAInfo } from '@just4/ua-info';
import basicMixin from '../../../assets/mixins/basic';

const uaInfo = getCurrentUAInfo();

/**
 * 获取微信版本
 */
export const getWeixinVersion = () => {
  const regData = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
  return regData && regData.length ? regData[1] : '';
};

/**
 * 比较两个版本号，version1高于version2返回大于0
 * @param {String} version1
 * @param {String} version2
 */
export const compareVersions = (version1, version2) => {
  const reg = /(\.0+)+$/;
  const segA = version1.replace(reg, '').split('.');
  const segB = version2.replace(reg, '').split('.');
  const len = Math.min(segA.length, segB.length);
  for (let i = 0; i < len; i++) {
    const diff = parseInt(segA[i], 10) - parseInt(segB[i], 10);
    if (diff) {
      return diff;
    }
  }
  return segA.length - segB.length;
};

/**
 * @emit disabled-status-change
 */
export default {
  inject: ['productVm'],

  mixins: [basicMixin],

  props: {
    good: Object,
    /** 是否显示禁用状态的节点 */
    showDisabled: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      // 是否移动端
      isMobile: uaInfo.isPortable,
      // 是否微信浏览器环境
      isWeixin: uaInfo.client.isWx,
      // 是否安卓系统
      isAndroid: uaInfo.os.isAndroid,
      // 是否 iOS 系统
      isIOS: uaInfo.os.isIOS,
      // 是否高微信版本，高于 7.0.12
      isHighWeixinVersion: compareVersions(getWeixinVersion(), '7.0.12') >= 0,
      // 是否处于微信小程序 webview 页面
      isWxMiniProgramWebview: false,
    };
  },

  computed: {
    productSdk() {
      return this.productVm.productSdk;
    },

    buttonText() {
      const defaultText = this.enabledToBool(this.productVm.recruitmentEnabled) ? this.iarTrans('product.deliverResume') : this.iarTrans('product.buy');
      if (!this.good) {
        return defaultText;
      }
      if (this.good.productType === 'finance') {
        const { btnShow } = this.good;
        return btnShow !== '立即了解' ? btnShow : this.iarTrans('product.buyFinance');
      }

      return defaultText;
    },

    /**
     * 链接类型
     */
    linkType() {
      if (!this.good) {
        return;
      }
      return Number(this.good.linkType || 10);
    },

    /**
      * 判断是否显示微信小程序按钮
      * 1. 微信浏览器环境
      * 2. 填写了原始 id
      * 3. 微信版本高于 7.0.12
      */
    isWeixinButton() {
      if (!this.good) {
        return false;
      }

      // 如果传入自定义处理点击事件则小程序按钮失效
      if (typeof this.productVm?.customClickButtonHandler === 'function') {
        return false;
      }

      // 小程序 webview 内使用原生 sdk 功能跳转
      if (this.isWxMiniProgramWebview) {
        return false;
      }

      return (
        this.isWeixin &&
        this.good.wxMiniprogramOriginalId &&
        this.isHighWeixinVersion
      );
    },

    /**
     * 多平台场景下是否禁用
     */
    isMultiPlatformDisabled() {
      if (!this.good) {
        return true;
      }

      const { pcLink, mobileLink, wxMiniprogramLink, mobileAppLink } = this.good;
      // 支持 H5 微信小程序跳转优先级最高
      if (this.isWeixinButton) {
        return false;
      }

      // 当前在微信小程序 webview 中且商品存在 wxMiniprogramLink 字段
      if (this.isWxMiniProgramWebview && wxMiniprogramLink) {
        return false;
      }

      // 移动 Web 下跳转
      if (this.isMobile) {
        return !mobileLink && !mobileAppLink;
      }

      // PC 下跳转
      if (!this.isMobile) {
        return !pcLink;
      }
    },

    /**
      * 判断按钮是否为禁用状态
      */
    isButtonDisabled() {
      if (!this.good) {
        return true;
      }

      if (typeof this.productVm?.customProductDisabled === 'function') {
        const isDisabled = this.productVm.customProductDisabled(this.good);
        return !!isDisabled;
      }

      if (!this.productSdk) {
        return true;
      }
      const ProductLinkType = this.productSdk.ProductLinkType;
      const { link, androidLink, iosLink, otherLink } = this.good;

      // 通用平台
      if (this.linkType === ProductLinkType.Normal) {
        return !link;
      }

      // 多平台链接
      if (this.linkType === ProductLinkType.MultiPlatform) {
        return this.isMultiPlatformDisabled;
      }

      // 原生方法
      if (this.linkType === ProductLinkType.Native) {
        // 如果当前环境支持原生方法，则根据 androidLink 和 iosLink 判断
        if (this.supportNativeToPointMall()) {
          return !androidLink && !iosLink;
        }
        return !otherLink;
      }

      return false;
    },
  },

  watch: {
    good: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          if (this.isWeixinButton && this.$refs.wxbtn) {
            const width = this.$el.clientWidth;
            const height = this.$el.clientHeight;
            this.$refs.wxbtn.innerHTML = this.getWxMiniProgramButtonHtml(this.good, {
              width,
              height,
            });
          }
        });
      },
    },

    isButtonDisabled: {
      immediate: true,
      handler() {
        this.$emit('disabled-status-change', this.isButtonDisabled);
      },
    },
  },

  mounted() {
    this.checkWxMiniProgramWebview();
  },

  methods: {
    /**
     * 调用 window.open 打开一个地址
     * @param {String} url 地址
     */
    openLink(url) {
      window.open(url, '_blank', 'noopener=yes');
    },

    /**
     * 获取微信小程序打开按钮的 html 文本
     * @param {Object} good 商品信息
     * @param {Object} size 按钮尺寸
     */
    getWxMiniProgramButtonHtml(good, size = {}) {
      const { wxMiniprogramOriginalId, wxMiniprogramLink } = good;
      return `
        <wx-open-launch-weapp
          username="${escapeHTML(wxMiniprogramOriginalId)}"
          path="${this.formatProductLink(wxMiniprogramLink)}"
        >
          <script type="text/wxtag-template">
            <style>.plv-iar-product-wx-buy-btn {width: ${size.width}px;height: ${size.height}px;}</style>
            <div class="plv-iar-product-wx-buy-btn"></div>
          </script>
        </wx-open-launch-weapp>
      `;
    },

    /**
     * 处理商品链接打开路径
     * @param {String} url 地址
     * @param {Object} params 参数
     */
    formatProductLink(url, params = {}) {
      let urlParams = {
        ...params,
      };

      // 通过组件入参传入额外的参数
      if (typeof this.productVm?.getLinkParams === 'function') {
        const res = this.productVm.getLinkParams(url);
        if (typeof res === 'object') {
          urlParams = Object.assign({}, urlParams, res);
        }
      }

      return append(url, urlParams, { ignoreEmpty: true });
    },

    handleClickBuy() {
      !this.isButtonDisabled && this.productVm.emitClickBuy(this.good);
    },

    /**
     * 处理按钮点击，已排除按钮的禁用状态、微信原生按钮跳转小程序场景
     */
    async clickBtn() {
      if (!this.good) {
        return;
      }

      // 组件传入了 customClickButtonHandler 则直接调用该方法，终止程序
      if (typeof this.productVm?.customClickButtonHandler === 'function') {
        this.productVm.customClickButtonHandler(this.good);
        return;
      }

      if (!this.productSdk) {
        return;
      }
      const ProductLinkType = this.productSdk.ProductLinkType;

      // 原生方法跳转
      if (this.linkType === ProductLinkType.Native) {
        this.toNativeLink();
        return;
      }

      // 保利威 SDK Webview 下跳转
      if (this.supportPlvWebviewBridage()) {
        this.toPlvWebviewBridage();
        return;
      }

      // 通用平台
      if (this.linkType === ProductLinkType.Normal) {
        const { link } = this.good;
        this.openLink(this.formatProductLink(link));
        return;
      }

      // 多平台跳转
      if (this.linkType === ProductLinkType.MultiPlatform) {
        const { wxMiniprogramLink, mobileLink, pcLink } = this.good;

        // 小程序 webview 环境，利用微信 sdk 跳转指定页面
        if (this.isWxMiniProgramWebview && wxMiniprogramLink) {
          this.toWxMiniProgramNavigate();
          return;
        }

        // 移动 Web 跳转
        if (this.isMobile) {
          this.openLink(this.formatProductLink(mobileLink));
          return;
        }

        // PC 跳转
        if (!this.isMobile) {
          this.openLink(this.formatProductLink(pcLink));
          return;
        }
      }

      console.warn('linkType not support');
    },

    /** ------------ 保利威 SDK webview 跳转 start ------------ */
    /**
     * 获取保利威 SDK 桥接器对象
     */
    getPlvWebviewBridage() {
      if (typeof this.productVm.getPlvWebviewBridge === 'function') {
        return this.productVm.getPlvWebviewBridge();
      }
    },

    /**
     * 是否支持保利威 SDK 桥接器跳转
     */
    supportPlvWebviewBridage() {
      return this.productVm.innerIsPlvWebview && !!this.getPlvWebviewBridage();
    },

    /**
     * 调用保利威 SDK 桥接器跳转链接
     */
    toPlvWebviewBridage() {
      if (!this.productSdk || !this.good) {
        return;
      }
      if (!this.supportPlvWebviewBridage()) {
        return;
      }
      const ProductLinkType = this.productSdk.ProductLinkType;

      let linkTo = '';
      const { link, mobileLink, mobileAppLink, wxMiniprogramOriginalId, wxMiniprogramLink } = this.good;
      switch (this.linkType) {
        case ProductLinkType.Normal:
          linkTo = link;
          break;
        case ProductLinkType.MultiPlatform:
          linkTo = mobileAppLink || mobileLink;
          break;
      }

      // 非通用链接，将其余字段单独放到 data 供客户使用
      let productData = null;
      if (this.linkType !== ProductLinkType.Normal) {
        productData = {
          mobileLink: this.formatProductLink(mobileLink),
          wxMiniprogramOriginalId,
          wxMiniprogramLink: this.formatProductLink(wxMiniprogramLink),
          mobileAppLink: this.formatProductLink(mobileAppLink),
        };
      }
      const plvWebviewDataSize = this.productVm.plvWebviewDataSize;
      // 发送到 SDK 的数据
      const webviewData = {
        width: plvWebviewDataSize.width,
        height: plvWebviewDataSize.height,
        newPage: true,
        link: this.formatProductLink(linkTo),
        data: productData,
      };
      const webviewBridage = this.getPlvWebviewBridage();
      webviewBridage?.sendData('clickProduct', webviewData);
      this.productVm.emitClickPlvWebviewJump(this.good);
    },
    /** ------------ 保利威 SDK webview 跳转 end ------------ */

    /** ------------ 小程序 webview 页跳转 start ------------ */
    /**
     * 检查当前环境是否为微信小程序 webview 环境中
     */
    async checkWxMiniProgramWebview() {
      const check = await this.supportWxMiniProgramNavigateTo();
      this.isWxMiniProgramWebview = check;
    },

    /**
     * 小程序 webview 下是否支持微信 SDK 功能跳转小程序页面
     */
    async supportWxMiniProgramNavigateTo() {
      if (!this.isWeixin || typeof this.productVm?.getWeixinSdk !== 'function') {
        return false;
      }
      const wx = await this.productVm.getWeixinSdk();

      if (wx?.miniProgram?.getEnv) {
        return new Promise((resolve) => {
          wx.miniProgram.getEnv((res) => {
            resolve(res.miniprogram === true);
          });
        });
      } else {
        return false;
      }
    },

    /**
     * 调用微信 sdk 方法跳转到当前小程序的某个页面
     */
    async toWxMiniProgramNavigate() {
      if (!this.isWeixin || typeof this.productVm?.getWeixinSdk !== 'function' || !this.good) {
        return;
      }
      const wx = await this.productVm.getWeixinSdk();
      wx?.miniProgram?.navigateTo({
        url: this.formatProductLink(this.good.wxMiniprogramLink),
      });
    },
    /** ------------ 小程序 webview 页跳转 end ------------ */

    /** ------------ 原生方法跳转 start ------------ */
    /**
     * 获取原生 App 方法
     */
    getNativeToPointMallFn() {
      if (this.isAndroid) {
        return window.AndroidNative?.toPointMall;
      } else if (this.isIOS) {
        return window.webkit?.messageHandlers?.gotoPointsMall?.postMessage;
      }
    },

    /**
     * 是否支持原生 App 方法
     */
    supportNativeToPointMall() {
      return !!this.getNativeToPointMallFn();
    },

    /**
     * 调用原生方法跳转
     */
    toNativeLink() {
      if (!this.good) {
        return;
      }
      const { androidLink, iosLink, otherLink } = this.good;

      const nativePointMallFn = this.getNativeToPointMallFn();
      if (nativePointMallFn) {
        let url = this.isAndroid ? androidLink : iosLink;

        // 处理地址并注入 plt_back_uri
        const pltBackUri = encodeURIComponent(location.href);
        url = this.formatProductLink(url, {
          plt_back_uri: pltBackUri,
        });

        const paramsStr = JSON.stringify({
          url
        });
        nativePointMallFn(paramsStr);
        return;
      }

      this.openLink(this.formatProductLink(otherLink));
    },
    /** ------------ 原生方法跳转 end ------------ */
  },
};
