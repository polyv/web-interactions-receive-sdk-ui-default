<template>
  <div class="plv-iar-red-envelope__result--success">
    <div v-if="isAlipayPwdRn" class="plv-iar-red-envelope__result__alipay-pwd-rn">
      <div class="plv-iar-red-envelope__result__alipay-pwd-rn__tips">
        <div>{{ iarTrans('redEnvelope.alipayPwdRnGetTip1') }}</div>
        <div>{{ iarTrans('redEnvelope.alipayPwdRnGetTip2') }}</div>
      </div>
      <div class="plv-iar-red-envelope__result__btn">
        <button ref="copyBtn" type="button">{{ iarTrans('redEnvelope.clickCopyPwd') }}</button>
      </div>
    </div>
    <template v-else>
      <div class="plv-iar-red-envelope__result__title">{{ iarTrans('redEnvelope.congratulations') }}</div>
      <div v-if="isPoint" class="plv-iar-red-envelope__result__money">
        <span>{{ amount }}</span>
        <div class="plv-iar-red-envelope__result__unit">{{ unit }}</div>
      </div>
      <div v-else class="plv-iar-red-envelope__result__money">¥<span>{{ amount }}</span></div>
      <div class="plv-iar-red-envelope__result__btn">
        <button type="button" @click="$emit('close')">{{ iarTrans('redEnvelope.accept') }}</button>
      </div>
      <div
        v-if="withDrawEnabled"
        class="plv-iar-red-envelope__withdraw-btn"
        @click="handleWithdraw"
      >
        <span v-if="isPoint" class="plv-iar-red-envelope__withdraw-btn-text">{{ iarTrans('redEnvelope.pointRecordBtn') }}</span>
        <span v-else class="plv-iar-red-envelope__withdraw-btn-text">{{ iarTrans('redEnvelope.withdrawBtn') }}</span>
        <span class="plv-iar-red-envelope__withdraw-btn-arrow"></span>
      </div>
    </template>
  </div>
</template>

<script>
import ClipboardJs from 'clipboard';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    amount: {
      type: [Number, String],
      default: ''
    },
    withDrawEnabled: {
      type: Boolean,
      default: true,
    },
    isPoint: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    },
    isAlipayPwdRn: {
      type: Boolean,
      default: false
    },
    alipayPassword: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      clipboardJs: null
    };
  },
  mounted() {
    this.isAlipayPwdRn && this.initClipBoardJs();
  },

  [BEFORE_DESTROY]() {
    this.clipboardJs && this.clipboardJs.destroy();
  },
  methods: {
    handleWithdraw() {
      if (this.isPoint) {
        this.$emit('click-point-record');
      } else {
        this.$emit('click-withdraw');
      }
    },
    initClipBoardJs() {
      this.clipboardJs = new ClipboardJs(this.$refs.copyBtn, {
        text: () => {
          return this.alipayPassword;
        },
      });

      this.clipboardJs.on('success', this.copySuccess);
    },

    copySuccess() {
      this.$emit('copy-pwd-success');
    },
  }
};
</script>

<style lang="scss">
.plv-iar-red-envelope__result--success {
  .plv-iar-red-envelope__result__unit {
    font-size: 14px;
    margin-top: 8px;
  }
  .plv-iar-red-envelope__result__title {
    margin-top: 68px;
  }
  .plv-iar-red-envelope__result__tip {
    margin-top: 8px;
    font-size: 12px;
    line-height: 17px;
  }
}
.plv-iar-red-envelope__result__money {
  margin-top: 8px;
  margin-bottom: 48px;
  font-size: 32px;
  font-weight: 700;
  >span {
    font-size: 48px;
  }
}
.plv-iar-red-envelope__withdraw-btn {
  position: absolute;
  top: 71px;
  right: 0;
  min-width: 50px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #4A2206 !important;
  padding-left: 10px;
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(252, 233, 72, 1) 0%, rgba(241, 162, 42, 1) 100%),
    linear-gradient(180deg, rgba(253, 219, 133, 1) 0%, rgba(254, 233, 170, 1) 20%, rgba(255, 243, 197, 1) 44%, rgba(254, 234, 172, 1) 66%, rgba(251, 197, 74, 1) 100%);
  border-radius: 12px 0 0 12px;
  &-text {
    display: inline-block;
    //margin-top: 2px;
    //vertical-align: middle;
  }
  &-arrow {
    display: inline-block;
    width: 5px;
    height: 10px;
    margin-right: 5px;
    background-image: url(../imgs/redpack-withdraw-arrow.png);
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: 3px;
    vertical-align: middle;
  }
}
.plv-iar-red-envelope__result__alipay-pwd-rn {
  position: relative;
  height: 100%;
  .plv-iar-red-envelope__result__btn {
    position: absolute;
    width: 100%;
    bottom: 20px;
  }
}
.plv-iar-red-envelope__result__alipay-pwd-rn__tips {
  padding-top: 80px;
  font-size: 16px;
  line-height: 28px;
}
</style>
