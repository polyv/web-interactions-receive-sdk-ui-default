<template>
  <div class="plv-ia-tuwen-message-item">
    <div class="plv-ia-tuwen-message-item-avatar">
      <img :src="userInfo.avatar" alt="" />
    </div>
    <div class="plv-ia-tuwen-message-item-content">
      <div class="plv-ia-tuwen-message-item-content__top">
        <div class="pws-plv-ia-tuwen-message-item-content-name">{{ userInfo.actor }}<span class="plv-ia-tuwen-message-item-content-nickname">-{{ userInfo.nickname }}</span></div>
        <div
          v-if="content.top === 'Y'"
          class="plv-ia-tuwen-message-item-content--tag"
        >
          {{ iarTrans('tuwen.top') }}
        </div>
      </div>
      <div class="pws-plv-ia-tuwen-message-item-content-time">{{ formatData(content.createdTime) }}</div>
      <div class="pws-plv-ia-tuwen-message-item-content-text" v-html="content.text"></div>
      <div
        v-if="content.images.length > 0"
        class="plv-ia-tuwen-message-item-images"
        :class="{
          'plv-ia-tuwen-message-item-images__multiple--1x4': content.images.length === 4,
          'plv-ia-tuwen-message-item-images__multiple': content.images.length !== 4 && content.images.length !== 1,
          'plv-ia-tuwen-message-item-images__single': content.images.length === 1,
        }"
      >
        <img
          v-for="(imageItem, imageIndex) of content.images"
          :key="`message-image-${content.id}-${imageIndex}`"
          :src="imageItem + suffix"
          alt=""
          @click="clickPicture(imageItem)"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { formatDate } from '@polyv/utils/src/date';
import basicMixin from '../../../assets/mixins/basic';

export default {
  mixins: [basicMixin],
  props: {
    suffix: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: () => { return {}; }
    },
    content: {
      type: Object,
      default: () => { return {}; }
    }
  },
  methods: {
    formatData(val) {
      return formatDate(new Date(val), 'YYYY-MM-DD hh:mm');
    },
    clickPicture(image) {
      this.$emit('click-picture', image);
    }
  }
};
</script>
<style lang="scss">
.plv-ia-tuwen-message-item {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  .plv-ia-tuwen-message-item-avatar {
    margin-bottom: 12px;
    width: 28px;
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }
  .plv-ia-tuwen-message-item-content {
    flex: 1;
    padding-left: 12px;
    .plv-ia-tuwen-message-item-content__top {
      display: flex;
      align-items: center;
      .plv-ia-tuwen-message-item-content--tag {
        float: left;
        height: 14px;
        line-height: 14px;
        padding: 0 4px;
        margin-left: 8px;
        border-radius: 2px;
        border: 1px solid #f1453d;
        font-style: normal;
        font-size: 12px;
        text-align: center;
        color: #f1453d;
      }
    }
    .pws-plv-ia-tuwen-message-item-content-name {
      color: #5c9dff;
      font-size: 14px;
      margin-right: 4px;
    }
    .pws-plv-ia-tuwen-message-item-content-time {
      margin-top: 6px;
      font-size: 12px;
      color: #adadc0;
      line-height: 1;
    }
    .pws-plv-ia-tuwen-message-item-content-text {
      margin-top: 12px;
      font-size: 14px;
      color: #333;
      p {
        margin: 0 !important;
      }
    }
  }
  .plv-ia-tuwen-message-item-images {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
    img {
      width: 200px;
      height: 200px;
      margin-right: 16px;
      margin-bottom: 16px;
    }
  }
  .plv-ia-tuwen-message-item-images__single {
    width: 640px;
    height: 360px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .plv-ia-tuwen-message-item-images__multiple {
    width: 700px;
  }
  // 4个情况下 是1x4的布局
  .plv-ia-tuwen-message-item-images__multiple--1x4 {
    flex-wrap: nowrap;
  }
}
</style>
