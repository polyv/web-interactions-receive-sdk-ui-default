<template>
  <bulletin-top-banner
    v-if="show"
    :content="bulletinData.content"
    @close="onClickClose"
    @look="onClickViewDetail"
  />
</template>
<script>
import BulletinTopBanner from '../../components/bulletin/BulletinTopBanner.vue';
import publicMixin from './public-mixin';
import mixin from './top-mixin';

export default {
  components: {
    BulletinTopBanner,
  },
  mixins: [publicMixin, mixin],
  methods: {
    onBulletin(msg) {
      this.show = false;
      this.bulletinData = null;

      msg.pic = this.setUserPic(msg.pic);

      if (this.isReaded(msg)) return;
      if (msg.isTop === 1) {
        this.bulletinData = msg;
        this.show = true;
        this.$emit('show-top', msg);
      }
    },
  },
};
</script>
