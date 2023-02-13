<!-- 反馈 pc 端 demo -->

<template>
  <div>
    <button @click="onSetFeedBackVisible(true)">举报反馈</button>
    <!-- 反馈弹窗 -->
    <modal
      draggable
      body-locked
      title="举报反馈"
      :no-bg="true"
      :visible="isShowFeedBack"
      @close="onSetFeedBackVisible(false)"
    >
      <!-- 反馈组件内容 -->
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
import mixin from './mixin';
import FeedBack from '../../entry/feed-back/PcFeedBack.vue';
import Modal from '../demo-modal/PcModal';

export default {
  components: {
    Modal,
    FeedBack
  },

  mixins: [
    mixin,
  ],
};
</script>
