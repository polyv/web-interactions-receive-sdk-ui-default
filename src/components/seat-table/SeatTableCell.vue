<template>
  <div
    class="plv-iar-seat-table__cell"
    :class="{
      'plv-iar-seat-table__cell--current': viewerInfo.isCurrent,
    }"
  >
    <div class="plv-iar-seat-table__cell__inner">
      <!-- 空座位状态 -->
      <div
        v-if="!viewerInfo.viewerId"
        class="plv-iar-seat-table__cell__empty pws-seat-table-sofa"
      ></div>
      <div v-else class="plv-iar-seat-table__cell__user">
        <div
          class="plv-iar-seat-table__cell__user__avatar"
          :class="{
            'plv-iar-seat-table__cell__user__avatar--current': viewerInfo.isCurrent,
            'pws-seat-table-current-seat': viewerInfo.isCurrent,
          }"
          :style="{
            backgroundImage: `url(${avatarUrl})`
          }"
        >
          <div
            v-if="viewerInfo.isCurrent"
            class="plv-iar-seat-table__cell__user__avatar__out"
            :class="{
              'plv-iar-seat-table__cell__user__avatar__out--animation': animationVisible,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BEFORE_DESTROY } from '@/assets/utils/compat';
const defaultViewerAvatar = '//s1.videocc.net/default-img/avatar/viewer.png';

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    viewerInfo: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      animationVisible: false,
      animationTimer: undefined,
      showAvatar: false, // 是否显示头像
    };
  },

  computed: {
    isCurrent() {
      return this.viewerInfo.isCurrent;
    },
    avatarUrl() {
      if (this.showAvatar) {
        return this.viewerInfo.avatar;
      }
      return defaultViewerAvatar;
    },
  },

  watch: {
    'viewerInfo.avatar': {
      handler() {
        this.checkLazyLoad();
      }
    }
  },

  mounted() {
    this.checkLazyLoad();
  },

  [BEFORE_DESTROY]() {
    this.clearAnimationTimer();
  },

  methods: {
    // 清空动画定时器
    clearAnimationTimer() {
      clearTimeout(this.animationTimer);
      this.animationTimer = undefined;
    },

    // 显示闪烁动画
    showAnimation() {
      this.animationVisible = true;
      this.animationTimer = setTimeout(() => {
        this.animationVisible = false;
      }, 3000);
    },

    checkLazyLoad(scrollEl) {
      if (!this.viewerInfo.avatar) {
        return;
      }
      scrollEl = scrollEl || document.querySelector('.plv-iar-seat-table__scroll') || document.documentElement;
      const scrollRect = scrollEl.getBoundingClientRect();
      let scrollStart = 0;
      if (scrollEl !== document.documentElement) {
        scrollStart = scrollRect.top;
      }
      const scrollEnd = scrollStart + scrollEl.clientHeight;

      const elRect = this.$el.getBoundingClientRect();
      const elStart = elRect.top;
      const elEnd = elStart + scrollEl.clientHeight;

      // 节点在滚动区域内才加载头像
      if (
        (elStart >= scrollStart && elEnd <= scrollEnd) ||
        (scrollStart >= elStart && scrollStart <= elEnd) ||
        (scrollEnd >= elStart && scrollEnd <= elEnd)
      ) {
        this.showAvatar = true;
      }
    },
  },
};
</script>

<style lang="scss">
.plv-iar-seat-table__cell {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  flex-shrink: 0;
}
.plv-iar-seat-table__cell__inner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
}

.plv-iar-seat-table__cell__empty {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.plv-iar-seat-table__cell__user {
  width: 100%;
  height: 100%;
}

.plv-iar-seat-table__cell__user__avatar {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  border-radius: 50%;
  box-sizing: border-box;
  border: 0.5px solid rgba(#fff, 0.6);
}

.plv-iar-seat-table__cell__user__avatar--current {
  border-width: 2px !important;
  border-color: #3082FE !important;
  border-style: solid !important;
}

.plv-iar-seat-table__cell__user__avatar__out {
  width: 127%;
  height: 127%;
  border-radius: 50%;
  border: 1px solid #3082FE;
  border-width: 1px;
  border-style: solid;
  border-color: inherit;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
  transition: 0.5s;
}

.plv-iar-seat-table__cell__user__avatar__out--animation {
  animation-name: current-animation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes current-animation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
