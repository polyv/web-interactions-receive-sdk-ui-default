<template>
  <div
    v-if="wrapVisible && good"
    class="plv-iar-product-bubble"
    :class="{
      'plv-iar-product-bubble--normal': animationType === 'normal',
      'plv-iar-product-bubble--scale': animationType === 'scale',
    }"
  >
    <transition
      :name="transitionName"
      @after-leave="handleAfterLeave"
    >
      <div
        v-if="bubbleVisible"
        class="plv-iar-product-bubble__wrap"
        :style="wrapStyle"
      >
        <div
          class="plv-iar-product-bubble__inner"
          :style="innerStyle"
        >
          <bubble-main
            :good="good"
            @click-close="close"
            @job-detail="$emit('job-detail', $event)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import mixin from './mixin';
import BubbleMain from '../../components/product/bubble/BubbleMain.vue';

export default {
  components: {
    BubbleMain,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-product-bubble__wrap {
  position: relative;
}

// 常规动画
.plv-iar-product-bubble--normal {
  .plv-iar-product-bubble-animation-normal-enter-active,
  .plv-iar-product-bubble-animation-normal-leave-active {
    transform: translateX(0);
    transition: .5s;
  }
  .plv-iar-product-bubble-animation-normal-enter,
  .plv-iar-product-bubble-animation-normal-leave-active {
    transform: translateX(-100%);
  }

  .plv-iar-product-bubble__wrap {
    max-width: 95%;
  }
}

// 缩放动画
.plv-iar-product-bubble--scale {
  .plv-iar-product-bubble-animation-scale-enter-active,
  .plv-iar-product-bubble-animation-scale-leave-active {
    opacity: 1;
    transform: scale(1, 1);
    transition: 0.5s;
  }

  .plv-iar-product-bubble-animation-scale-enter,
  .plv-iar-product-bubble-animation-scale-leave-active {
    opacity: 0;
    transform: scale(0, 0);
  }

  .plv-iar-product-bubble__wrap {
    width: 12px;
    height: 6px;
    transform-origin: center center;

    &::after {
      width: 0;
      height: 0;
      border-color: #fff transparent transparent transparent;
      border-style: solid;
      border-width: 6px;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
    }
  }
  .plv-iar-product-bubble__inner {
    position: absolute;
    bottom: 6px;
    left: -225px;
  }
}
</style>
