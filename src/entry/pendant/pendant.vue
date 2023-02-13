<template>
  <pendant
    :icon-url="iconUrl"
    :content="content"
    :time="time"
    :tooltip="tooltip"
    :show-tooltip="showTooltip"
    :tooltip-position="tooltipPosition"
    @click="$emit('click')"
    @countdown="$emit('countdown')"
    @countdown-end="$emit('countdown-end')"
  />
</template>

<script>
import Pendant from '../../components/pendant/pendant.vue';

export default {
  components: {
    Pendant,
  },
  props: {
    /** 挂件图标图 */
    iconUrl: {
      type: String,
      required: true
    },
    /** 挂件图标下方文案，与倒计时互斥 */
    content: {
      type: [String, undefined],
      default: () => undefined
    },
    /** 倒计时时间，整数，单位秒，与content参数互斥 */
    time: {
      type: [Number, undefined],
      default: () => undefined
    },
    /** 侧边提示文案 */
    tooltip: {
      type: [String, undefined],
      default: () => undefined
    },
    /** 是否显示侧边提示文案 */
    showTooltip: {
      type: Boolean,
      default: true,
    },
    /** 侧边提示文案位置，可选left/right，默认right */
    tooltipPosition: {
      type: String,
      default: 'right',
      validator(val) {
        return ['left', 'right'].indexOf(val) !== -1;
      },
    },
  },
};
</script>
