<template>
  <div class="plv-ia-c-redpack-rain__single-modal">
    <redpack-rain-modal
      ref="modal"
      hide-shadow
      :visible="modalVisible"
      :show-top-bg="false"
      :show-close="false"
      :custom-img-config="customImgConfig"
      @after-close="$emit('after-close')"
    >
      <div v-if="grabResult" class="plv-ia-c-redpack-rain__single-modal__main">
        <div class="plv-ia-c-redpack-rain__single-modal__teacher">
          <teacher
            :nickname="nickname"
            :avatar="avatar"
          />
        </div>
        <!-- 抢到红包 -->
        <template v-if="grabSuccess">
          <p class="plv-ia-c-redpack-rain__single-modal__congratulations">{{ iarTrans('redpackRain.congratulations') }}</p>
          <div v-if="isPoint" class="plv-ia-c-redpack-rain__single-modal__amount plv-ira-g-singleline">
            <span>{{ grabResult.amount }}</span>
            <div class="plv-ia-c-redpack-rain-single-modal__unit">{{ unit }}</div>
          </div>
          <p v-else class="plv-ia-c-redpack-rain__single-modal__amount plv-ira-g-singleline">￥<span>{{ grabResult.amount }}</span></p>
        </template>
        <!-- 未抢到红包 -->
        <template v-else>
          <p class="plv-ia-c-redpack-rain__single-modal__nothing">{{ iarTrans('redpackRain.grabNothing') }}</p>
          <p class="plv-ia-c-redpack-rain__single-modal__cheerup">{{ iarTrans('redpackRain.grabNothingCheerup') }}</p>
        </template>
        <div>
          <div class="plv-ia-c-redpack-rain__single-modal__main__btn">
            <redpack-btn @click="handleClose">{{ btnText }}</redpack-btn>
          </div>
        </div>
      </div>
    </redpack-rain-modal>
  </div>
</template>

<script>
import Modal from '../redpack-rain-modal';
import Teacher from '../teacher-info';
import Button from '../redpack-btn';
import basicMixin from '../../../assets/mixins/basic';

export default {
  components: {
    RedpackRainModal: Modal,
    Teacher,
    RedpackBtn: Button,
  },

  mixins: [basicMixin],

  props: {
    status: {
      type: String,
      default: '',
    },

    allStatus: {
      type: Object,
      default: () => ({})
    },

    visible: {
      type: Boolean,
    },

    grabResult: {
      type: Object,
      default: () => null
    },
    receivedData: {
      type: Object,
      default: () => null
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
      default: () => null
    },
    unit: {
      type: String,
      default: '',
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  data() {
    return {
      modalVisible: false,
    };
  },

  computed: {
    grabSuccess() {
      return this.grabResult && this.grabResult.amount;
    },
    btnText() {
      return this.iarTrans('redpackRain.continue');
    },
    // 红包类型
    redPackType() {
      const type = this.receivedData ? this.receivedData.type || this.receivedData.redPackType || 'rain' : 'rain';
      return type.toLowerCase();
    },
    isPoint() {
      return this.redPackType.includes('score');
    },
  },

  watch: {
    visible: {
      immediate: true,
      handler() {
        this.modalVisible = this.visible;
      },
    },
  },

  methods: {
    handleClose() {
      this.$refs.modal.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/basic.scss';

.plv-ia-c-redpack-rain__single-modal__main {
  text-align: center;
  p {
    text-align: center;
    color: #FCEEBC;
  }
}
.plv-ia-c-redpack-rain__single-modal__teacher {
  position: absolute;
  top: -32px;
  left: 0;
  width: 100%;
}
.plv-ia-c-redpack-rain__single-modal__congratulations, .plv-ia-c-redpack-rain__single-modal__nothing {
  font-size: 20px;
  padding-top: 84px;
  line-height: 28px;
}
.plv-ia-c-redpack-rain__single-modal__cheerup {
  font-size: 14px;
  padding: 32px 0 8px;
}
.plv-ia-c-redpack-rain__single-modal__amount {
  font-size: 30px;
  line-height: 40px;
  margin: 8px auto 32px;
  color: #FCEEBC;
  span {
    font-size: 40px;
  }
}
.plv-ia-c-redpack-rain__single-modal__main__btn {
  width: 233px;
  margin: 0 auto;
  padding-bottom: 24px;
}
.plv-ia-c-redpack-rain-single-modal__unit {
  font-size: 14px;
  line-height: 14px;
  margin-top: 8px;
}
</style>
