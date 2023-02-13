<template>
  <div v-if="lotteryStatus === 'running'" class="plv-on-lottery-SF">
    <div class="plv-on-lottery-SF-pattern">
      <div class="plv-on-lottery-SF-badge"></div>
      <div class="plv-on-lottery-SF-box">
        <div class="plv-on-lottery-SF-member--list plv-on-lottery-SF-member--list-animation" :style="{'animation-duration': scrollSpeed + 's'}">
          <div v-for="(item, index) in memberList" :key="index" class="plv-on-lottery-SF-member--item">
            <div>{{ item }}</div>
          </div>
          <!-- 平滑动画效果， 防止滚动底部出现空白 -->
          <div v-for="(item, index) in memberList" :key="'copy-'+index" class="plv-on-lottery-SF-member--item">
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import SFMixin from './SFMixin';
// import SvgaPlayer from '../../../components/common/svga-player/SvgaPlayer';

export default {
  components: {
    // SvgaPlayer,
  },

  mixins: [mixin, SFMixin],
};
</script>

<style lang="scss">

.plv-on-lottery-SF-pattern {
  position: relative;
  width: 360px;
  height: 300px;
  background: url('./imgs/SF-on-lottery.png');
  background-size: 100% 100%;
  .plv-on-lottery-SF-badge {
    position: absolute;
    left: 50%;
    bottom: 35px;
    transform: translateX(-50%);
    width: 58px;
    height: 72px;
    background: url('./imgs/SF-on-lottery-jiang.png');
    background-size: 100% 100%;
    z-index: 10;
  }
}

.plv-on-lottery-SF-box {
  position: absolute;
  bottom: 100px;
  left: 50%;
  margin-left: -104px;
  width: 208px;
  height: 90px;
  overflow: hidden;
}

.plv-on-lottery-SF-member--list {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  .plv-on-lottery-SF-member--item {
    width: 33%;
    height: 28px;
    line-height: 28px;
    border-bottom: 1px solid rgba(186, 116, 52, 0.14);
    text-align: center;
    font-size: 12px;
    color: #674341;
    user-select: none;
  }
}

// 动画
.plv-on-lottery-SF-member--list-animation {
  animation: scroll-animation linear normal none infinite;
}

@keyframes scroll-animation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
