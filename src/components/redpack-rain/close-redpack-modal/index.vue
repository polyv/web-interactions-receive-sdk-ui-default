<!-- @file 红包雨关闭二次确认弹窗 -->
<template>
  <div class="plv-ia-c-redpack-rain__close-modal">
    <redpack-rain-modal
      append-to-body
      :visible="visible"
      :show-top-bg="false"
      :show-decoration="false"
      :show-close="false"
      :custom-img-config="customImgConfig"
      @close="handleClose"
    >
      <div class="plv-ia-c-redpack-rain__close-modal__main">
        <p>{{ iarTrans('redpackRain.closeTips') }}</p>
        <div>
          <input
            type="button"
            :value="iarTrans('redpackRain.closeConfirm')"
            class="plv-ia-c-redpack-rain__close-modal__main__btn plv-ia-c-redpack-rain__close-modal__main__btn--confirm"
            @click="$emit('confirm')"
          />
          <input
            type="button"
            class="plv-ia-c-redpack-rain__close-modal__main__btn plv-ia-c-redpack-rain__close-modal__main__btn--cancel"
            :value="iarTrans('redpackRain.closeContinue')"
            @click="$emit('cancel')"
          />
        </div>
      </div>
    </redpack-rain-modal>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import RedpackRainModal from '../redpack-rain-modal';

export default {
  components: {
    RedpackRainModal,
  },

  mixins: [basicMixin],

  props: {
    visible: {
      type: Boolean,
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  methods: {
    handleClose() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.plv-ia-c-redpack-rain__close-modal__main {
  text-align: center;
  p {
    padding: 60px 0 40px;
    text-align: center;
    color: #FCEEBC;
    font-size: 20px;
    word-break: keep-all;
  }
}
.plv-ia-c-redpack-rain__close-modal__main__btn {
  width: 108px;
  height: 48px;
  -webkit-appearance: none;
  border: none;
  outline: none;
  border-radius: 24px;
  background-color: transparent;
  color: #4A2206;
  margin-bottom: 24px;
  font-size: 16px;
  &:nth-child(1) {
    margin-right: 16px;
  }
  &--confirm {
    background: linear-gradient(180deg, rgba(252, 233, 72, 1) 0%, rgba(241, 162, 42, 1) 100%),
      linear-gradient(180deg, rgba(253, 219, 133, 1) 0%, rgba(254, 233, 170, 1) 20%, rgba(255, 243, 197, 1) 44%, rgba(254, 234, 172, 1) 66%, rgba(251, 197, 74, 1) 100%),
      rgba(245, 185, 52, 0.74);
  }
  &--cancel {
    background: linear-gradient(180deg, rgba(252, 233, 72, 1) 0%, rgba(241, 162, 42, 1) 100%),
      linear-gradient(180deg, rgba(253, 219, 133, 1) 0%, rgba(254, 233, 170, 1) 20%, rgba(255, 243, 197, 1) 44%, rgba(254, 234, 172, 1) 66%, rgba(251, 197, 74, 1) 100%);
  }
}
</style>
