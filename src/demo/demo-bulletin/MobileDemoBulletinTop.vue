<template>
  <bulletin-top
    class="plv-demo-mobile-bulletin__top"
    :announcement-sdk="announcementSdk"
    v-on="$listeners"
  />
</template>

<script>
import BulletinTop from '../../entry/bulletin/BulletinTop.vue';
import mixin from './mixin';

export default {
  components: {
    BulletinTop
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-demo-mobile-bulletin__top {
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
}
</style>
