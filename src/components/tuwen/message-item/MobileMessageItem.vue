<template>
  <div class="plv-ia-tuwen-message-item">
    <div class="plv-ia-tuwen-message-item-avatar">
      <img :src="userInfo.avatar" alt="" />
    </div>
    <div class="plv-ia-tuwen-message-item-content">
      <div class="plv-ia-tuwen-message-item-content__top">
        <div class="pws-plv-ia-tuwen-message-item-content-name">{{ userInfo.actor }} <span class="plv-ia-tuwen-message-item-content-nickname">-{{ userInfo.nickname }}</span></div>
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
          'plv-ia-tuwen-message-item-images__multiple--2x2': content.images.length === 4,
          'plv-ia-tuwen-message-item-images__multiple': content.images.length > 1,
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
        <!-- :preview-src-list="content.images | changeImageSort(imageIndex)"-->
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
    width: 32px;
    img {
      width: 32px;
      height: 32px;
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
      color: #78a7ed;
      font-size: 12px;
      margin-right: 4px;
    }
    .pws-plv-ia-tuwen-message-item-content-time {
      margin-top: 6px;
      font-size: 12px;
      color: #adadc0;
      line-height: 1;
    }
    .pws-plv-ia-tuwen-message-item-content-text {
      margin-top: 7px;
      font-size: 16px;
      color: #333;
      line-height: 22px;
      p {
        margin: 0 !important;
      }
    }
  }
  .plv-ia-tuwen-message-item-images {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    img {
      height: 80px;
      width: 80px;
      margin-right: 3px;
      margin-bottom: 3px;
    }
  }
  .plv-ia-tuwen-message-item-images__single {
    width: 295px;
    height: 166px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // 4个情况下 是2x2布局
  .plv-ia-tuwen-message-item-images__multiple--2x2 {
    width: 200px;
  }
}
</style>
