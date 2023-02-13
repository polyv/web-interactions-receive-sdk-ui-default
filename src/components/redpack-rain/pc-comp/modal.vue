<template>
  <transition
    name="modal-fade"
  >
    <div v-show="visible" class="plv-ia-c-redpack-rain__modal-wrap">
      <div class="plv-ia-c-redpack-rain__modal__bg"></div>
      <div class="plv-ia-c-redpack-rain__modal">
        <div class="plv-ia-c-redpack-rain__modal__topbg"></div>
        <div class="plv-ia-c-redpack-rain__modal__main">
          <input type="button" class="plv-ia-c-redpack-rain__modal__main__close" @click="$emit('close')" />
          <div class="plv-ia-c-redpack-rain__modal__main__frags__redpack"></div>
          <div class="plv-ia-c-redpack-rain__modal__main__frags__coin"></div>
          <div class="plv-ia-c-redpack-rain__modal__main__frags__light"></div>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/basic.scss';

.plv-ia-c-redpack-rain__modal-wrap {
  position: fixed;
  z-index: 99999;
}
.plv-ia-c-redpack-rain__modal__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
}
.plv-ia-c-redpack-rain__modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.plv-ia-c-redpack-rain__modal__topbg {
  z-index: -1;
  position: absolute;
  top: -280px;
  left: 50%;
  transform: translateX(-50%);
  width: 430px;
  height: 500px;
  pointer-events: none;
  @include bg('./imgs/modal-topbg.png');
  background-size: contain;
}
.plv-ia-c-redpack-rain__modal__main {
  position: relative;
  width: 280px;
  min-height: 340px;
  background: linear-gradient(180deg, rgba(255, 159, 77, 1) 0%, rgba(255, 94, 49, 1) 33%, rgba(241, 65, 70, 1) 100%);
  box-shadow: 0 -8px 32px 0 rgba(81, 11, 7, 0.61);
  border-radius: 6px;
}
.plv-ia-c-redpack-rain__modal__main__close {
  z-index: 1;
  position: absolute;
  right: 0;
  width: 48px;
  height: 48px;
  appearance: none;
  outline: none;
  background-color: transparent;
  border: none;
  @include bg('./imgs/close-btn.png');
  color: #FCEEBC;
  cursor: pointer;
  transition: all .1s ease;
  &:hover {
    background-image: url(./imgs/close-btn-hover.png);
  }
}
.plv-ia-c-redpack-rain__modal__main__frags__redpack {
  position: absolute;
  left: -40px;
  top: 89px;
  width: 90px;
  height: 90px;
  @include bg('./imgs/modal-frags-redpack.png');
}
.plv-ia-c-redpack-rain__modal__main__frags__coin {
  position: absolute;
  top: 30px;
  right: -45px;
  width: 90px;
  height: 90px;
  @include bg('./imgs/modal-frags-coin.png');
}
.plv-ia-c-redpack-rain__modal__main__frags__light {
  position: absolute;
  bottom: -24px;
  right: -31px;
  width: 75px;
  height: 69px;
  @include bg('./imgs/modal-frags-light.png');
}
</style>
