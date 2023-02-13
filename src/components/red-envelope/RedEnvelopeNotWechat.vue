<!-- 不是微信提示弹窗 -->
<template>
  <red-envelope-modal
    class="plv-iar-red-envelope__popup--not-wechat"
    @close="$emit('close')"
  >
    <div class="plv-iar-red-envelope__not-wechat">
      <i class="plv-iar-red-envelope__not-wechat__icon plv-iar-red-envelope__not-wechat__icon--1"></i>
      <i class="plv-iar-red-envelope__not-wechat__icon plv-iar-red-envelope__not-wechat__icon--2"></i>
      <i class="plv-iar-red-envelope__not-wechat__icon plv-iar-red-envelope__not-wechat__icon--3"></i>
      <div class="plv-iar-red-envelope__not-wechat__info">
        <div class="plv-iar-red-envelope__not-wechat__user__pic">
          <img :src="redEnvelopeData.user.pic" />
        </div>
        <div class="plv-iar-red-envelope__not-wechat__user__nick">{{ iarTrans('redEnvelope.senderTip1') + redEnvelopeData.user.nick + iarTrans('redEnvelope.senderTip2') }}</div>
        <span class="plv-iar-red-envelope__not-wechat__close" @click="$emit('close')"></span>
        <div class="plv-iar-red-envelope__not-wechat__cover-text">
          <span>{{ redEnvelopeData.content || redEnvelopeData.blessing || redEnvelopeData.greeting }}</span>
        </div>
        <div class="plv-iar-red-envelope__not-wechat__qrcode">
          <img :src="codeUrl" />
        </div>
        <div class="plv-iar-red-envelope__not-wechat__scanning-tip">{{ iarTrans('redEnvelope.scanToWeChat') }}</div>
      </div>
    </div>
  </red-envelope-modal>
</template>

<script>
import RedEnvelopeModal from './components/RedEnvelopeModal';
import mixin from './mixin';
import { append } from '@polyv/utils/src/querystring';

export default {
  components: {
    RedEnvelopeModal
  },
  mixins: [mixin],
  props: {
    redEnvelopeData: {
      type: Object,
      required: true
    },
    watchOrigin: {
      type: String,
      default: ''
    },
    roomId: {
      type: [String, Number],
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    qrcodeUrl() {
      return append('https://live.polyv.net/qrcode', { url: `${this.watchOrigin}/watch/${this.roomId}` });
    },
    customUrl() {
      return append('https://live.polyv.net/qrcode', { url: this.redirectUrl });
    },
    codeUrl() {
      return this.redirectUrl ? this.customUrl : this.qrcodeUrl;
    }
  },
};
</script>

<style lang="scss">
.plv-iar-red-envelope__popup--not-wechat {
  .plv-iar-red-envelope__popup {
    &::before {
      content: '';
      display: block;
      width: 355px;
      height: 257px;
      margin: 0 auto;
      background-image: url(./imgs/not-wechat-title.png);
      background-size: 138%;
      background-position: center 20%;
      background-repeat: no-repeat;
    }
  }
  .plv-iar-red-envelope__popup__close {
    position: relative;
    top: -30px;
  }
}
.plv-iar-red-envelope__not-wechat {
  position: relative;
  top: -30px;
  width: 281px;
  height: 339px;
  margin: 0 auto;
  background-image: url(./imgs/not-wechat-bg.png);
  background-size: 130%;
  background-position: center;
  border-radius: 6px;
  font-size: 14px;
  color: #FCEEBC;
  text-align: center;
  .plv-iar-red-envelope__not-wechat__icon {
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .plv-iar-red-envelope__not-wechat__icon--1 {
    top: 29px;
    right: -45px;
    width: 100px;
    height: 100px;
    background-image: url(./imgs/icon-1.png);
  }
  .plv-iar-red-envelope__not-wechat__icon--2 {
    top: 60px;
    left: -60px;
    width: 140px;
    height: 140px;
    background-size: cover;
    background-image: url(./imgs/icon-2.png);
  }
  .plv-iar-red-envelope__not-wechat__icon--3 {
    right: -75px;
    bottom: -65px;
    width: 160px;
    height: 150px;
    background-image: url(./imgs/icon-3.png);
  }
}
.plv-iar-red-envelope__not-wechat__info {
  padding-top: 36px;
}
.plv-iar-red-envelope__not-wechat__user__pic {
  position: absolute;
  top: -32px;
  left: 50%;
  margin-left: -32px;
  width: 64px;
  height: 64px;
  padding: 4px;
  background-image: linear-gradient(180deg, #FF9549 0%, #F64A40 100%);
  border-radius: 50%;
  box-sizing: border-box;
  >img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
}
.plv-iar-red-envelope__not-wechat__user__nick {
  line-height: 16px;
}
.plv-iar-red-envelope__not-wechat__close {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  right: 0;
  background-image: url(./imgs/not-wechat-close.png);
  background-size: cover;
}
.plv-iar-red-envelope__not-wechat__cover-text {
  position: relative;
  width: 200px;
  min-height: 56px;
  margin: 8px auto;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  word-break: break-all;
  >span {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.plv-iar-red-envelope__not-wechat__qrcode {
  >img {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    margin: 16px 0;
  }
}
.plv-iar-red-envelope__not-wechat__scanning-tip {
  line-height: 19px;
  letter-spacing: 0.6px;
}
</style>
