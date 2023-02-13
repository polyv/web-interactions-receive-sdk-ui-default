<template>
  <bulletin-top
    class="plv-demo-pc-bulletin__top"
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
.plv-demo-pc-bulletin__top {
  position: fixed;
  top: 0;
  width: 300px;
}
</style>
