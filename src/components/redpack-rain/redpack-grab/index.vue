<!-- @file 抢红包组件 -->

<template>
  <div
    class="plv-ia-c-redpack-rain__grab"
  >
    <!-- 流星背景 -->
    <div class="plv-ia-c-redpack-rain__grab__back-meteor-board">
      <rolling-board
        ref="meteorBoard"
        speed="middle"
      />
    </div>
    <!-- 红包下落 -->
    <div class="plv-ia-c-redpack-rain__grab__redpack-board">
      <rolling-board
        ref="redpackBoard"
        speed="fast"
        :is-rand-size="isRandSize"
        :class-count="classCount"
        @click-item="handleClickRedpack"
      />
    </div>
    <transition name="slideup">
      <div v-if="bottomBgVisible" class="plv-ia-c-redpack-rain__grab__bottom-bg"></div>
    </transition>
  </div>
</template>

<script>
import RollingBoard from '../rolling-board';
import { getTranslateX } from '@/assets/utils/rolling-board/dom';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
const DEFAULT_ICON_COUNT = 3; // 默认红包样式数量

export default {
  components: {
    RollingBoard,
  },

  inject: ['redpackRainVm'],

  props: {
    visible: {
      type: Boolean,
    },

    status: {
      type: String,
      default: '',
    },

    allStatus: {
      type: Object,
      default: () => ({})
    },

    // 红包雨实例
    redpackRain: {
      type: Object,
      default: () => null
    },

    // 自定义主题图片
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  data() {
    return {
      bottomBgVisible: false,
      // 自上次开启红包后，累积点击红包数量
      clickRedpackCount: 0,
      // 随机数，范围[2, 5]，累积点击红包数达到则开启红包。显示开启红包弹窗不代表真正领取红包，有0.5几率调用抢红包接口
      randCountForOpen: 0,
    };
  },

  computed: {
    classCount() {
      return DEFAULT_ICON_COUNT;
    },
    // 落下物是否随机大小
    isRandSize() {
      return this.customImgConfig?.rainThemeBollImgArray?.length !== 0;
    },
    hasCustomThemeImg() {
      const { rainThemeBollImgArray, rainThemeBottomBgImg } = this.customImgConfig;
      return (rainThemeBollImgArray && rainThemeBollImgArray.length > 0) || (rainThemeBottomBgImg && rainThemeBottomBgImg !== '');
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler() {
        if (!this.$refs.redpackBoard) {
          return;
        }
        if (this.visible) {
          !this.$refs.redpackBoard.inited && this.setRedpackBoard();
          setTimeout(() => {
            this.$refs.redpackBoard && this.$refs.redpackBoard.resume();
            this.bottomBgVisible = true;
          }, 50);
        } else {
          this.$refs.redpackBoard && this.$refs.redpackBoard.pause();
          this.bottomBgVisible = false;
        }
      }
    },
    customImgConfig: {
      immediate: true,
      handler(val) {
        if (val?.rainThemeBollImgArray || val?.rainThemeBottomBgImg) {
          this.setThemePacketImg(val);
        }
      }
    }
  },

  mounted() {
    this.initCount();
  },

  [BEFORE_DESTROY]() {
    this.clearRedpackBoard();
    this.clearCustomThemeStyles();
  },

  methods: {
    // 设置红包图片/背景
    setThemePacketImg(packetImg) {
      const { rainThemeBottomBgImg, rainThemeBollImgArray } = packetImg;
      packetImg.rainThemeBottomBgImg && window.document.documentElement.style
        .setProperty('--redpack-bottom-bg', `url(${rainThemeBottomBgImg})`);

      if (rainThemeBollImgArray && rainThemeBollImgArray.length !== 0) {
        const baseActionImg = rainThemeBollImgArray[0];
        window.document.documentElement.style
          .setProperty('--action-item', `url(${baseActionImg})`);
        Array
          .from({ length: DEFAULT_ICON_COUNT }, (v, k) => k)
          .forEach(item => {
            // 第一张默认为基础红包主题样式
            window.document.documentElement.style
              .setProperty(`--action-item-${item + 1}`, `url(${rainThemeBollImgArray[item] ? rainThemeBollImgArray[item] : baseActionImg})`);
          });
      }
    },
    clearCustomThemeStyles() {
      const delStyleValues = [
        '--redpack-bottom-bg',
        '--action-item',
        ...Array.from({ length: DEFAULT_ICON_COUNT }, (v, k) => `--action-item-${k + 1}`)
      ];
      delStyleValues.forEach(item => {
        window.document.documentElement.style.removeProperty(item);
      });
    },
    setRedpackBoard() {
      this.$nextTick(() => {
        if (this.$refs.redpackBoard.inited) { return; }
        const redpackBoard = this.$refs.redpackBoard;
        redpackBoard && redpackBoard.init();
      });
    },

    clearRedpackBoard() {
      const redpackBoard = this.$refs.redpackBoard;
      redpackBoard && redpackBoard.destroy();
    },

    handleClickRedpack(event = {}) {
      if (this.clickRedpackCount > 5) {
        // 超过5个未处理的情况
        this.initCount();
        return;
      }
      // 增加累积点击数
      this.clickRedpackCount += 1;
      const shouldOpen = this.clickRedpackCount === this.randCountForOpen;
      // console.info('累积点击：', this.clickRedpackCount, ', 需要点击: ', this.randCountForOpen);

      const { data, e } = event;
      const el = e.currentTarget;
      const handleCoinAnimationEnd = () => {
        this.$refs.redpackBoard.removeFromTrack(data, el);
        console.info('硬币动画结束，移除红包dom并准备展示红包弹窗');
        // 准备展示红包弹窗
        this.handleOpenRedpack();
      };
      const handleDisappearAnimationEnd = () => {
        // console.info('红包消失动画结束');
        if (!shouldOpen) {
          this.$refs.redpackBoard.removeFromTrack(data, el);
        }
      };
      if (el.getAttribute('data-clicked') === 'Y') {
        return;
      } else {
        el.setAttribute('data-clicked', 'Y');
      }
      // 累积数量达到可开启值, 展示硬币和后续动画
      el.style.left = `${el.parentNode.clientWidth + getTranslateX(el)}px`;
      el.style.transform = '';
      el.style.transition = '';
      // 包含背景图的节点
      const currentEl = el.querySelector('.plv-redpack-rain-default__rolling-board-item');
      // 由于金币动画和红包动画时间重叠，需要分离，所以插入内部的红包元素节点和金币节点
      // 插入红包子节点
      const innerEl = document.createElement('div');
      innerEl.className = 'plv-ia-c-redpack-rain__grab__redpack-board__item__inner';
      innerEl.style.backgroundImage = window.getComputedStyle(currentEl).backgroundImage;

      el && (el.appendChild(innerEl));

      // 隐藏外部红包背景
      currentEl.style.backgroundImage = 'none';
      currentEl && currentEl.classList.add('plv-ia-c-redpack-rain__grab__redpack-board__item--disappear');
      // 如果可以开启红包，插入金币节点
      if (shouldOpen) {
        setTimeout(() => {
          el && (el.innerHTML = '<div class="plv-ia-c-redpack-rain__grab__redpack-board__item__coin"></div>');
          const coinEl = el && el.querySelector('.plv-ia-c-redpack-rain__grab__redpack-board__item__coin');
          coinEl && coinEl.addEventListener('animationend', handleCoinAnimationEnd, false);
        }, 250);
      } else {
        const innerRedpackEl = el && el.querySelector('.plv-ia-c-redpack-rain__grab__redpack-board__item__inner');
        innerRedpackEl && innerRedpackEl.addEventListener('animationend', handleDisappearAnimationEnd, false);
      }
    },

    // 初始化点击累积值。生成随机值，累积点红包达到改值，将显示开启红包弹窗（但只有一半几率调用领取红包接口）
    initCount() {
      this.clickRedpackCount = 0;
      this.randCountForOpen = Math.floor(Math.random() * 3) + 2; // [2, 5]
    },

    // 数量达到开启值
    handleOpenRedpack() {
      // 显示开启红包弹窗时，只有一半几率会调用真实接口
      const shouldFetch = Math.random() >= 0.2;
      // console.info('调用几率', shouldFetch, this.redpackRainVm.realGrabAmount);
      if (shouldFetch && !this.redpackRainVm.realGrabAmount) {
        console.info('准备调用接口, 开启弹窗');
        // 应该调用接口。次数达到，且未调用过。
        this.$emit('grab-and-fetch');
        this.initCount();
      } else {
        // console.log('准备开启红包溜走弹窗');
        this.$emit('grab-not-fetch');
        this.initCount();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/basic.scss';

// 红包点击额外热区，用于增加点击范围
$extra-hot-area: 40px;

// 红包样式图片地址
$redpack-imgs: var(--redpack-imgs, url('./imgs/redpack.png'));
$redpack-action-items-map: (item, var(--action-item, url('./imgs/action-item.png'))),
  (item-1, var(--action-item-1, url('./imgs/action-item.png'))),
  (item-2, var(--action-item-2, url('./imgs/action-item.png'))),
  (item-3, var(--action-item-3, url('./imgs/action-item.png')));
$redpack-bottom-bg: var(--redpack-bottom-bg, url('./imgs/redpack-bottom-bg.png'));

.plv-ia-c-redpack-rain__grab {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
.plv-ia-c-redpack-rain__grab__redpack {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 80px;
  height: 80px;

  background-image: $redpack-imgs;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  transform: translate(-50%, -50%);
}
.plv-ia-c-redpack-rain__grab__bottom-bg {
  position: absolute;
  bottom: 0;
  left: 0;

  padding-top: 48.8%;
  width: 100%;
  height: 0;

  background-image: $redpack-bottom-bg;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  pointer-events: none;
}
// 默认主题
.plv-ia-c-redpack-rain__grab__redpack-board {
  position: absolute;
  top: 38%;
  left: 50%;

  box-sizing: border-box;
  // 顶部多出40px，用于增加点击热区
  padding-right: $extra-hot-area;
  width: 100vh;
  height: 120vw;

  background-position: 0 50%;
  background-size: calc(100% - #{$extra-hot-area}) 100%;

  transform: rotate(-45deg);
  transform-origin: 0 120%;

  @each $class, $url in $redpack-action-items-map {
    ::v-deep .plv-redpack-rain-default__rolling-board-#{$class} {
      background-image: $url;

      transform: rotate(90deg);
    }
  }
  ::v-deep .plv-redpack-rain-default__rolling-board-item-1 {
    width: 100px;
    height: 78.63px;
  }
  ::v-deep .plv-redpack-rain-default__rolling-board-item-2 {
    width: 80px;
    height: 62.9px;
  }
  ::v-deep .plv-redpack-rain-default__rolling-board-item-3 {
    width: 60px;
    height: 47.18px;
  }
}
.plv-ia-c-redpack-rain__grab ::v-deep .plv-ia-c-redpack-rain__grab__redpack-board__item--disappear {
  background-image: none;
}
.plv-ia-c-redpack-rain__grab ::v-deep .plv-ia-c-redpack-rain__grab__redpack-board__item__inner {
  position: absolute;
  top: 0;
  left: $extra-hot-area;

  width: 100%;
  height: 100%;

  background-image: url(./imgs/action-item.png);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: contain;

  transform: rotate(90deg); // 动画图本身是倾斜的，需要配合容器倾斜方向
  animation: redpack-disappear 0.5s ease-in-out;
}
.plv-ia-c-redpack-rain__grab ::v-deep .plv-ia-c-redpack-rain__grab__redpack-board__item__coin {
  position: absolute;
  top: 50%;
  left: 50%;

  margin-top: -39px;
  margin-left: -50px + $extra-hot-area;
  // 变为金币背景时，尺寸保持最大类型规格
  width: 100px;
  height: 78.63px;

  background-image: url(./imgs/coin.gif);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;

  transform: rotate(45deg); // 动画图本身是倾斜的，需要配合容器倾斜方向
  animation: coin-disappear 1s ease-in-out;
}
@keyframes redpack-disappear {
  0% {
    opacity: 1;
    transform: scale(1) rotate(90deg);
  }
  20% {
    opacity: 1;

    transform: scale(.9) rotate(90deg);
  }
  100% {
    opacity: 0;

    transform: scale(1.3) rotate(90deg);
  }
}

@keyframes coin-disappear {
  0% {
    opacity: 1;

    transform: scale(1) rotate(45deg);
  }
  100% {
    opacity: 0;

    transform: scale(.6) rotate(45deg);
  }
}

.slideup-enter-active {
  animation: slideup .3s;
}

.slideup-leave-active {
  animation: slideup .3s reverse;
}

@keyframes slideup {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
