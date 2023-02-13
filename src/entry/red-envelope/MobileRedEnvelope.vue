<!-- 红包 -->
<template>
  <div
    v-if="curRedEnvelopeData"
    class="plv-iar-default-red-envelope"
    :style="{ '--fullRate': fullRate } "
    :class="{'plv-iar-default-red-envelope--fullscreen': isFullScreen}"
  >
    <template v-if="isMobileWechat">
      <div v-if="loading || waitCacheAndReceive" class="plv-iar-red-envelope__loading"></div>
      <template v-else>
        <template v-if="result.status && result.status !== 'noReceive'">
          <mobile-red-envelope-result
            :red-envelope-data="result"
            :is-point="isPoint"
            :unit="unit"
            :with-draw-enabled="withDrawEnabled"
            :is-alipay-pwd-rn="isAlipayPwdRn"
            @close="handleClose"
            @click-withdraw="onClickWithdraw"
            @click-point-record="onClickPointRecord"
            @copy-pwd-success="onClickCopyPwd"
          />
        </template>
        <template v-else>
          <mobile-red-envelope-cover-password
            v-if="redPackType.includes('password')"
            :red-envelope-data="curRedEnvelopeData"
            :cover-img="redpackCoverImg"
            :is-alipay-pwd-rn="isAlipayPwdRn"
            @close="handleClose"
            @open="onOpen"
          />
          <mobile-red-envelope-cover-noraml
            v-else-if="redPackType.includes('normal') || redPackType.includes('official_normal')"
            :red-envelope-data="curRedEnvelopeData"
            :cover-img="redpackCoverImg"
            @close="handleClose"
            @open="onOpen"
          />
        </template>
      </template>
    </template>
    <template v-else>
      <redpack-not-wechat
        :nickname="curRedEnvelopeData.user.nick"
        :avatar="curRedEnvelopeData.user.pic"
        :status="allStatus.showNotWechat"
        :all-status="allStatus"
        :greeting="curRedEnvelopeData.content || curRedEnvelopeData.blessing || curRedEnvelopeData.greeting"
        :watch-url="watchUrl"
        :redirect-url="redirectUrl"
        @close="handleClose"
        @copy-success="$emit('copy-success')"
      />
    </template>
  </div>
</template>

<script>
import { local } from '@polyv/utils/src/storage';
import MobileRedEnvelopeCoverNoraml from '../../components/red-envelope/MobileRedEnvelopeCoverNormal';
import MobileRedEnvelopeCoverPassword from '../../components/red-envelope/MobileRedEnvelopeCoverPassword';
import MobileRedEnvelopeResult from '../../components/red-envelope/RedEnvelopeResult';
import RedpackNotWechat from '../../components/redpack-rain/redpack-not-wechat-modal';
import mixin from './mixin';
import { showTip } from './showTip';

const STATUS_STORAGE_KEY = 'red_envelope_status_';
const AMOUNT_STORAGE_KEY = 'ren_envelope_amount_';
const ALIPAY_PASSWORD_STORAGE_KEY = 'ren_envelope_alipay_password_';

