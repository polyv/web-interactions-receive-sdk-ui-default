<!-- 红包入口 -->
<template>
  <div
    :class="[
      'plv-iar-red-envelope__entrance',
      {'plv-iar-red-envelope__entrance--actived': clicked}
    ]"
    :style="{'background-image': `url(${entranceBgImg})`}"
    @click="handleOpen"
  >
    <div class="plv-iar-red-envelope__entrance__content">{{ title }}</div>
    <div class="plv-iar-red-envelope__entrance__status">{{ statusText }}</div>
    <div class="plv-iar-red-envelope__entrance__type">{{ typeText }}</div>
  </div>
</template>

<script>
import { ynToBool } from '@polyv/utils/src/boolean';
import { local } from '@polyv/utils/src/storage';
import normalEntranceImg from './imgs/entrance-normal.png';
import passwordEntranceImg from './imgs/entrance-password.png';
import rainEntranceImg from './imgs/entrance-rain.png';

import mixin from './mixin';

const CLICK_STORAGE_KEY = 'red_envelope_click_';

export default {
  mixins: [mixin],
  props: {
    redEnvelopeData: {
      type: Object,
      default: null
    },
    status: {
      type: String,
      default: '',
    },
    customImgConfig: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      clicked: false, // 是否点击过
    };
  },
  computed: {
    redPackType() {
      return (this.redEnvelopeData.type || this.redEnvelopeData.redPackType || 'normal').toLowerCase();
    },
    typeText() {
      const TYPE_TEXT = {
        normal: this.iarTrans('redEnvelope.typeNormal'),
        official_normal: this.iarTrans('redEnvelope.typeNormal'),
        password: this.iarTrans('redEnvelope.typePassword'),
        rain: this.iarTrans('redEnvelope.typeRain'),
        alipay_password: this.iarTrans('redEnvelope.typeAlipayPassword'),
      };
      return TYPE_TEXT[this.baseRedPackType];
    },
    entranceBgImg() {
      const { customImgConfig } = this;
      const TYPE_IMG = {
        normal: (customImgConfig && customImgConfig.normalEntranceImg) || normalEntranceImg,
        official_normal: (customImgConfig && customImgConfig.normalEntranceImg) || normalEntranceImg,
        password: (customImgConfig && customImgConfig.passwordEntranceImg) || passwordEntranceImg,
        alipay_password: (customImgConfig && customImgConfig.aliPasswordEntranceImg) || passwordEntranceImg,
        rain: (customImgConfig && customImgConfig.rainEntranceImg) || rainEntranceImg,
      };
      return TYPE_IMG[this.baseRedPackType];
    },
    baseRedPackType() {
      // 通过 redPackType 含关键字判断红包类型
      if (this.redPackType.includes('rain')) {
        // 红包雨类型
        return 'rain';
      } else if (this.redPackType.includes('alipay_password')) {
        // 支付宝口令红包
        return 'alipay_password';
      } else if (this.redPackType.includes('password')) {
        // 口令红包类型
        return 'password';
      } else if (this.redPackType.includes('_normal')) {
        // 普通红包类型
        return 'official_normal';
      } else {
        // 观众普通红包类型
        return 'normal';
      }
    },
    statusText() {
      const STATUS_TEXT = {
        noReceive: this.iarTrans('redEnvelope.receive'),
        received: this.iarTrans('redEnvelope.received'),
        none_redpack: this.iarTrans('redEnvelope.finished'),
        expired: this.iarTrans('redEnvelope.expired3'),
        nonReceived: this.iarTrans('redEnvelope.received'), // 红包雨已加入，但未领取到情况
      };
      return STATUS_TEXT[this.status || 'noReceive'];
    },
    title() {
      return this.redPackType.includes('password') ?
        this.iarTrans('redEnvelope.pswTitle') :
        this.redEnvelopeData.content || this.redEnvelopeData.blessing || this.redEnvelopeData.greeting;
    }
  },
  watch: {
    status() {
      this.clicked = true;
      local.set(CLICK_STORAGE_KEY + this.redEnvelopeData.redpackId, 'Y');
    }
  },
  mounted() {
    this.clicked = ynToBool(local.get(CLICK_STORAGE_KEY + this.redEnvelopeData.redpackId) || 'N');
  },
  methods: {
    handleOpen() {
      this.clicked = true;
      local.set(CLICK_STORAGE_KEY + this.redEnvelopeData.redpackId, 'Y');
      this.$emit('open', this.redEnvelopeData.redpackId, this.redEnvelopeData.redCacheId);
    },
  },
};
</script>

<style lang="scss">
.plv-iar-red-envelope__entrance {
  position: relative;
  width: 220px;
  max-width: 220px;
  height: 80px;
  padding: 12px 12px 4px 16px;
  border-radius: 4px;
  background-size: cover;
  background-repeat: no-repeat;
  color: #FCEEBC;
  font-size: 12px;
  line-height: 17px;
  box-sizing: border-box;
}

.plv-iar-red-envelope__entrance--actived {
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 4px;
  }
}
.plv-iar-red-envelope__entrance__content {
  max-width: 126px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 2px;
}
.plv-iar-red-envelope__entrance__status {
  &::after {
    content: '';
    display: block;
    width: 128px;
    height: 1px;
    background-color: rgba(#FCEEBC, .1);
    margin: 4px 0;
  }
}
.plv-iar-red-envelope__entrance__type {
  opacity: .6;
}
</style>
