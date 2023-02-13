<template>
  <div>
    <div class="plv-demo-feed-default__button__wrap">
      <button @click="onSetFeedBackVisible(true)">
        打开举报反馈
      </button>
    </div>

    <modal
      title="举报反馈"
      :visible="isShowFeedBack"
      @close="onSetFeedBackVisible(false)"
    >
      <feed-back
        :feed-back-sdk="feedBackSdk"
        :is-show-feed-back="isShowFeedBack"
        @to-show="onSetFeedBackVisible(true)"
        @to-hide="onSetFeedBackVisible(false)"
      />
    </modal>
  </div>
</template>

<script>
import feedBack from '../../entry/feed-back/MobileFeedBack';
import Modal from '../demo-modal/MobileModal';

import mixin from './mixin';

export default {
  components: {
    feedBack,
    Modal
  },
  mixins: [mixin],
};
</script>
<style lang="scss" scoped>
.plv-demo-feed-default__button__wrap {
  padding: 0 20px;
  button {
    margin-bottom: 20px;
  }
}
</style>
