export default {
  data() {
    return {
      // 是否去除公告强提醒(已读保存storage)
      cacheReadedEnabled: true,
    };
  },

  methods: {
    // 点击"我知道了"记录已读公告
    onClickKnow() {
      this.markAnnounceReaded();
      this.$emit('to-hide');
    },

    // 标记公告已读
    markAnnounceReaded() {
      this.announcementSdk.markCurReaded();
    },
  },
};
