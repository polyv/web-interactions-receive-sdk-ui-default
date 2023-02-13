<template>
  <div class="plv-ia-tuwen-container">
    <div
      class="plv-ia-tuwen-list"
    >
      <imageList
        v-if="mode === 2"
        :list="messages"
        :top-list="topMessages"
        :user-info="userInfo"
        @click-picture="handleClickPicture"
      />
      <messageList
        v-else
        :list="messages"
        :top-list="topMessages"
        :user-info="userInfo"
        @click-icture="handleClickPicture"
      />
    </div>
    <!-- 加载 -->
    <loading v-show="loading" />
    <no-more v-show="noMore" :text="iarTrans('tuwen.noMore')" />
    <load-error v-if="loadError" />

    <!--    预览图-->
    <div
      v-if="showPreview"
      class="plv-tuwen__preview g-fade-in"
    >
      <div
        class="plv-tuwen__preview__img"
        :style="{
          backgroundImage: `url(${previewImgs[previewIndex]})`
        }"
      ></div>

      <i class="plv-tuwen__preview__prev plv-tuwen__preview--icon" :class="{'plv-tuwen__preview--disabled': previewIndex === 0}" @click.stop="prevPreviewImg"></i>
      <i
        class="plv-tuwen__preview__next plv-tuwen__preview--icon"
        :class="{
          'plv-tuwen__preview--disabled': previewIndex === previewImgs.length - 1
        }"
        @click.stop="nextPreviewImg"
      ></i>
      <i class="plv-tuwen__preview__close plv-tuwen__preview--icon" @click.stop="closePreviewImg"></i>

      <div v-if="previewTips" class="plv-tuwen-live__preview__tips g-fade-in">
        {{ previewTips }}
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './tuwen-mixin';
import MessageList from '../../components/tuwen/message-list/PcMessageList.vue';
import ImageList from '../../components/tuwen/image-list/PcImageList';
import LoadError from '../../components/tuwen/LoadError';
import Loading from '../../components/tuwen/Loading';
import NoMore from '../../components/tuwen/no-more/NoMore';

export default {
  components: {
    MessageList,
    ImageList,
    Loading,
    NoMore,
    LoadError,
  },
  mixins: [mixin],

};
</script>
<style lang="scss">

.plv-ia-tuwen-list {
  overflow: auto;
}

// 预览图
.plv-tuwen__preview,
.plv-tuwen__preview__img {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
.plv-tuwen__preview {
  background: rgba(0, 0, 0, 0.7);
  z-index: 10000;
}
.plv-tuwen__preview--icon {
  position: absolute;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-size: 100% 100%;
  top: 50%;
  transform: translateY(-50%);
}
.plv-tuwen__preview--disabled {
  opacity: 0.5;
}
.plv-tuwen__preview__prev {
  left: 20px;
  background-image: url(./imgs/pc-icon-prev.png);
}
.plv-tuwen__preview__next {
  right: 20px;
  background-image: url(./imgs/pc-icon-next.png);
}
.plv-tuwen__preview__close {
  top: 20px;
  right: 20px;
  background-image: url(./imgs/pc-icon-close.png);
}
.plv-tuwen-live__preview__tips {
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
  height: 30px;
  line-height: 30px;
  background-color: #ffb648;
  padding: 0 30px;
  color: #fff;
}
</style>
