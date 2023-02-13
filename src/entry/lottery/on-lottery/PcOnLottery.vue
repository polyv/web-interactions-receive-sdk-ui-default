<template>
  <div v-show="lotteryStatus === 'running'" class="plv-on-lottery-default">
    <!-- 默认抽奖动图 -->
    <div v-if="pattern === allLotteryPatterns.default" class="plv-on-lottery-default--default-pattern">
      <div class="plv-on-lottery-default--box__close" @click="onClickClose"></div>
      <svga-player
        ref="defaultSvga"
        :default-start="false"
        :src="lotteryBoxSvgaUrl"
        class="plv-on-lottery-default--default-pattern__main plv-on-lottery-shake-animation"
        :class="{'plv-on-lottery-shake-animation-1x': animationSpeed === 1, 'plv-on-lottery-shake-animation-2x': animationSpeed === 2, 'plv-on-lottery-shake-animation-3x': animationSpeed === 3}"
      />
      <div @click="fastClickOpen">
        <svga-player
          ref="btnSvga"
          :src="lotteryBtnSvgaUrl"
          class="plv-on-lottery-default--default-pattern__btn plv-on-lottery-zoom-animation"
          :class="[ animationZoom === 0 ? 'plv-on-lottery-zoom-animation-1x' : animationZoom === 1 ? 'plv-on-lottery-zoom-animation-2x' : 'plv-on-lottery-zoom-animation-2x-repeat' ]"
        />
      </div>
    </div>
    <!-- 礼盒抽奖动图 -->
    <div v-else-if="pattern === allLotteryPatterns.box" class="plv-on-lottery-default--box">
      <svga-player
        ref="boxSvga"
        :src="lotteryBoxSvgaUrl"
        class="plv-on-lottery-default--box__main"
        clears-after-stop
      />
      <button class="plv-on-lottery-default--box__btn" @click="onClickClose"></button>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import SvgaPlayer from '../../../components/common/svga-player/SvgaPlayer';

export default {
  components: {
    SvgaPlayer,
  },

  mixins: [mixin]
};
</script>

<style lang="scss">

.plv-on-lottery-default--default-pattern {
  position: relative;
  .plv-on-lottery-default--default-pattern__main {
    width: 400px;
    height: 256px;
  }
  .plv-on-lottery-default--default-pattern__btn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -85px;
    width: 170px;
    height: 50px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}

.plv-on-lottery-default--box {
  position: relative;
  .plv-on-lottery-default--box__main {
    width: 300px;
    height: 300px;

    &::after {
      content: ' ';
      height: 200px;
      width: 2px;
      background-color: #A3A3A3;
      position: absolute;
      bottom: -20px;
      left: 50%;
      z-index: -1;
    }
  }
  .plv-on-lottery-default--box__btn {
    position: absolute;
    bottom: -60px;
    left: 50%;
    width: 40px;
    transform: translateX(-50%);
    height: 40px;
    border: none;
    outline: none;
    background-color: transparent;
    background-image: url(./imgs/icon-close-pc.png);
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    z-index: 2;
  }
}
.plv-on-lottery-default--box__close {
  position: absolute;
  top: 0;
  right: 70px;
  width: 32px;
  height: 32px;
  background-color: transparent;
  background-image: url(./imgs/icon-close-pc.png);
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 999;
}

// 动画参数
.plv-on-lottery-animation-base {
  animation-timing-function: linear;
  animation-direction: normal;
  animation-fill-mode: none;
}
.plv-on-lottery-shake-animation {
  animation-name: shake-center;
  @extend .plv-on-lottery-animation-base;
}
.plv-on-lottery-shake-animation-1x {
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.plv-on-lottery-shake-animation-2x {
  animation-duration: .6s;
  animation-name: shake-center-repeat;
  animation-iteration-count: 5;
}
.plv-on-lottery-shake-animation-3x {
  animation-duration: .3s;
  animation-iteration-count: 10;
}

@keyframes shake-center {
  0% {
    transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  75% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
}
// 重复动画，清空animation-iteration-count计数
@keyframes shake-center-repeat {
  0% {
    transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  75% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
}
.plv-on-lottery-zoom-animation {
  @extend .plv-on-lottery-animation-base;
}
.plv-on-lottery-zoom-animation-2x-base {
  animation-duration: .6s;
  animation-iteration-count: 1;
}
.plv-on-lottery-zoom-animation-2x {
  animation-name: zoom-center-2x;
  @extend .plv-on-lottery-zoom-animation-2x-base;
}
.plv-on-lottery-zoom-animation-2x-repeat {
  animation-name: zoom-center-2x-repeat;
  @extend .plv-on-lottery-zoom-animation-2x-base;
}
.plv-on-lottery-zoom-animation-1x {
  animation-name: zoom-center-1x;
  animation-duration: 1s;
}
// 动画重播
@keyframes zoom-center-2x-repeat {
  0% {
    transform: scale(.9);
    transform-origin: 50% 50%;
  }
  50% {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    transform-origin: 50% 50%;
  }
}
@keyframes zoom-center-2x {
  0% {
    transform: scale(.9);
    transform-origin: 50% 50%;
  }
  50% {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    transform-origin: 50% 50%;
  }
}
@keyframes zoom-center-1x {
  0% {
    transform: scale(1);
    transform-origin: 50% 50%;
  }
  50% {
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    transform-origin: 50% 50%;
  }
}
</style>
