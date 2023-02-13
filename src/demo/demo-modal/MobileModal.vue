<template>
  <div v-show="show" class="plv-iar-popup-default" @click.self="close">
    <div class="plv-iar-popup-default-content" :style="modalStyle">
      <div class="plv-iar-popup-default-header">
        <span
          v-if="hasBackBtn"
          class="plv-iar-popup-default-btn plv-iar-popup-default-btn__back"
          @click="handleBack"
        ></span>
        <span
          v-if="closable"
          class="plv-iar-popup-default-btn plv-iar-popup-default-btn__close"
          @click="handleClose"
        ></span>
        <slot name="header"></slot>
        <h2>{{ title }}</h2>
      </div>
      <div class="plv-iar-popup-default-body" :style="bodyStle">
        <slot></slot>
      </div>
      <div class="plv-iar-popup-default-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { DESTROYED } from '@/assets/utils/compat';
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    hasBackBtn: Boolean,
    visible: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    bodyStle: {
      type: Object,
      default: null,
    },
    modalStyle: {
      type: Object,
      default: null,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
    };
  },

  watch: {
    visible: {
      immediate: true,
      handler(newVal) {
        this.show = newVal;
        if (newVal && this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      },
    }
  },

  mounted() {
    if (this.visible && this.appendToBody) {
      document.body.appendChild(this.$el);
    }
  },

  [DESTROYED]() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleBack() {
      this.$emit('back');
    },
    close() {
      this.show = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-popup-default {
    padding-top: 0 !important;
  }
}
.plv-iar-popup-default {
  z-index: 10001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 56.25%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.6);
}
.plv-iar-popup-default-content {
  width: 100%;
  height: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  padding-top: 50px;
  box-sizing: border-box;
}
.plv-iar-popup-default-header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #EDEDEF;
  h2 {
    line-height: 50px;
    text-align: center;
    color: #333;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
  }
}
.plv-iar-popup-default-btn {
  position: absolute;
  top: 0;
  display: block;
  width: 50px;
  height: 50px;
  background-size: 28px;
  background-position: center;
  background-repeat: no-repeat;
}
.plv-iar-popup-default-btn__back {
  left: 0;
  background-image: url(./imgs/icon-mob-back.png);
}
.plv-iar-popup-default-btn__close {
  right: 0;
  background-image: url(./imgs/icon-mob-close.png);
}
.plv-iar-popup-default-body {
  // padding: 20px 24px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-popup-default-content {
    height: 100% !important;
    left: unset;
    right: 0;
    width: 100vh;
  }
}
</style>
