<template>
  <div class="plv-ia-c-redpack-rain-end-modal">
    <redpack-rain-modal
      :visible="visible"
      :custom-img-config="customImgConfig"
      redpack-decr-top="79px"
      @close="$emit('close')"
    >
      <div class="plv-ia-c-redpack-rain-end-modal__main">
        <div class="plv-ia-c-redpack-rain-end-modal__teacher">
          <teacher
            :nickname="nickname"
            :avatar="avatar"
          />
        </div>
        <p class="plv-ia-c-redpack-rain-end-modal__end-tips">{{ iarTrans('redpackRain.redpackRainEnd') }}</p>
        <div class="plv-ia-c-redpack-rain-end-modal__btn">
          <redpack-btn @click="$emit('close')">{{ btnTxt }}</redpack-btn>
        </div>
      </div>
    </redpack-rain-modal>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import Modal from '../redpack-rain-modal';
import Teacher from '../teacher-info';
import Button from '../redpack-btn';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
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

    nickname: {
      type: String,
      default: '',
    },

    avatar: {
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
      timer: null,
      leftTime: 3,
    };
  },

  computed: {
    visible() {
      return this.status === this.allStatus.showFinish;
    },

    btnTxt() {
      return this.iarTrans('redpackRain.redpackRainEndBtn') + `(${this.leftTime})`;
    },
  },

  watch: {
    visible: {
      immediate: true,
      handler() {
        if (this.visible) {
          this.leftTime = 3;
          this.setTimer();
        } else {
          this.clearTimer();
        }
      },
    },
  },

  [BEFORE_DESTROY]() {
    this.clearTimer();
  },

  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.leftTime -= 1;
        if (this.leftTime <= 0) {
          this.clearTimer();
          this.$emit('close');
        }
      }, 1000);
    },

    clearTimer() {
      clearInterval(this.timer);
      this.leftTime = 0;
      this.timer = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.plv-ia-c-redpack-rain-end-modal__main {
  text-align: center;
}
.plv-ia-c-redpack-rain-end-modal__teacher {
  position: absolute;
  top: -32px;
  left: 0;
  width: 100%;
}
.plv-ia-c-redpack-rain-end-modal__end-tips {
  color: #FCEEBC;
  padding: 88px 0 32px;
  font-size: 20px;
}
.plv-ia-c-redpack-rain-end-modal__btn {
  width: 233px;
  margin: 0 auto;
  padding-bottom: 24px;
}
</style>
