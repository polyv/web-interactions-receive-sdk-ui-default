<template>
  <bulletin-bubble
    class="plv-demo-mobile-bulletin__bubble"
    :announcement-sdk="announcementSdk"
    v-on="$listeners"
  />
</template>

<script>
import BulletinBubble from '../../entry/bulletin/BulletinBubble.vue';
import mixin from './mixin';

export default {
  components: {
    BulletinBubble
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-demo-mobile-bulletin__bubble {
  position: fixed;
  top: 100px;
  right: 0;
}
</style>
