<!-- @file 红包雨进行中组件 -->
<template>
  <div
    v-show="visible"
    class="plv-ia-c-redpack-rain__ongoing"
  >
    <div
      v-show="visible && !showCloseModal"
      class="plv-ia-c-redpack-rain__ongoing__main"
    >
      <!-- 头部空间区域 -->
      <div class="plv-ia-c-redpack-rain__ongoing__ctrl">
        <!-- 进度条 -->
        <div class="plv-ia-c-redpack-rain__ongoing__ctrl__progress-wrap">
          <redpack-progress
            :visible="visible"
            :duration="duration"
            @end="$emit('end')"
          />
        </div>
        <!-- 关闭按钮 -->
        <input
          type="button"
          class="plv-ia-c-redpack-rain__ongoing__close"
          @click="showCloseModal = true"
        />
      </div>

      <!-- 红包雨主要组件 -->
      <transition name="fade">
        <div v-show="!showSingleRedpackResult">
          <grab-redpack
            :visible="visible && !showSingleRedpackResult"
            :status="status"
            :all-status="allStatus"
            :redpack-rain="redpackRain"
            :custom-img-config="customImgConfig"
            @grab-and-fetch="handleGrab"
            @grab-not-fetch="handleGrabNotFetch"
          />
        </div>
      </transition>
    </div>

    <!-- 弹窗 -->
    <div>
      <!-- 单个红包结果 -->
      <single-redpack
        :nickname="nickname"
        :avatar="avatar"
        :visible="showSingleRedpackResult && !showCloseModal"
        :grab-result="grabResult"
        :received-data="receivedData"
        :redpack-rain="redpackRain"
        :custom-img-config="customImgConfig"
        :unit="unit"
        @after-close="handleCloseSingleRedpack"
      />
    </div>

    <!-- 关闭确认 -->
    <close-confirm-modal
      :visible="showCloseModal"
      :custom-img-config="customImgConfig"
      @confirm="$emit('close-redpack-rain')"
      @cancel="showCloseModal = false"
    />
  </div>
</template>

<script>
import RedpackProgress from '../redpack-progress';
import CloseConfirmModal from '../close-redpack-modal';
import GrabRedpack from '../redpack-grab';
import SingleRedpack from '../redpack-single-modal';

export default {
  components: {
    RedpackProgress,
    CloseConfirmModal,
    GrabRedpack,
    SingleRedpack,
  },

  inject: ['redpackRainVm'],

  props: {
    status: {
      type: String,
      default: '',
    },

    allStatus: {
      type: Object,
      default: () => ({})
    },

    duration: {
      type: Number,
      default: 0,
    },

    // 红包雨实例
    redpackRain: {
      type: Object,
      default: null,
    },

    nickname: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
      default: '',
    },

    unit: {
      type: String,
      default: '',
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  data() {
    return {
      // 抢红包结果信息
      grabResult: null,
      // 是否显示关闭确认框
      showCloseModal: false,
      receivedData: null,
    };
  },

  computed: {
    visible() {
      return this.status === this.allStatus.onGoing;
    },

    // 显示抢单个红包结果
    showSingleRedpackResult() {
      return typeof this.grabResult !== 'undefined' && this.grabResult !== null;
    },
  },

  watch: {
    visible: {
      immediate: true,
      handler() {
        if (!this.visible) {
          this.grabResult = null;
          this.redpackRainVm && this.redpackRainVm.setData({
            grabResult: null,
          });
        }
      },
    },
  },

  methods: {
    async handleGrab() {
      const { redpackId, redCacheId } = this.redpackRainVm;
      const data = await this.redpackRain.grabRedpack({
        redpackId,
        redCacheId,
      });
      this.handleGrabResult(data);
    },

    handleGrabResult(data) {
      this.grabResult = {
        amount: data.amount,
      };
      this.receivedData = data;
      if (data && data.amount) {
        this.redpackRainVm.emitStateChange('received');
      }
      this.redpackRainVm && this.redpackRainVm.setData({
        realGrabAmount: data && data.amount,
        grabResult: data,
        redPackReceive: data,
        status: this.allStatus.onGoing,
      });
    },

    /** 处理没有抢到红包 */
    handleGrabNotFetch() {
      const grabResult = {
        amount: 0,
      };
      this.grabResult = grabResult;
      this.redpackRainVm.setData({
        grabResult,
        status: this.allStatus.onGoing,
      });
    },

    handleCloseSingleRedpack() {
      this.grabResult = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../entry/redpack-rain/redpack.scss';
@import '../../../assets/styles/basic.scss';

.plv-ia-c-redpack-rain__ongoing,
.plv-ia-c-redpack-rain__ongoing__main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.plv-ia-c-redpack-rain__ongoing__ctrl {
  z-index: 1;
  position: absolute;
  top: 16px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.plv-ia-c-redpack-rain__ongoing__ctrl__progress-wrap {
  flex: 1;
  margin-right: 16px;
}
.plv-ia-c-redpack-rain__ongoing__close {
  z-index: 1;
  width: 32px;
  height: 32px;
  @include bg('../imgs/modal-close-btn.png');
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
}
</style>
