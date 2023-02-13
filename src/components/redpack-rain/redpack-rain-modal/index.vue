<!-- @file 红包雨弹层组件 -->
<template>
  <transition
    :name="animation"
    @after-leave="$emit('after-close')"
  >
    <div v-show="isShow" class="plv-ia-c-redpack-rain__modal">
      <div v-if="showTopBg" class="plv-ia-c-redpack-rain__modal__topbg" :style="{'background-image': rainModalTopBgImg}"></div>
      <div
        class="plv-ia-c-redpack-rain__modal__main"
        :style="{
          boxShadow: hideShadow ? 'unset' : '',
        }"
      >
        <div v-if="showDecoration" class="plv-ia-c-redpack-rain__modal__main__frags__redpack" :style="{ top: redpackDecrTop }"></div>
        <div v-if="showDecoration" class="plv-ia-c-redpack-rain__modal__main__frags__coin" :style="{'background-image': rainModalRightPendantImg}"></div>
        <div v-if="showDecoration" class="plv-ia-c-redpack-rain__modal__main__frags__light"></div>
        <slot></slot>
        <input
          v-if="showClose"
          type="button"
          class="plv-ia-c-redpack-rain__modal__main__close"
          @click="$emit('close')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { DESTROYED } from '@/assets/utils/compat';
export default {
  inject: ['customImgConfig'],
  props: {
    visible: {
      type: Boolean,
    },

    // 是否显示装饰
    showDecoration: {
      type: Boolean,
      default: true,
    },

    showTopBg: {
      type: Boolean,
      default: true,
    },

    showClose: {
      type: Boolean,
      default: true,
    },

    // 左边缘红包装饰到弹窗顶部距离
    redpackDecrTop: {
      type: String,
      default: '',
    },

    // 渐现(fade)、翻转(flip)动画
    animation: {
      type: String,
      default: 'fade'
    },

    appendToBody: {
      type: Boolean,
    },

    // 是否显示阴影
    hideShadow: {
      type: Boolean,
    },
  },

  data() {
    return {
      isShow: false,
    };
  },

  computed: {
    rainModalTopBgImg() {
      const { customImgConfig } = this;
      return this.customImgConfig?.rainModalTopBgImg ? `url(${customImgConfig.rainModalTopBgImg})` : null;
    },
    rainModalRightPendantImg() {
      const { customImgConfig } = this;
      return this.customImgConfig?.rainModalRightPendantImg ? `url(${customImgConfig.rainModalRightPendantImg})` : null;
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler() {
        this.isShow = this.visible;
      },
    },
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
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../entry/redpack-rain/redpack.scss';
@import '../../../assets/styles/basic.scss';

$modalWidth: 280px;

.plv-ia-c-redpack-rain__modal {
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: - $modalWidth/2;
  transform: translateY(-50%);
}

.plv-ia-c-redpack-rain__modal__topbg {
  z-index: -1;
  position: absolute;
  top: -300px;
  left: 50%;
  transform: translateX(-50%);
  width: 430px;
  height: 500px;
  pointer-events: none;
  @include bg('./imgs/modal-topbg.png');
  background-size: 100%;
}
.plv-ia-c-redpack-rain__modal__main {
  position: relative;
  width: $modalWidth;
  min-height: 150px;
  padding: 0 16px;
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(255, 159, 77, 1) 0%, rgba(255, 94, 49, 1) 33%, rgba(241, 65, 70, 1) 100%);
  box-shadow: 0 -8px 32px 0 rgba(81, 11, 7, 0.61);
  border-radius: 6px;
}
.plv-ia-c-redpack-rain__modal__main__close {
  z-index: 1;
  position: absolute;
  left: 50%;
  bottom: -64px;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  appearance: none;
  outline: none;
  background-color: transparent;
  border: none;
  @include bg('../imgs/modal-close-btn.png');
  color: #FCEEBC;
  cursor: pointer;
  transition: all .1s ease;
}
.plv-ia-c-redpack-rain__modal__main__frags__redpack {
  position: absolute;
  left: -30px;
  top: 89px;
  width: 75px;
  height: 75px;
  @include bg('../imgs/modal-frags-redpack.png');
}
.plv-ia-c-redpack-rain__modal__main__frags__coin {
  position: absolute;
  top: 30px;
  right: -35px;
  width: 75px;
  height: 75px;
  @include bg('../imgs/modal-frags-coin.png');
}
.plv-ia-c-redpack-rain__modal__main__frags__light {
  position: absolute;
  bottom: -24px;
  right: -31px;
  width: 75px;
  height: 69px;
  @include bg('../imgs/modal-frags-light.png');
}

</style>
