import publicMixin from './public-mixin';

export default {
  mixins: [publicMixin],
  data() {
    return {
      show: false,
      bulletinData: null,
    };
  },
  watch: {
    announcementSdk: {
      immediate: true,
      handler(nv) {
        if (nv) {
          this.bindAppEvents();
        } else {
          this.unbindAppEvents();
        }
      },
    },
  },
  methods: {
    onRemoveBulletin(msg) {
      this.show = this.show && this.bulletinData.id !== msg.id;
    },
    onClickViewDetail() {
      this.$emit('show-detail', this.bulletinData);
    },
    onClickClose() {
      this.markAnnounceReaded();
      this.show = false;
      this.$emit('close');
    },
  },
};
