<!-- @file 桌面端签到组件 -->

<template>
  <div class="plv-check-in-default">
    <div class="plv-check-in-default__content">
      <div class="plv-check-in-default__downcount pws-vclass-check-in-default__downcount">
        <span>{{ leftTime || '' }}</span><span>{{ iarTrans('checkIn.second') }}</span>
      </div>
      <p class="plv-check-in-default__content-message">{{ message }}</p>
    </div>
    <div class="plv-check-in-default__btn__wrap">
      <iar-button :disabled="disabled" @click="signIn">{{ iarTrans('checkIn.checkInBtn') }}</iar-button>
    </div>
  </div>
</template>

<script>
import IarButton from '../../components/common/button/PcButton';
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
.plv-check-in-default__content {
  padding-top: 69px;
  text-align: center;

  .plv-check-in-default__content-message {
    max-width: 350px;
    margin: 20px auto 68px;
    text-align: center;
    line-height: normal;
    word-break: break-all;
  }

  .plv-check-in-default__downcount {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    background: rgba(229, 242, 254, 1);
    line-height: 120px;
    font-family: DIN-Bold;

    >span {
      font-size: 14px;
      color: #2196F3;
    }

    >span:nth-child(1) {
      font-size: 32px;
    }

    >span:nth-child(2) {
      margin: 10px 0 0 4px;
    }
  }

  >p {
    color: #606266;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 68px;
  }
}

.plv-check-in-default__btn__wrap {
  padding-bottom: 24px;
  text-align: center;
}
</style>
