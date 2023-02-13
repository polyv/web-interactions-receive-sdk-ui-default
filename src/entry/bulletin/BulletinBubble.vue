<template>
  <bulletin-top-bubble-label
    v-if="show"
    :content="bulletinData.content"
    @close="onClickClose"
    @look="onClickViewDetail"
  />
</template>
<script>
import BulletinTopBubbleLabel from '../../components/bulletin/BulletinTopBubbleLabel.vue';
import publicMixin from './public-mixin';
import mixin from './top-mixin';

export default {
  components: {
    BulletinTopBubbleLabel,
  },
  mixins: [publicMixin, mixin],
  methods: {
    onBulletin(msg) {
      if (this.isReaded(msg)) return;

      msg.pic = this.setUserPic(msg.pic);
      this.show = true;
      this.bulletinData = msg;
      this.$emit('show-bubble', msg);
    },
  },
};
</script>
