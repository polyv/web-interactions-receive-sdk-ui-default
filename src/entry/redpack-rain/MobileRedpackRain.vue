<!-- 移动端红包雨组件 -->
<template>
  <div
    v-if="isRedpackRainVisible"
    class="plv-redpack-rain-default"
  >
    <!-- 背景流星 -->
    <div
      v-show="status !== allStatus.showSummary"
      class="plv-redpack-rain-default__back-meteor-board"
    >
      <rolling-board
        ref="meteorBoard"
        :class-count="2"
      />
    </div>

    <!-- 开场动画 -->
    <begining
      :all-status="allStatus"
      :status="status"
      :custom-img-config="customImgConfig"
      @close="handleCloseBegining"
    />

    <!-- 红包雨进行中 -->
    <on-going
      :nickname="nickname"
      :avatar="avatar"
      :duration="duration"
      :status="status"
      :all-status="allStatus"
      :redpack-rain="redpackRain"
      :custom-img-config="customImgConfig"
      :unit="unit"
      @end="handleRedpackEnd"
      @close-redpack-rain="handleClose"
    />

    <!-- 红包总数据弹窗 -->
    <redpack-summary-modal
      :red-pack-receive="redPackReceive"
      :nickname="nickname"
      :avatar="avatar"
      :status="status"
      :all-status="allStatus"
      :real-grab-amount="realGrabAmount"
      :redpack-rain="redpackRain"
      :with-draw-enabled="withDrawEnabled"
      :unit="unit"
      :custom-img-config="customImgConfig"
      @close="handleClose"
      @click-point-record="$emit('click-point-record')"
      @click-withdraw="$emit('click-withdraw')"
    />

    <!-- 红包被抢完，红包雨结束弹窗 -->
    <redpack-end-modal
      :nickname="nickname"
      :avatar="avatar"
      :status="status"
      :all-status="allStatus"
      :custom-img-config="customImgConfig"
      @close="handleClose"
    />

    <!-- 需要微信打开，弹窗 -->
    <redpack-not-wechat
      :nickname="nickname"
      :avatar="avatar"
      :status="status"
      :all-status="allStatus"
      :greeting="greeting"
      :watch-url="watchUrl"
      :redpack-rain="redpackRain"
      :redirect-url="redirectUrl"
      :custom-img-config="customImgConfig"
      @close="handleClose"
      @copy-success="$emit('copy-success')"
    />
  </div>
</template>

<script>
import mixin from './mixin';
import RollingBoard from '../../components/redpack-rain/rolling-board.vue';
import Begining from '../../components/redpack-rain/redpack-begining-modal';
import OnGoing from '../../components/redpack-rain/redpack-on-going';
import RedpackSummaryModal from '../../components/redpack-rain/redpack-summary-modal';
import RedpackEndModal from '../../components/redpack-rain/redpack-end-modal';
import RedpackNotWechat from '../../components/redpack-rain/redpack-not-wechat-modal';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  components: {
    RollingBoard,
    Begining,
    OnGoing,
    RedpackSummaryModal,
    RedpackEndModal,
    RedpackNotWechat,
  },

  mixins: [mixin],

  computed: {
    /**
     * 是否显示背景流行
     */
    showMeteor() {
      return this.isRedpackRainVisible && this.status !== this.allStatus.showSummary;
    }
  },

  watch: {
    showMeteor() {
      if (this.showMeteor) {
        this.setMeteorBoard();
      } else {
        this.clearMeteorBoard();
      }
    }
  },

  [BEFORE_DESTROY]() {
    this.clearMeteorBoard();
  },

  methods: {
    /** 红包雨开场动画结束 */
    handleCloseBegining() {
      // 切换到进行中状态
      this.status = this.allStatus.onGoing;
    },
    /** 设置背景流星 */
    setMeteorBoard() {
      this.$nextTick(() => {
        if (this.$refs.meteorBoard.inited) { return; }
        const meteorBoard = this.$refs.meteorBoard;
        meteorBoard && meteorBoard.init();
      });
    },
    /** 销毁背景流行 */
    clearMeteorBoard() {
      const meteorBoard = this.$refs.meteorBoard;
      meteorBoard && meteorBoard.destroy();
    },
    /** 关闭红包雨 */
    hideRedpackRain() {
      this.handleClose();
    },
    /** 处理红包雨倒计时结束 */
    handleRedpackEnd() {
      this.status = this.allStatus.showSummary;
    },
  }
};
</script>

<style lang="scss" scoped>
@import './redpack.scss';

.plv-redpack-rain-default {
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65) linear-gradient(180deg, rgba(255, 88, 74, 0.33) 0%, rgba(0, 0, 0, 0) 55%, rgba(160, 25, 20, 0.3) 100%);
  touch-action: manipulation;
}

.plv-redpack-rain-default__back-meteor-board {
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
    background-image: url(./imgs/redpack-meteor-back.png);
  }
}
@media screen and (min-aspect-ratio: 4/3) {
  .plv-redpack-rain-default {
    transform: translate(-50%, -50%) rotate(-90deg);
    height: 100vw;
    width: 100vh;
    top: 50vh;
    left: 50vw;
  }
  ::v-deep .plv-ia-c-redpack-rain__grab__redpack-board {
    top: -15%;
    left: 150%;
  }
}
</style>
