<template>
  <div
    class="plv-iar-mobile-announcement-bar-default"
    :style="{width: `${clientWidth}px`}"
  >
    <div class="plv-iar-mobile-announcement-bar-default__inner">
      <i class="plv-iar-mobile-announcement-bar-default__icon"></i>
      <span class="plv-iar-mobile-announcement-bar-default__title">公告：</span>
      <div
        ref="announcementBarContent"
        class="plv-iar-mobile-announcement-bar-default__content"
      >
        <div
          ref="announcementBarText"
          class="plv-iar-mobile-announcement-bar-default__text"
          @transitionend="handleTransitioned"
        >
          {{ renderContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulletinMixins from './mixin';
import { setStyle, htmlStr2Text } from '../../assets/utils/dom';

export default {
  mixins: [bulletinMixins],

  props: {
    clientWidth: {
      type: Number,
      default: 0
    },
    // 每行阅读时间, 默认是为4秒
    speed: {
      type: Number,
      default: 4
    }
  },

  data() {
    return {
      animationTimer: null,
      renderContent: '',
    };
  },

  watch: {
    visible(val) {
      if (val && this.content) {
        this.formatHtml(this.content);
        this.$nextTick(() => {
          this.createAnimation();
        });
      } else {
        this.$emit('to-hide', null);
      }
    }
  },

  methods: {
    formatHtml(content) {
      this.renderContent = htmlStr2Text(content);
    },

    createAnimation() {
      // 创建前先重置
      this.destroyAnimation();

      const contentDom = this.$refs.announcementBarContent;
      const textDom = this.$refs.announcementBarText;
      const displacement = textDom.clientWidth - contentDom.clientWidth;

      const baseTime = this.speed;
      // 当公告长度不需要移动时
      if (displacement <= 0) {
        this.animationTimer = setTimeout(() => {
          this.$emit('to-hide', null);
        }, baseTime * 1000);
        return;
      }
      // 滑动时间为：(文本长度 / 显示区域长度) * 基础时间
      const second = parseInt((textDom.clientWidth / contentDom.clientWidth) * baseTime, 10);
      setStyle(textDom, 'transition', `left ${second}s linear`);
      setStyle(textDom, 'left', `-${displacement}px`);
    },

    destroyAnimation() {
      const textDom = this.$refs.announcementBarText;
      clearTimeout(this.animationTimer);
      setStyle(textDom, 'transition', '');
      setStyle(textDom, 'left', '');
    },

    // 动画结束，停留2秒清空动画属性
    handleTransitioned() {
      this.animationTimer = setTimeout(() => {
        this.destroyAnimation();
        this.$emit('to-hide', null);
      }, 2 * 1000);
    },
  }
};
</script>

<style lang="scss">
.plv-iar-mobile-announcement-bar-default {
  position: absolute;
  top: 66px;
  left: 0;
  padding: 0 15px;
  box-sizing: border-box;
  .plv-iar-mobile-announcement-bar-default__inner {
    height: 24px;
    border-radius: 12px;
    background: rgba(1, 129, 255, .7);
    padding: 0 15px 0 8px;
    display: inline-flex;
    align-items: center;
    color: #fff;
    font-size: 12px;
    max-width: 100%;
    box-sizing: border-box;
  }
  .plv-iar-mobile-announcement-bar-default__icon {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 12px;
    height: 12px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB0ElEQVRIS8WVP0hVYRjGfw8VVJYWNugQXFviZoMRGOUdAoMg9NZQ0eIS/SEpCppCAglqqCEXJbA2cRWnnAwHCVqChihaitbcdDOe+OC9IHbOvSc90Ledc77397zv853vfUVJy/Y5YA54B1yX9CuhVQbfdh2YBdqCtyhpcNsCtvcCT4F7wI5NyQ5KWtxSBbZT3DDwEjiS48K0pFv/JGB7P3AFeAgca2HvF0nVpgKRaRWoAReA88Duguf2G9jzl4Dtq8AloCeybC8IzNpWke238eWrpAe2p4A724BuDD2RBBxvPkg6VbLAwH8RmARGS7KollVBmQKZFpUpcDxVkIBpfZf0Ip7LsCj9PB1Z9+BiXKhO4DBQAbq3cCY/JFUKtQrbB4E+4AyQ2vIAsKuF6GtJN3MFbN8FjgZkXNJKA2g7VXctLmRvjlBN0nIzgQngfgSPSJrZDIpedRl4HlY2tsxLSu0mf+DYTo1tISI+ASclrWdla3sfMB1VLQFDklZbCewEfgJdAR2T9CzP96jmNPBeUqP9NB+Zth8DTwKasq9LajTHQj9Wq3lwAPgGHAraGtAv6XMhepGhb/s28GoD8I2kG6UJJFDMjLPAR+CRpHSQhdYfuaGvc8jj84oAAAAASUVORK5CYII=);
  }
  .plv-iar-mobile-announcement-bar-default__title {
    margin-left: 4px;
  }
  .plv-iar-mobile-announcement-bar-default__content {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    .plv-iar-mobile-announcement-bar-default__text {
      position: relative;
      left: 0;
      display: inline-block;
    }
  }
}
</style>
