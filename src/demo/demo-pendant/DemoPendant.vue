<template>
  <div class="plv-demo-pendant">
    <pendant
      :icon-url="iconUrl"
      :content="content"
      :time="time"
      :tooltip="tooltip"
      :tooltip-show-method="tooltipShowMethod"
      :tooltip-hide-method="tooltipHideMethod"
      @click="onClick"
      @countdown-end="onCountdownEnd"
    />
  </div>
</template>

<script>
import Pendant from '../../entry/pendant/pendant.vue';

export default {
  components: {
    Pendant
  },
  data() {
    return {
      iconUrl: 'https://demo2.polyv.net/linxiaoru/2020092402.jpeg',
      content: '',
      // time: 5*24*60*60,
      time: 3,
      tooltip: '侧边栏提示文案',
      // :tooltip-position="tooltipPosition"
      // tooltipPosition: 'left',
      // tooltipShowMethod: 'immediately',
      tooltipShowMethod: 3,
      // tooltipHideMethod: 'none',
      tooltipHideMethod: 3,
      isCountdownEnd: false,
    };
  },
  methods: {
    onClick() {
      console.info('---pendant click');
      if (this.isCountdownEnd) {
        console.info('---do something');
      }
    },
    onCountdownEnd() {
      console.info('---countdown end');
      this.content = '挂件组件';
      this.isCountdownEnd = true;
    },
  }
};
</script>

<style lang="scss">
.plv-demo-pendant {
  position: absolute;
  // top: 10px;
  // right: 10px;
  top: 200px;
  left: 10px;
}
</style>
