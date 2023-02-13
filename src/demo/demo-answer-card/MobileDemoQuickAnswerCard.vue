<!-- @file 移动端快速问答。由于层级布局与 PC 端快速问答存在较大差异，在此另起组件。 -->

<template>
  <div class="plv-iar-demo-quick-answer-card">
    <quick-answer-card
      v-if="!isWebview"
      :lang="lang"
      :enable-sound-effects="true"
      :answer-card-sdk="answerCardSdk"
      @success-submit="onSuccessSubmit"
      @to-show="onShow"
      @to-hide="onHide"
    />
    <modal
      v-else
      title="答题卡"
      :visible="isShowAppAnswerCard"
      @close="closeDialog"
    >
      <app-answer-card
        :lang="lang"
        :enable-sound-effects="true"
        :answer-card-sdk="answerCardSdk"
        :delay-time="0"
        @success-submit="onSuccessSubmit"
        @to-show="onShow"
        @to-hide="onHide"
      />
    </modal>
  </div>
</template>

<script>
import mixin from './mixin';
import QuickAnswerCard from '../../entry/answer-card/quick-answer/MobileQuickAnswer';
import AppAnswerCard from '../../entry/answer-card/quick-answer/AppQuickAnswer';
import Modal from '../demo-modal/MobileModal';

export default {
  components: {
    QuickAnswerCard,
    AppAnswerCard,
    Modal
  },

  mixins: [mixin],
  data() {
    return {
      isWebview: true,
    };
  },
};
</script>

<style lang="scss">
.plv-iar-demo-quick-answer-card {
  position: fixed;
  top: 0;
  .plv-iar-popup-default {
    padding-top: 100%;
  }
}
</style>