export default {
  components: {
    MobileRedEnvelopeCoverNoraml,
    MobileRedEnvelopeCoverPassword,
    MobileRedEnvelopeResult,
    RedpackNotWechat,
  },
  mixins: [mixin],
  data() {
    return {
      result: {
        status: null,
        amount: null,
      }, // 红包领取结果
      loading: true,
      receiveEnd: true, // 领取红包接口是否返回
      allStatus: {
        showNotWechat: 'showNotWechat', // 显示在微信打开弹窗
      },
      waitCacheAndReceive: false, // 等待cache和receive接口请求完
      windowHeight: window.screen.height
    };
  },
  computed: {
    watchUrl() {
      return `${location.origin}/watch/${this.roomId}`;
    },
    redpackCoverImg() {
      return this.customImgConfig?.redpackCoverImg || '';
    },
    fullRate() {
      let rate = 1;
      // 红包高度(380px) / 屏幕高度, 确保横屏下比例保持在0.8
      if (this.windowHeight * 0.8 < 380) {
        rate = 0.8 / (380 / this.windowHeight);
      }
      return rate;
    }
  },

  watch: {
    'result.status': {
      handler() {
        // eslint-disable-next-line vue/custom-event-name-casing
        this.$emit('statusChange', this.redpackId, this.result.status);
      }
    },
    result: {
      handler() {
        local.set(AMOUNT_STORAGE_KEY + this.redpackId, this.result.amount);
        local.set(STATUS_STORAGE_KEY + this.redpackId, this.result.status);
        local.set(ALIPAY_PASSWORD_STORAGE_KEY + this.redpackId, this.result.alipayPassword);
      },
      deep: true
    },
  },
  mounted() {
    this.initOnorientationchange();
    // 修复在横屏下刷新，获取到是竖屏高度。
    this.onOrientationChangeHandle();
  },
  beforeDestroy() {
    this.destroyOnorientationchange();
  },

  methods: {
    destroyOnorientationchange() {
      window.removeEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        this.onOrientationChangeHandle,
        false
      );
    },
    initOnorientationchange() {
      window.addEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        this.onOrientationChangeHandle,
        false
      );
    },
    onOrientationChangeHandle() {
      // 参考观看页监听屏幕旋转逻辑，等界面重新渲染后获取body高度
      setTimeout(() => {
        this.windowHeight = document.body.clientHeight;
      }, 200);
    },
    // 查询红包状态
    // eslint-disable-next-line sonarjs/cognitive-complexity
    async checkReceiveCache() {
      this.loading = true;
      const { redpackId, redCacheId } = this.curRedEnvelopeData;
      // 先从localStorage读取状态
      const storageStatus = local.get(STATUS_STORAGE_KEY + redpackId);
      if (storageStatus && storageStatus !== 'noReceive') {
        this.result.status = storageStatus;
        if (storageStatus === 'received') {
          this.result.amount = local.get(AMOUNT_STORAGE_KEY + redpackId);
          if (this.isAlipayPwdRn) {
            this.result.alipayPassword = local.get(ALIPAY_PASSWORD_STORAGE_KEY + redpackId);
          }
        }
        this.loading = false;
        return;
      }
      let checkReceiveCacheResult;
      try {
        checkReceiveCacheResult = await this.redEnvelopeSdk.checkReceiveCache(redpackId, redCacheId);
      } catch (e) {
        showTip(e && e.data && e.data.error.desc);
        this.loading = false;
        return;
      }
      if (checkReceiveCacheResult.code === 200 && !checkReceiveCacheResult.data.receiveList) {
        const { state: message } = checkReceiveCacheResult.data;
        if (message === 'success') {
          this.result.status = 'noReceive';
        } else {
          this.result.status = message;
        }
      } else if (checkReceiveCacheResult.data && checkReceiveCacheResult.data.receiveList) {
        const temp = checkReceiveCacheResult.data.receiveList.filter(item => {
          return item.openId === this.openId;
        })[0];
        if (temp) {
          this.result.amount = temp.amount;
        }
        this.result.status = temp ? 'received' : 'noReceive';
      } else {
        this.result.status = 'noReceive';
      }
      this.loading = false;
    },
    async onOpen(password) {
      // 防止当打开的红包需要请求状态且请求领取接口时，出现loading后又显示红包领取界面再显示领取结果界面
      this.waitCacheAndReceive = true;
      if (this.needCheckStatus) {
        await this.checkReceiveCache();
      }

      if (!this.result.status || this.result.status === 'noReceive') {
        await this.handleSubmit(password);
      }

      this.waitCacheAndReceive = false;
    },
    // 领取红包
    async handleSubmit(password) {
      const redEnvelopeSdk = this.redEnvelopeSdk;
      if (!redEnvelopeSdk) { return; }
      if (this.redPackType.includes('password') && !password && !this.isAlipayPwdRn) {
        showTip(this.iarTrans('redEnvelope.pswEmpty'));
        return;
      }
      if (!this.receiveEnd) {
        return;
      }
      this.receiveEnd = false;
      const { redpackId, redCacheId } = this.curRedEnvelopeData;
      if (this.result.status === 'noReceive') {
        let res;
        try {
          res = await redEnvelopeSdk.grabRedEnvelope(redpackId, redCacheId, password);
        } catch (e) {
          showTip(e && e.data && e.data.error.desc);
          this.receiveEnd = true;
          return;
        }
        this.checkReceiveData(res, password);
      }
    },
    // 检查红包数据
    checkReceiveData(res, password = undefined) {
      const { code, data } = res;
      if (code === 200 && data.receiveData) {
        const receiveData = res.data.receiveData;
        this.result.status = 'received';
        if (receiveData.redPackType === 'ALIPAY_PASSWORD_OFFICIAL_NORMAL') {
          this.result.alipayPassword = receiveData.alipayPassword;
        } else {
          this.result.amount = receiveData.amount;
          if (password) {
            this.$emit('received', password);
          }
        }
      } else if (data.state === 'none_redpack' || data.state === 'expired') {
        this.result.status = data.state;
      } else if (data.state === 'incorrect_redpack_password') {
        showTip(this.iarTrans('redEnvelope.pswError'));
      } else if (data.state === 'operation_frequently') {
        showTip('红包领取太频繁');
      }
      this.receiveEnd = true;
    },
    onClickWithdraw() {
      this.curRedEnvelopeData = null;
      this.$emit('click-withdraw');
    },
    onClickPointRecord() {
      this.curRedEnvelopeData = null;
      this.$emit('click-point-record');
    },
    onClickCopyPwd() {
      showTip(this.iarTrans('redEnvelope.copySucceeded'));
      this.$emit('copy-password-success');
    },
  }
};
</script>
<style lang="scss">
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.plv-iar-red-envelope__loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.65);
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    background-image: url(./imgs/loading.png);
    background-size: cover;
    background-position: center;
    animation: spin 1s ease infinite;
  }
}
.plv-iar-default-red-envelope--fullscreen {
  .plv-iar-red-envelope__popup {
    transform: translate(-50%, -50%) rotate(90deg) scale(.8);
  }
  .plv-iar-red-envelope__popup__close {
    background-image: url(./imgs/btn-delete.png);
    height: 32px;
    width: 32px;
    position: absolute;
    right: -50px;
    top: 0;
  }
}
@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-red-envelope__popup {
    // 红包封面height: 380px, 按屏幕高度比例进行缩放80%
    transform: translate(-50%, -50%) scale(var(--fullRate));
  }
  .plv-iar-red-envelope__popup__close {
    position: absolute;
    top: 0;
    right: -45px;
    height: 32px;
    background-image: url(./imgs/btn-close-3.png);
  }
}
</style>
