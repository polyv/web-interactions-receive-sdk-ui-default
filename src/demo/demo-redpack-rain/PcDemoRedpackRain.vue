<!-- PC 端红包雨 demo -->
<template>
  <div>
    <redpack-rain-comp
      :redpack-rain="redpackRainSdk"
      :lang="lang"
    />
  </div>
</template>

<script>
import { RedpackRain } from '@polyv/interactions-receive-sdk';
import RedpackRainComp from '../../entry/redpack-rain/PcRedpackRain.vue';

export default {
  components: {
    RedpackRainComp
  },

  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      redpackRainSdk: null,
    };
  },

  created() {
    this.redpackRainSdk = new RedpackRain();
  },
};
</script>
