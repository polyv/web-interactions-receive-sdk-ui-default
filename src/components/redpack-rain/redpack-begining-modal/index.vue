<!-- @file 开场倒计时动画组件 -->

<template>
  <div v-show="visible" class="plv-redpack-rain__begining">
    <transition name="zoom" @after-enter="handleBgTransitionEnd">
      <!-- 开场动画图片 -->
      <div v-show="bgVisible" class="plv-redpack-rain__begining__main">
        <!-- 开场倒数 -->
        <div class="plv-redpack-rain__begining__main__bg" :style="{'background-image': redpackBeginingBgImg ? `url(${redpackBeginingBgImg})`: null}"></div>
        <div
          ref="digit"
          class="plv-redpack-rain__begining__main__digit"
        >
          <div class="plv-redpack-rain__begining__main__digit__inner plv-redpack-rain__begining__main__digit__inner-3"></div>
        </div>

        <!-- 左上角彩带 -->
        <div
          class="plv-redpack-rain__begining__ribbon"
          :class="{
            'plv-redpack-rain__begining__ribbon--transition': decorationVisible,
          }"
        ></div>
        <!-- 右上角金币 -->
        <div
          class="plv-redpack-rain__begining__top-right-coin"
          :class="{
            'plv-redpack-rain__begining__top-right-coin--transition': decorationVisible
          }"
        ></div>
        <!-- 右边金币 -->
        <div
          class="plv-redpack-rain__begining__right-coin"
          :class="{
            'plv-redpack-rain__begining__right-coin--transition': decorationVisible
          }"
        ></div>
      </div>
    </transition>

    <!-- 前景流星 -->
    <div class="plv-redpack-rain__begining__front-meteor-board">
      <rolling-board
        ref="meteorBoard"
        speed="middle"
        :class-count="2"
      />
    </div>
  </div>
</template>

