<!-- @file 移动端签到组件 -->

<template>
  <div class="plv-check-in-default">
    <div class="plv-iar-check-in-default__content__mobile">
      <div class="plv-iar-check-in-default__downcount">
        <span>{{ leftTime || '' }}</span><span>{{ iarTrans('checkIn.second') }}</span>
      </div>
      <p class="plv-check-in-default__content-message">{{ message }}</p>
      <div class="plv-iar-check-in-default__btn__wrap__mobile">
        <iar-button :disabled="disabled" @click="signIn">
          {{ iarTrans('checkIn.checkInBtn') }}
        </iar-button>
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
};
</script>

<style lang="scss">
@font-face {
  font-family: DIN-Bold;
  src: url(./font/DINPro-Bold.otf);
}
.plv-iar-check-in-default__content__mobile {
  margin-top: 46px;
  text-align: center;

  .plv-check-in-default__content-message {
    max-width: 350px;
    margin: 20px auto 68px;
    text-align: center;
    line-height: normal;
    word-break: break-all;
  }

  .plv-iar-check-in-default__downcount {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    border-radius: 70px;
    background: rgba(229, 242, 254, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: DIN-Bold;

    >span {
      font-size: 14px;
      color: #3082FE;
    }

    >span:nth-child(1) {
      font-size: 48px;
    }

    >span:nth-child(2) {
      margin: 20px 0 0 7px;
    }
  }

  >p {
    color: #333;
    font-size: 16px;
    margin: 0;
    margin-top: 20px;
  }
}

.plv-iar-check-in-default__btn__wrap__mobile {
  padding: 0 24px;
  margin-top: 45px;
  text-align: center;
}
</style>
