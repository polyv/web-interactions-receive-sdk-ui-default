<template>
  <div class="plv-ia-c-redpack-rain-summary-modal">
    <redpack-rain-modal
      animation="flip"
      :visible="visible"
      :redpack-decr-top="realGrabAmount ? '' : '49px'"
      :custom-img-config="customImgConfig"
      @close="$emit('close')"
    >
      <div class="plv-ia-c-redpack-rain-summary-modal__main">
        <div class="plv-ia-c-redpack-rain-summary-modal__teacher">
          <teacher
            :nickname="nickname"
            :avatar="avatar"
          />
        </div>
        <p class="plv-ia-c-redpack-rain-summary-modal__end-tips">{{ iarTrans('redpackRain.redpackEnd') }}</p>
        <!-- 抢到过红包，realAmount存在且不为0 -->
        <template v-if="realGrabAmount">
          <p class="plv-ia-c-redpack-rain-summary-modal__congratulations">{{ iarTrans('redpackRain.congratulations') }}</p>
          <div v-if="isPoint" class="plv-ia-c-redpack-rain-summary-modal__amount plv-ira-g-singleline">
            <span>{{ realGrabAmount }}</span>
            <div class="plv-ia-c-redpack-rain-summary-modal__unit">{{ unit }}</div>
          </div>
          <p v-else class="plv-ia-c-redpack-rain-summary-modal__amount plv-ira-g-singleline">￥<span>{{ realGrabAmount }}</span></p>
          <p class="plv-ia-c-redpack-rain-summary-modal__withdraw-tips">{{ iarTrans('redpackRain.pointWithdrawTips') }}</p>
          <div
            v-if="withDrawEnabled"
            class="plv-ia-c-redpack-rain-summary-modal__withdraw-btn"
            @click="handleWithdraw"
          >
            <span v-if="isPoint">{{ iarTrans('redpackRain.pointRecordBtn') }}</span>
            <span v-else>{{ iarTrans('redpackRain.withdrawBtn') }}</span>
            <span class="plv-ia-c-redpack-rain-summary-modal__withdraw-btn-arrow"></span>
          </div>
        </template>

        <template v-else>
          <p class="plv-ia-c-redpack-rain-summary-modal__nothing">{{ iarTrans('redpackRain.summaryNothing') }}</p>
        </template>
      </div>
    </redpack-rain-modal>
  </div>
</template>

<script>
import Modal from '../redpack-rain-modal';
import Teacher from '../teacher-info';
import basicMixin from '../../../assets/mixins/basic';

export default {
  components: {
    RedpackRainModal: Modal,
    Teacher,
  },

  mixins: [basicMixin],

  inject: ['redpackRainVm'],

  props: {
    redPackReceive: {
      type: Object,
      default: () => {
        return {};
      }
    },
    status: {
      type: String,
      default: '',
    },

    allStatus: {
      type: Object,
      default: () => ({})
    },

    nickname: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
      default: '',
    },

    // 红包雨实例
    redpackRain: {
      type: Object,
      default: () => null,
    },

    // 抢红包结果
    realGrabAmount: {
      type: Number,
      default: 0,
    },
    // 提现入口
    withDrawEnabled: {
      type: Boolean,
      default: true
    },
    unit: {
      type: String,
      default: ''
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  data() {
    return {
      summary: null,
    };
  },

  computed: {
    visible() {
      return this.status === this.allStatus.showSummary;
    },
    // 判断现金还是积分红包
    isPoint() {
      return this.redPackType.includes('score');
    },
    // 红包类型
    redPackType() {
      const type = this.redPackReceive ? this.redPackReceive.type || this.redPackReceive.redPackType || 'rain' : 'rain';
      return type.toLowerCase();
    },
  },

  methods: {
    handleWithdraw() {
      this.redpackRainVm && this.redpackRainVm.hideRedpackRain();
      // 对外触发提现事件
      if (!this.redpackRainVm) {
        return;
      }
      if (this.isPoint) {
        this.$emit('click-point-record');
      } else {
        this.$emit('click-withdraw');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/basic.scss';

.plv-ia-c-redpack-rain-summary-modal__main {
  z-index: 1;
  text-align: center;
  p {
    text-align: center;
    color: #FCEEBC;
    word-break: keep-all;
    line-height: 1;
  }
}
.plv-ia-c-redpack-rain-summary-modal__teacher {
  position: absolute;
  top: -32px;
  left: 0;
  width: 100%;
}
.plv-ia-c-redpack-rain-summary-modal__end-tips {
  padding-top: 56px;
  padding-bottom: 0;
  margin: 0;
  font-size: 14px;
}
.plv-ia-c-redpack-rain-summary-modal__congratulations {
  padding: 32px 0 4px;
  margin: 0;
  font-size: 20px;
}
.plv-ia-c-redpack-rain-summary-modal__unit {
  font-size: 14px;
  line-height: 14px;
  margin-top: 8px;
}
.plv-ia-c-redpack-rain-summary-modal__amount {
  font-size: 30px;
  line-height: 40px;
  margin: 8px auto 32px;
  padding: 0;
  text-align: center;
  color: #FCEEBC;
  word-break: keep-all;
  span {
    font-size: 40px;
  }
}
.plv-ia-c-redpack-rain-summary-modal__nothing {
  padding: 32px 0 48px;
  font-size: 20px;
  white-space: pre-wrap;
}
.plv-ia-c-redpack-rain-summary-modal__withdraw-tips {
  padding-bottom: 24px;
  padding-top: 0;
  margin: 0;
  font-size: 12px;
}
.plv-ia-c-redpack-rain-summary-modal__withdraw-btn {
  position: absolute;
  top: 100px;
  right: 0;
  min-width: 50px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  color: #4A2206 !important;
  background: linear-gradient(180deg, rgba(252, 233, 72, 1) 0%, rgba(241, 162, 42, 1) 100%),
    linear-gradient(180deg, rgba(253, 219, 133, 1) 0%, rgba(254, 233, 170, 1) 20%, rgba(255, 243, 197, 1) 44%, rgba(254, 234, 172, 1) 66%, rgba(251, 197, 74, 1) 100%);
  border-radius: 12px 0 0 12px;
  &-arrow {
    display: inline-block;
    width: 5px;
    height: 10px;
    margin-right: 5px;
    @include bg('./imgs/redpack-withdraw-arrow.png');
  }
}
</style>
