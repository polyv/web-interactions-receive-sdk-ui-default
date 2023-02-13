<template>
  <div>
    <module-container :max-body-height="370">
      <div class="plv-iar-questionnaire-evaluation-landing">
        <div class="plv-iar-questionnaire-evaluation-landing__title">金融风险等级测评</div>
        <div class="plv-iar-questionnaire-evaluation-landing__desc">完成风险承受能力评测后观看直播</div>
        <div class="plv-iar-questionnaire-evaluation-landing__img"></div>
        <div v-if="isForceStart" class="plv-iar-questionnaire-evaluation-landing__footer-countdown">
          <span class="plv-iar-questionnaire-evaluation-landing__footer-countdown--highlight">{{ countDownTime }}</span>s后自动跳转
        </div>
        <div class="plv-iar-questionnaire-evaluation-landing__footer">
          <div class="plv-iar-questionnaire-evaluation-landing__footer-btn" @click="$emit('re-test');">开始测评</div>
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
.plv-iar-questionnaire-evaluation-landing {
  padding: 38px 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .plv-iar-questionnaire-evaluation-landing__title {
    color: #333;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 3px;
    text-align: center;
  }

  .plv-iar-questionnaire-evaluation-landing__desc {
    margin-top: 10px;
    color: #757575;
    font-size: 12px;
    text-align: center;
  }

  .plv-iar-questionnaire-evaluation-landing__img {
    margin-top: 16px;
    width: 160px;
    height: 160px;
    background: url(./imgs/evaluation.svg) no-repeat 0 0 / 100% 100%;
  }

  .plv-iar-questionnaire-evaluation-landing__footer-countdown {
    margin-top: 6px;
    font-size: 14px;
    text-align: center;

    &--highlight {
      color: #D9BA6C;
    }
  }

  .plv-iar-questionnaire-evaluation-landing__footer {
    margin-top: 6px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .plv-iar-questionnaire-evaluation-landing__footer-btn {
      margin-top: 16px;
      height: 32px;
      padding: 10px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      box-sizing: border-box;
      color: #fff;
      background: #D9BA6C;
      cursor: pointer;
    }
  }
}
</style>