<script>
import RollingBoard from '../rolling-board';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  components: {
    RollingBoard,
  },

  props: {
    status: {
      type: String,
      default: '',
    },

    allStatus: {
      type: Object,
      default: () => ({})
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  data() {
    return {
      // 倒计时定时器
      leftTime: 3,
      bgVisible: false,
      decorationVisible: false,
    };
  },

  computed: {
    visible() {
      return this.status === this.allStatus.begining;
    },
    redpackBeginingBgImg() {
      const { customImgConfig } = this;
      return customImgConfig && customImgConfig.redpackBeginingBgImg ? customImgConfig.redpackBeginingBgImg : null;
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler() {
        if (this.visible) {
          this.setMeteorBoard();
          setTimeout(() => {
            this.bgVisible = true;
          }, 50);
        } else {
          this.clearMeteorBoard();
          this.bgVisible = false;
        }
      }
    },
  },

  [BEFORE_DESTROY]() {
    this.clearMeteorBoard();
  },

  methods: {
    setDigit() {
      const digitEl = this.$refs.digit;
      const div = document.createElement('div');
      div.className = `plv-redpack-rain__begining__main__digit__inner plv-redpack-rain__begining__main__digit__inner-${this.leftTime}`;
      digitEl.innerHTML = '';
      digitEl.appendChild(div);
      div.addEventListener('animationend', this.handleAnimationEnd);
    },

    handleAnimationEnd() {
      this.leftTime -= 1;
      if (this.leftTime < 1) {
        this.$emit('close');
        return;
      }
      this.setDigit();
    },

    setMeteorBoard() {
      this.$nextTick(() => {
        if (this.$refs.meteorBoard.inited) { return; }
        const meteorBoard = this.$refs.meteorBoard;
        meteorBoard && meteorBoard.init();
      });
    },

    clearMeteorBoard() {
      const meteorBoard = this.$refs.meteorBoard;
      meteorBoard && meteorBoard.destroy();
    },

    handleBgTransitionEnd() {
      this.decorationVisible = true;
      this.setDigit();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../entry/redpack-rain/redpack.scss';
@import '../../../assets/styles/basic.scss';

.plv-redpack-rain__begining__main {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}
.plv-redpack-rain__begining__main__bg {
  width: 100%;
  height: 0;
  padding-top: 137.01%;
  @include bg('./imgs/redpack-begining-bg.png');
}

.plv-redpack-rain__begining__main__digit {
  position: absolute;
  bottom: 27%;
  margin-left: -7.7vw;
  left: 50%;
  width: 15vw;
  height: 15vw;
}
.plv-redpack-rain__begining__main__digit ::v-deep .plv-redpack-rain__begining__main__digit__inner {
  width: 100%;
  height: 100%;
  &-1 {
    @include bg('./imgs/redpack-begining-digit-1.png');
    background-size: contain;
    animation: countdown 1s ease;
  }
  &-2 {
    @include bg('./imgs/redpack-begining-digit-2.png');
    background-size: contain;
    animation: countdown 1s ease;
  }
  &-3 {
    @include bg('./imgs/redpack-begining-digit-3.png');
    background-size: contain;
    animation: countdown 1s ease;
  }
}

.plv-redpack-rain__begining__front-meteor-board {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(-45deg);
  transform-origin: 0 120%;
  width: 100vh;
  height: 100vw;
  ::v-deep .plv-redpack-rain-default__rolling-board-item {
    width: 100px;
    height: 30px;
    background-image: url(../imgs/redpack-meteor-front-1.png);
  }
  ::v-deep .plv-redpack-rain-default__rolling-board-item-1 {
    background-image: url(../imgs/redpack-meteor-front-1.png);
    width: 100px;
    height: 35px;
  }
  ::v-deep .plv-redpack-rain-default__rolling-board-item-2 {
    background-image: url(../imgs/redpack-meteor-front-2.png);
    width: 60px;
    height: 15px;
  }
}

$ribbon-init-top: 180px;
$ribbon-init-left: 50px;
$ribbon-trans-top: 150px;
$ribbon-trans-left: 10px;
.plv-redpack-rain__begining__ribbon {
  position: absolute;
  top: $ribbon-init-top;
  left: $ribbon-init-left;
  width: 40px;
  height: 30px;
  opacity: 0;
  transform: rotateY(180deg);
  @include bg('./imgs/redpack-begining-light.png');
  &--transition {
    top: $ribbon-trans-top;
    left: $ribbon-trans-left;
    opacity: 1;
    animation: ribbon-transition 2s ease;
  }
}
@keyframes ribbon-transition {
  0% {
    opacity: 0;
    top: $ribbon-init-top;
    left: $ribbon-init-left;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: $ribbon-trans-top;
    left: $ribbon-trans-left;
    opacity: 1;
  }
}

$top-right-coin-init-top: 130px;
$top-right-coin-init-right: 90px;
$top-right-coin-trans-top: 90px;
$top-right-coin-trans-right: 50px;
.plv-redpack-rain__begining__top-right-coin {
  position: absolute;
  top: $top-right-coin-init-top;
  right: $top-right-coin-init-right;
  width: 50px;
  height: 50px;
  opacity: 0;
  transform: rotate(90deg);
  @include bg('../imgs/modal-frags-coin.png');
  &--transition {
    top: $top-right-coin-trans-top;
    right: $top-right-coin-trans-right;
    opacity: 1;
    animation: top-right-coin-transition 2s ease;
  }
}
@keyframes top-right-coin-transition {
  0% {
    opacity: 0;
    top: $top-right-coin-init-top;
    right: $top-right-coin-init-right;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: $top-right-coin-trans-top;
    right: $top-right-coin-trans-right;
    opacity: 1;
  }
}

$right-coin-init-top: 230px;
$right-coin-init-right: 50px;
$right-coin-trans-top: 210px;
$right-coin-trans-right: 0;
.plv-redpack-rain__begining__right-coin {
  position: absolute;
  top: $right-coin-init-top;
  right: $right-coin-init-right;
  width: 60px;
  height: 60px;
  opacity: 0;
  transform: rotate(90deg);
  @include bg('../imgs/modal-frags-coin.png');

  &--transition {
    top: $right-coin-trans-top;
    right: $right-coin-trans-right;
    opacity: 1;
    animation: right-coin-transition 2s ease;
  }
}
@keyframes right-coin-transition {
  0% {
    opacity: 0;
    top: $right-coin-init-top;
    right: $right-coin-init-right;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: $right-coin-trans-top;
    right: $right-coin-trans-right;
    opacity: 1;
  }
}

@keyframes countdown {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  10% {
    opacity: 1;
    transform: scale(1.6);
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
