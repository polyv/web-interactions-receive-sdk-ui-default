import { Announcement } from '@polyv/interactions-receive-sdk';
import { I18n } from '@/assets/locale/locale';
import langs from '../../assets/locale/lang/announcement';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },
  data() {
    return {
      // 公告 SDK 实例
      announcementSdk: null,
      // title
      announcementTitle: '公告',
      // 是否展示公告
      isShowAnnouncement: false,
    };
  },
  created() {
    this.i18n = new I18n(langs);
    this.i18n.updateLocale(() => this.lang);
    this.announcementSdk = new Announcement();
  },
  [BEFORE_DESTROY]() {
    this.announcementSdk?.destroy();
    this.announcementSdk = null;
  },
  methods: {
    changeStatus(status) {
      this.status = status;
      this.announcementTitle = this.i18n.trans('announcement.title');
    },

    onModalClosed() {
      this.setAnnouncementVisible(false);
      // 标记已读，下次收到同个公告不弹出
      this.$refs.announcement && this.$refs.announcement.markAnnounceReaded();
    },

    setAnnouncementVisible(visible) {
      this.isShowAnnouncement = visible;
    },
    // webview 下调用toLink方法
    toLink(url) {
      console.log('toLink', url);
    },
  }
};
