import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/announcement';
import { interceptLink } from '@/assets/utils/utils';

export default {
  langs,

  mixins: [entryMixin],

  props: {
    // 公告 SDK 实例
    announcementSdk: {
      type: Object,
      default: null,
    },
    isWebView: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // 是否可见
      visible: false,
      // 公告id
      id: '',
      // 公告内容
      content: '',
    };
  },

  watch: {
    announcementSdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
      },
    },
    content: {
      handler() {
        this.initContent();
      },
    },
  },
  mounted() {
    this.initContent();
  },

  methods: {
    initContent() {
      const html = this.content || this.iarTrans('announcement.none');
      if (this.$refs.announcementContent) {
        this.$refs.announcementContent.innerHTML = html;
      }
      // isWebView 为 true 时，给a标签绑定点击事件
      interceptLink(this.$refs.announcementContent, this.isWebView, (href, target) => {
        this.$emit('to-link', {
          href,
          target
        });
      });
    },
    bindAppEvents() {
      const announcementSdk = this.announcementSdk;
      if (!announcementSdk) { return; }
      announcementSdk
        .on(announcementSdk.events.BULLETIN, this.setAnnouncementContent)
        .on(announcementSdk.events.REMOVE_BULLETIN, this.clearAnnouncementContent);
    },

    unbindAppEvents() {
      const announcementSdk = this.announcementSdk;
      if (!announcementSdk) { return; }
      announcementSdk
        .off(announcementSdk.events.BULLETIN, this.setAnnouncementContent)
        .off(announcementSdk.events.REMOVE_BULLETIN, this.clearAnnouncementContent);
    },

    // 收到公告消息
    async setAnnouncementContent(msg) {
      this.clearAnnouncementContent();
      this.$nextTick(() => {
        const storageAnnounce = this.announcementSdk.getStorageAnnounce();
        // 已读公共逻辑未开启，或公告id更新
        if (
          !this.cacheReadedEnabled ||
          !storageAnnounce?.id ||
          storageAnnounce.id !== msg.id
        ) {
          this.$emit('to-show', msg);
          this.visible = true;
        }
        this.content = msg.content;
      });
    },

    // 移除公告消息
    clearAnnouncementContent() {
      this.$emit('to-hide', null);
      this.content = null;
      this.visible = false;
    },
  }
};
