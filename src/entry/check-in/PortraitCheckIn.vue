<!-- @file 移动竖屏端签到组件 -->

<template>
  <div class="plv-check-in-portrait">
    <div class="plv-check-in-portrait__modal">
      <div class="plv-check-in-portrait__modal__content">
        <p class="plv-check-in-message"><span>{{ message }}</span></p>
        <p class="plv-check-in-time">{{ iarTrans('checkIn.checkInTimeTip') }} <span>{{ leftTime || '' }}{{ iarTrans('checkIn.second') }}</span></p>
        <div class="plv-iar-check-in-portrait__btn__wrap__mobile">
          <iar-button :btn-style="btnStyle" :disabled="disabled" @click="signIn"> {{ iarTrans('checkIn.checkInBtn') }}</iar-button>
        </div>
        <div class="plv-check-in-portrait__modal__close" @click="onStopSignIn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import IarButton from '../../components/common/button/MobileButton';
import mixin from './mixin';

export default {
  components: {
    IarButton,
  },
  mixins: [mixin],
  created() {
    this.preLoadBg();
  },
  methods: {
    preLoadBg() {
      const checkInBgImg = new Image();
      const checkInSuccessImg = new Image();
      checkInBgImg.src = require('./imgs/check-in-bg.png');
      checkInSuccessImg.src = require('./imgs/check-in-success.png');
    },
    onCheckInSuccess() {
      this.$emit('to-hide');
      this.showPortraitTips({
        imagePath: require('./imgs/check-in-success.png')
      });

      // 恢复下次签到可点击
      this.$nextTick(() => {
        this.clear();
      });
    },
  }
};
</script>

<style lang="scss">
.plv-check-in-portrait {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  .plv-check-in-portrait__modal {
    width: 300px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    background-image: url('./imgs/check-in-bg.png');
    background-size: 100% 100%;
    background-position: center;
    &__content {
      width: 100%;
      margin-top: 94px;
      text-align: center;
    }
    >p {
      margin: 0;
    }

    &__close {
      background-image: url('./imgs/check-in-close.png');
      background-size: contain;
      position: absolute;
      bottom: -66px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 66px;
    }
  }
  .plv-check-in-message {
    line-height: normal;
    box-sizing: border-box;
    font-size: 16px;
    margin: 0;
    padding: 24px 24px 0 24px;
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    span {
      margin: 0;
    }
  }
  .plv-check-in-time {
    font-size: 12px;
    color: #666;
    margin: 8px 0 24px 0;
    >span {
      color: #FFC038;
    }
  }
  .plv-iar-check-in-portrait__btn__wrap__mobile {
    margin: 0 auto;
    width: 208px;
    height: 36px;
    text-align: center;
  }
}
</style>
