<template>
  <div>
    <module-container :max-body-height="480">
      <div class="plv-iar-questionnaire-evaluation-landing-mobile">
        <div class="plv-iar-questionnaire-evaluation-landing-mobile__title">金融风险等级测评</div>
        <div class="plv-iar-questionnaire-evaluation-landing-mobile__desc">完成风险承受能力评测后观看直播</div>
        <div class="plv-iar-questionnaire-evaluation-landing-mobile__img"></div>
        <div class="plv-iar-questionnaire-evaluation-landing-mobile__footer">
          <div class="plv-iar-questionnaire-evaluation-landing-mobile__footer-btn" @click="$emit('re-test');">开始测评</div>
          <div v-if="isForceStart" class="plv-iar-questionnaire-evaluation-landing-mobile__footer-countdown">
            <span class="plv-iar-questionnaire-evaluation-landing-mobile__footer-countdown--highlight">{{ countDownTime }}</span>s后自动跳转
          </div>
        </div>
      </div>
    </module-container>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import landingMixin from './mixin';

import ModuleContainer from '../../common/module-container/PcModuleContainer';

export default {
  components: {
    ModuleContainer,
  },
  mixins: [basicMixin, landingMixin]
};
</script>

<style lang="scss" >
.plv-iar-questionnaire-evaluation-landing-mobile {
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .plv-iar-questionnaire-evaluation-landing-mobile__title {
    color: #333;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 3px;
    text-align: center;
  }

  .plv-iar-questionnaire-evaluation-landing-mobile__desc {
    margin-top: 16px;
    color: #757575;
    font-size: 14px;
    text-align: center;
  }

  .plv-iar-questionnaire-evaluation-landing-mobile__img {
    margin-top: 30px;
    width: 200px;
    height: 200px;
    background: url(./imgs/evaluation.svg) no-repeat 0 0 / 100% 100%;
  }

  .plv-iar-questionnaire-evaluation-landing-mobile__footer {
    margin-top: 32px;
    margin-bottom: 22px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .plv-iar-questionnaire-evaluation-landing-mobile__footer-btn {
      width: 240px;
      height: 40px;
      padding: 10px 16px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      box-sizing: border-box;
      color: #fff;
      background: #D9BA6C;
      cursor: pointer;
    }

    .plv-iar-questionnaire-evaluation-landing-mobile__footer-countdown {
      margin-top: 20px;
      font-size: 14px;
      text-align: center;

      &--highlight {
        color: #D9BA6C;
      }
    }
  }
}
</style>
