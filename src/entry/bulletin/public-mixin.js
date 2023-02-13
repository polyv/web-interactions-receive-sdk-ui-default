import entryMixin from '@/assets/mixins/entry';
import langs from '@/assets/locale/lang/bulletin';

const defaultViewerAvatar = '//s1.videocc.net/default-img/avatar/viewer.png';

export default {
  langs,
  mixins: [entryMixin],
  props: {
    // 公告 SDK 实例
    announcementSdk: {
      type: Object,
      default: null,
    },
    // 是否去除公告强提醒(已读保存storage)
    cacheReadedEnabled: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    bindAppEvents() {
      const announcementSdk = this.announcementSdk;
      if (!announcementSdk) { return; }
      announcementSdk
        .on(announcementSdk.events.BULLETIN, this.onBulletin)
        .on(announcementSdk.events.REMOVE_BULLETIN, this.onRemoveBulletin);
    },

    unbindAppEvents() {
      const announcementSdk = this.announcementSdk;
      if (!announcementSdk) { return; }
      announcementSdk
        .off(announcementSdk.events.BULLETIN, this.onBulletin)
        .off(announcementSdk.events.REMOVE_BULLETIN, this.onRemoveBulletin);
    },
    setUserPic(pic) {
      return pic || defaultViewerAvatar;
    },
    isReaded(msg) {
      const storageAnnounce = this.announcementSdk.getStorageAnnounce();
      // 重新发布的公告ID相同但是发布时间不一样
      return this.cacheReadedEnabled && storageAnnounce && storageAnnounce.id === msg.id && storageAnnounce.createTime === msg.createTime;
    },
    // 标记公告已读
    markAnnounceReaded() {
      this.announcementSdk.markCurReaded();
    },
  },
};
