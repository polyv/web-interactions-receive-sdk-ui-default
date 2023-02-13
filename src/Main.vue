<template>
  <div class="p-main">
    <mobile-main v-if="isMobile" />
    <pc-main v-else />
  </div>
</template>

<script>
import { isMobile } from '@polyv/utils/src/browser';

export default {
  components: {
    PcMain: () => import('./demo/demo-main/PcMain.vue'),
    MobileMain: () => import('./demo/demo-main/MobileMain.vue'),
  },

  data() {
    return {
      isMobile: isMobile(),
    };
  },
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  height: 100%;
}
.p-main {
  height: 100%;
}
</style>
